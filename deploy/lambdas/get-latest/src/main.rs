mod data;
extern crate shared;

use aws_sdk_dynamodb::Client;
use data::get_latest_item;
use lambda_http::{
    http::{Response, StatusCode},
    run, service_fn, Error, IntoResponse, Request, RequestExt,
};
use shared::models::errors::QueryError;
use tracing::metadata::LevelFilter;
use tracing_subscriber::{layer::SubscriberExt as _, util::SubscriberInitExt as _, Layer};

async fn handler(
    table_name: &str,
    client: &Client,
    request: Request,
) -> Result<impl IntoResponse, Error> {
    let user_id = request
        .query_string_parameters_ref()
        .and_then(|params| params.first("user_id"));

    if user_id.is_none() {
        let response = Response::builder()
            .status(StatusCode::BAD_REQUEST)
            .header("Access-Control-Allow-Headers", "Content-Type")
            .header(
                "Access-Control-Allow-Methods",
                "GET, PUT, DELETE, POST, OPTIONS, PATCH",
            )
            .header("Access-Control-Allow-Origin", "*")
            .body("Missing required parameter: user_id".to_string())
            .map_err(Box::new)?;
        return Ok(response);
    }

    match get_latest_item(client, table_name, user_id.unwrap()).await {
        Ok(found_item) => {
            let response = Response::builder()
                .status(StatusCode::OK)
                .header("Access-Control-Allow-Headers", "Content-Type")
                .header(
                    "Access-Control-Allow-Methods",
                    "GET, PUT, DELETE, POST, OPTIONS, PATCH",
                )
                .header("Access-Control-Allow-Origin", "*")
                .body(serde_json::to_string(&found_item).unwrap())
                .map_err(Box::new)?;
            Ok(response)
        }
        Err(QueryError::NotFound) => {
            let response = Response::builder()
                .status(StatusCode::NO_CONTENT)
                .header("Access-Control-Allow-Headers", "Content-Type")
                .header(
                    "Access-Control-Allow-Methods",
                    "GET, PUT, DELETE, POST, OPTIONS, PATCH",
                )
                .header("Access-Control-Allow-Origin", "*")
                .body("".to_string())
                .map_err(Box::new)?;
            Ok(response)
        }
        Err(e) => {
            tracing::error!("Failed to get the latest item: {:?}", e);

            let error_message = format!("Error fetching the latest item: {:?}", e);
            let response = Response::builder()
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .header("Access-Control-Allow-Headers", "Content-Type")
                .header(
                    "Access-Control-Allow-Methods",
                    "GET, PUT, DELETE, POST, OPTIONS, PATCH",
                )
                .header("Access-Control-Allow-Origin", "*")
                .body(serde_json::to_string(&error_message).unwrap())
                .map_err(Box::new)?;
            Ok(response)
        }
    }
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    let filtered_layer = tracing_subscriber::fmt::layer()
        .pretty()
        .json()
        .with_target(true)
        .with_file(true)
        .with_filter(LevelFilter::INFO);

    tracing_subscriber::registry().with(filtered_layer).init();
    let is_local = std::env::var("IS_LOCAL").unwrap_or("false".to_string());
    let client = shared::clients::lambda_ddb_client::new_client(is_local).await;
    let table_name = "espressoshots";
    let shared_client = &client;

    run(service_fn(move |event: Request| async move {
        handler(table_name, shared_client, event).await
    }))
    .await
}

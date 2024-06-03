use aws_sdk_dynamodb::Client;
use shared::models::entities::EspressoShot;
use shared::models::errors::QueryError;
use tracing::error;

pub async fn get_latest_item(
    client: &Client,
    table_name: &str,
) -> Result<EspressoShot, QueryError> {
    let output = client
        .scan()
        .limit(1)
        .table_name(table_name)
        .index_name("shot_date")
        .send()
        .await?;

    match output.items {
        Some(item) => {
            let entity: Result<EspressoShot, serde_dynamo::Error> =
                serde_dynamo::from_item(item[0].clone());
            match entity {
                Ok(entity) => Ok(entity),
                Err(e) => {
                    error!("(Error)={:?}", e);
                    Err(QueryError::NotFound)
                }
            }
        }
        None => Err(QueryError::NotFound),
    }
}

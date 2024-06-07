use aws_sdk_dynamodb::types::AttributeValue;
use aws_sdk_dynamodb::Client;
use shared::models::dto::EspressoShotViewDto;
use shared::models::entities::EspressoShot;
use shared::models::errors::QueryError;
use tracing::error;

pub async fn get_latest_item(
    client: &Client,
    table_name: &str,
) -> Result<EspressoShotViewDto, QueryError> {
    let output = client
        .query()
        .limit(1)
        .table_name(table_name)
        .index_name("shot_date_index")
        .key_condition_expression("shot_date > :rangeKey")
        .expression_attribute_values(
            ":rangeKey",
            AttributeValue::N(
                (chrono::Utc::now() - chrono::Duration::days(1))
                    .timestamp()
                    .to_string(),
            ),
        )
        .send()
        .await?;

    match output.items {
        Some(items) if !items.is_empty() => {
            let entity: Result<EspressoShot, serde_dynamo::Error> =
                serde_dynamo::from_item(items[0].clone());
            match entity {
                Ok(entity) => Ok(EspressoShotViewDto::from(entity)),
                Err(e) => {
                    error!("(Error)={:?}", e);
                    Err(QueryError::NotFound)
                }
            }
        }
        _ => Err(QueryError::NotFound),
    }
}

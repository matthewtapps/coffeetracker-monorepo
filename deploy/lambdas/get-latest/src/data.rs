use aws_sdk_dynamodb::types::AttributeValue;
use aws_sdk_dynamodb::Client;
use shared::models::dto::EspressoShotViewDto;
use shared::models::entities::EspressoShot;
use shared::models::errors::QueryError;
use tracing::error;

pub async fn get_latest_item(
    client: &Client,
    table_name: &str,
    user_id: &str,
) -> Result<EspressoShotViewDto, QueryError> {
    let output = client
        .query()
        .table_name(table_name)
        .scan_index_forward(false)
        .limit(1)
        .key_condition_expression("user_id = :user_id")
        .expression_attribute_values(":user_id", AttributeValue::S(user_id.to_string()))
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

use aws_sdk_dynamodb::types::AttributeValue;
use aws_sdk_dynamodb::Client;
use shared::models::dto::EspressoShotViewDto;
use shared::models::errors::QueryError;
use shared::models::{dto::EspressoShotViewPaginated, entities::EspressoShot};
use std::collections::HashMap;

use tracing::error;

pub async fn get_items(
    client: &Client,
    table_name: &str,
    limit: i32,
    last_key: String,
    user_id: &str,
) -> Result<EspressoShotViewPaginated, QueryError> {
    if !last_key.is_empty() {
        let mut evaluated_key: HashMap<String, aws_sdk_dynamodb::types::AttributeValue> =
            HashMap::new();
        evaluated_key.insert(
            "id".to_string(),
            aws_sdk_dynamodb::types::AttributeValue::S(last_key),
        );
        _ = Some(evaluated_key);
    }

    let output = client
        .query()
        .table_name(table_name)
        .scan_index_forward(false)
        .limit(limit)
        .key_condition_expression("user_id = :user_ud")
        .expression_attribute_values(":user_id", AttributeValue::S(user_id.to_string()))
        .send()
        .await?;

    match output.items {
        Some(items) if !items.is_empty() => {
            let mut entities = Vec::new();

            for i in items {
                let entity: Result<EspressoShot, serde_dynamo::Error> = serde_dynamo::from_item(i);
                match entity {
                    Ok(entity) => {
                        entities.push(EspressoShotViewDto::from(entity));
                    }
                    Err(e) => {
                        error!("(Error)={:?}", e);
                    }
                }
            }

            let mut last_key: String = String::new();

            if output.last_evaluated_key.is_some() {
                let key = output.last_evaluated_key.unwrap();
                let key_value = key.get("id").unwrap();
                let string_value = key_value.as_s().unwrap().to_string();

                last_key = string_value;
            }

            Ok(EspressoShotViewPaginated::new(last_key, entities))
        }
        _ => {
            let entities = Vec::new();
            Ok(EspressoShotViewPaginated::new("".to_string(), entities))
        }
    }
}

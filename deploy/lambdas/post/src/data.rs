use aws_sdk_dynamodb::{types::AttributeValue, Client};
use shared::models::entities::EspressoShot;
use shared::models::errors::QueryError;

pub async fn create_item(
    client: &Client,
    table_name: &str,
    item: EspressoShot,
) -> Result<EspressoShot, QueryError> {
    match client
        .put_item()
        .item("id".to_string(), AttributeValue::S(item.get_id()))
        .item("beans".to_string(), AttributeValue::S(item.get_beans()))
        .item("roaster".to_string(), AttributeValue::S(item.get_roaster()))
        .item(
            "roast_date".to_string(),
            AttributeValue::N(item.get_roast_date().to_string()),
        )
        .item(
            "shot_date".to_string(),
            AttributeValue::N(item.get_shot_date().to_string()),
        )
        .item(
            "grind_setting".to_string(),
            AttributeValue::N(item.get_grind_setting().to_string()),
        )
        .item(
            "weight_in_g".to_string(),
            AttributeValue::N(item.get_weight_in_g().to_string()),
        )
        .item(
            "weight_out_g".to_string(),
            AttributeValue::N(item.get_weight_out_g().to_string()),
        )
        .item(
            "rating".to_string(),
            AttributeValue::N(item.get_rating().to_string()),
        )
        .item(
            "acidity_bitterness".to_string(),
            AttributeValue::N(item.get_acidity_bitterness().to_string()),
        )
        .item(
            "muddy_watery".to_string(),
            AttributeValue::N(item.get_muddy_watery().to_string()),
        )
        .item("notes".to_string(), AttributeValue::S(item.get_notes()))
        .item(
            "updated_at".to_string(),
            AttributeValue::N(item.get_updated_at().to_string()),
        )
        .table_name(table_name)
        .send()
        .await
    {
        Ok(_) => Ok(item),
        Err(e) => Err(e.into()),
    }
}

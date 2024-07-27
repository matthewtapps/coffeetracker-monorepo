use aws_sdk_dynamodb::{types::AttributeValue, Client};
use shared::models::entities::EspressoShot;
use shared::models::errors::QueryError;

pub async fn create_item(
    client: &Client,
    table_name: &str,
    item: EspressoShot,
) -> Result<EspressoShot, QueryError> {
    let mut request = client
        .put_item()
        .item("id".to_string(), AttributeValue::S(item.get_id()))
        .item("user_id".to_string(), AttributeValue::S(item.get_user_id()))
        .item(
            "extraction_method".to_string(),
            AttributeValue::S(item.get_extraction_method()),
        )
        .item(
            "shot_date".to_string(),
            AttributeValue::N(item.get_shot_date().to_string()),
        )
        .item(
            "weight_in_grams".to_string(),
            AttributeValue::N(item.get_weight_in_grams().to_string()),
        )
        .item(
            "weight_out_grams".to_string(),
            AttributeValue::N(item.get_weight_out_grams().to_string()),
        )
        .item(
            "brew_time_seconds".to_string(),
            AttributeValue::N(item.get_brew_time_seconds().to_string()),
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
        .item(
            "updated_at".to_string(),
            AttributeValue::N(item.get_updated_at().to_string()),
        );

    if let Some(beans) = item.get_beans() {
        request = request.item("beans".to_string(), AttributeValue::S(beans.clone()));
    }

    if let Some(roaster) = item.get_roaster() {
        request = request.item("roaster".to_string(), AttributeValue::S(roaster.clone()));
    }

    if let Some(roast_date) = item.get_roast_date() {
        request = request.item(
            "roast_date".to_string(),
            AttributeValue::N(roast_date.to_string()),
        );
    }

    if let Some(grind_setting) = item.get_grind_setting() {
        request = request.item(
            "grind_setting".to_string(),
            AttributeValue::N(grind_setting.to_string()),
        );
    }

    if let Some(notes) = item.get_notes() {
        request = request.item("notes".to_string(), AttributeValue::S(notes.clone()));
    }

    if let Some(espresso_machine) = item.get_espresso_machine() {
        request = request.item(
            "espresso_machine".to_string(),
            AttributeValue::S(espresso_machine.clone()),
        );
    }

    if let Some(grinder) = item.get_grinder() {
        request = request.item("grinder".to_string(), AttributeValue::S(grinder.clone()));
    }

    if let Some(kettle) = item.get_kettle() {
        request = request.item("kettle".to_string(), AttributeValue::S(kettle.clone()));
    }

    if let Some(dripper) = item.get_dripper() {
        request = request.item("dripper".to_string(), AttributeValue::S(dripper.clone()));
    }

    match request.table_name(table_name).send().await {
        Ok(_) => Ok(item),
        Err(e) => Err(e.into()),
    }
}

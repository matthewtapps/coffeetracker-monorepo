use crate::models::entities::EspressoShot;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Deserializer, Serialize, Serializer};
use svix_ksuid::{Ksuid, KsuidLike};

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct EspressoShotViewPaginated {
    pub last_evaluated_key: String,
    pub entities: Vec<EspressoShotViewDto>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct EspressoShotViewDto {
    pub id: String,
    pub beans: String,
    pub roaster: String,
    #[serde(serialize_with = "serialize_dt")]
    pub roast_date: DateTime<Utc>,
    #[serde(serialize_with = "serialize_dt")]
    pub shot_date: DateTime<Utc>,
    pub grind_setting: i32,
    pub weight_in_grams: f32,
    pub weight_out_grams: f32,
    pub brew_time_seconds: i32,
    pub rating: i32,
    pub acidity_bitterness: i32,
    pub muddy_watery: i32,
    pub notes: String,
    #[serde(serialize_with = "serialize_dt")]
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EspressoShotCreateDto {
    pub beans: String,
    pub roaster: String,
    #[serde(deserialize_with = "deserialize_dt")]
    pub roast_date: DateTime<Utc>,
    #[serde(deserialize_with = "deserialize_dt_opt", default)]
    pub shot_date: Option<DateTime<Utc>>,
    pub grind_setting: i32,
    pub weight_in_grams: f32,
    pub weight_out_grams: f32,
    pub brew_time_seconds: i32,
    pub rating: i32,
    pub acidity_bitterness: i32,
    pub muddy_watery: i32,
    pub notes: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EspressoShotPutDto {
    pub id: String,
    pub beans: String,
    pub roaster: String,
    #[serde(deserialize_with = "deserialize_dt")]
    pub roast_date: DateTime<Utc>,
    #[serde(deserialize_with = "deserialize_dt")]
    pub shot_date: DateTime<Utc>,
    pub grind_setting: i32,
    pub weight_in_grams: f32,
    pub weight_out_grams: f32,
    pub brew_time_seconds: i32,
    pub rating: i32,
    pub acidity_bitterness: i32,
    pub muddy_watery: i32,
    pub notes: String,
}

impl EspressoShotViewPaginated {
    pub fn new(last_evaluated_key: String, entities: Vec<EspressoShotViewDto>) -> Self {
        Self {
            last_evaluated_key,
            entities,
        }
    }
}

impl Into<EspressoShot> for EspressoShotCreateDto {
    fn into(self) -> EspressoShot {
        let ksuid = Ksuid::new(None, None);
        let dt = Utc::now();
        let timestamp: i64 = dt.timestamp();
        let shot_date: i64 = self.shot_date.unwrap_or_else(|| dt).timestamp();

        EspressoShot::new(
            ksuid.to_string(),
            self.beans,
            self.roaster,
            self.roast_date.timestamp(),
            shot_date,
            self.grind_setting,
            self.weight_in_grams,
            self.weight_out_grams,
            self.brew_time_seconds,
            self.rating,
            self.acidity_bitterness,
            self.muddy_watery,
            self.notes,
            timestamp,
        )
    }
}

impl From<EspressoShot> for EspressoShotViewDto {
    fn from(value: EspressoShot) -> Self {
        let roast_date = DateTime::from_timestamp(value.get_roast_date(), 0).unwrap();
        let shot_date = DateTime::from_timestamp(value.get_shot_date(), 0).unwrap();
        let updated_at = DateTime::from_timestamp(value.get_updated_at(), 0).unwrap();

        EspressoShotViewDto {
            id: value.get_id(),
            beans: value.get_beans(),
            roaster: value.get_roaster(),
            roast_date,
            shot_date,
            grind_setting: value.get_grind_setting(),
            weight_in_grams: value.get_weight_in_grams(),
            weight_out_grams: value.get_weight_out_grams(),
            brew_time_seconds: value.get_brew_time_seconds(),
            rating: value.get_rating(),
            acidity_bitterness: value.get_acidity_bitterness(),
            muddy_watery: value.get_muddy_watery(),
            notes: value.get_notes(),
            updated_at,
        }
    }
}

pub fn serialize_dt<S>(dt: &DateTime<Utc>, serializer: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    dt.format("%+").to_string().serialize(serializer)
}

pub fn deserialize_dt<'de, D>(deserializer: D) -> Result<DateTime<Utc>, D::Error>
where
    D: Deserializer<'de>,
{
    let s = String::deserialize(deserializer)?;
    DateTime::parse_from_rfc3339(&s)
        .map_err(serde::de::Error::custom)
        .map(|dt| dt.with_timezone(&Utc))
}

pub fn deserialize_dt_opt<'de, D>(deserializer: D) -> Result<Option<DateTime<Utc>>, D::Error>
where
    D: Deserializer<'de>,
{
    let s: Option<String> = Option::deserialize(deserializer)?;
    if let Some(s) = s {
        let dt = DateTime::parse_from_rfc3339(&s)
            .map_err(serde::de::Error::custom)
            .map(|dt| dt.with_timezone(&Utc))?;
        Ok(Some(dt))
    } else {
        Ok(None)
    }
}

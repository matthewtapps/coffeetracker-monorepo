use serde::{Deserialize, Serialize};

use super::dto::EspressoShotPutDto;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct EspressoShot {
    id: String,
    user_id: String,
    beans: Option<String>,
    extraction_method: String,
    roaster: Option<String>,
    roast_date: Option<i64>,
    shot_date: i64,
    grind_setting: Option<f32>,
    weight_in_grams: f32,
    weight_out_grams: f32,
    brew_time_seconds: i32,
    rating: i32,
    acidity_bitterness: i32,
    muddy_watery: i32,
    notes: Option<String>,
    espresso_machine: Option<String>,
    grinder: Option<String>,
    kettle: Option<String>,
    dripper: Option<String>,
    updated_at: i64,
}

impl EspressoShot {
    pub fn new(
        id: String,
        user_id: String,
        beans: Option<String>,
        extraction_method: String,
        roaster: Option<String>,
        roast_date: Option<i64>,
        shot_date: i64,
        grind_setting: Option<f32>,
        weight_in_grams: f32,
        weight_out_grams: f32,
        brew_time_seconds: i32,
        rating: i32,
        acidity_bitterness: i32,
        muddy_watery: i32,
        notes: Option<String>,
        espresso_machine: Option<String>,
        grinder: Option<String>,
        kettle: Option<String>,
        dripper: Option<String>,
        updated_at: i64,
    ) -> EspressoShot {
        EspressoShot {
            id,
            user_id,
            beans,
            extraction_method,
            roaster,
            roast_date,
            shot_date,
            grind_setting,
            weight_in_grams,
            weight_out_grams,
            brew_time_seconds,
            rating,
            acidity_bitterness,
            muddy_watery,
            notes,
            espresso_machine,
            grinder,
            kettle,
            dripper,
            updated_at,
        }
    }

    pub fn update_from_dto(&mut self, dto: EspressoShotPutDto) {
        self.beans = dto.beans;
        self.extraction_method = dto.extraction_method;
        self.roaster = dto.roaster;
        self.roast_date = dto.roast_date.map(|d| d.timestamp());
        self.shot_date = dto.shot_date.timestamp();
        self.grind_setting = dto.grind_setting;
        self.weight_in_grams = dto.weight_in_grams;
        self.weight_out_grams = dto.weight_out_grams;
        self.brew_time_seconds = dto.brew_time_seconds;
        self.rating = dto.rating;
        self.acidity_bitterness = dto.acidity_bitterness;
        self.muddy_watery = dto.muddy_watery;
        self.notes = dto.notes;
        self.espresso_machine = dto.espresso_machine;
        self.grinder = dto.grinder;
        self.kettle = dto.kettle;
        self.dripper = dto.dripper;
        self.updated_at = chrono::Utc::now().timestamp();
    }

    pub fn get_id(&self) -> String {
        String::from(&self.id)
    }
    pub fn get_user_id(&self) -> String {
        String::from(&self.user_id)
    }

    pub fn get_beans(&self) -> &Option<String> {
        &self.beans
    }

    pub fn get_extraction_method(&self) -> String {
        String::from(&self.extraction_method)
    }

    pub fn get_roaster(&self) -> &Option<String> {
        &self.roaster
    }

    pub fn get_roast_date(&self) -> &Option<i64> {
        &self.roast_date
    }

    pub fn get_shot_date(&self) -> i64 {
        self.shot_date
    }

    pub fn get_grind_setting(&self) -> &Option<f32> {
        &self.grind_setting
    }

    pub fn get_weight_in_grams(&self) -> f32 {
        self.weight_in_grams
    }

    pub fn get_weight_out_grams(&self) -> f32 {
        self.weight_out_grams
    }

    pub fn get_brew_time_seconds(&self) -> i32 {
        self.brew_time_seconds
    }

    pub fn get_rating(&self) -> i32 {
        self.rating
    }

    pub fn get_acidity_bitterness(&self) -> i32 {
        self.acidity_bitterness
    }

    pub fn get_muddy_watery(&self) -> i32 {
        self.muddy_watery
    }

    pub fn get_notes(&self) -> &Option<String> {
        &self.notes
    }

    pub fn get_espresso_machine(&self) -> &Option<String> {
        &self.espresso_machine
    }

    pub fn get_grinder(&self) -> &Option<String> {
        &self.grinder
    }

    pub fn get_kettle(&self) -> &Option<String> {
        &self.kettle
    }

    pub fn get_dripper(&self) -> &Option<String> {
        &self.dripper
    }

    pub fn get_updated_at(&self) -> i64 {
        self.updated_at
    }
}

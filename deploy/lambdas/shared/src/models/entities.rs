use serde::{Deserialize, Serialize};

use super::dto::EspressoShotPutDto;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct EspressoShot {
    id: String,
    beans: String,
    roaster: String,
    roast_date: i64,
    shot_date: i64,
    grind_setting: i32,
    weight_in_g: f32,
    weight_out_g: f32,
    rating: i32,
    notes: String,
    updated_at: i64,
}

impl EspressoShot {
    pub fn new(
        id: String,
        beans: String,
        roaster: String,
        roast_date: i64,
        shot_date: i64,
        grind_setting: i32,
        weight_in_g: f32,
        weight_out_g: f32,
        rating: i32,
        notes: String,
        updated_at: i64,
    ) -> EspressoShot {
        EspressoShot {
            id,
            beans,
            roaster,
            roast_date,
            shot_date,
            grind_setting,
            weight_in_g,
            weight_out_g,
            rating,
            notes,
            updated_at,
        }
    }

    pub fn update_from_dto(&mut self, dto: EspressoShotPutDto) {
        self.beans = dto.beans;
        self.roaster = dto.roaster;
        self.roast_date = dto.roast_date.timestamp();
        self.shot_date = dto.shot_date.timestamp();
        self.grind_setting = dto.grind_setting;
        self.weight_in_g = dto.weight_in_g;
        self.weight_out_g = dto.weight_out_g;
        self.rating = dto.rating;
        self.notes = dto.notes;
        self.updated_at = chrono::Utc::now().timestamp();
    }

    pub fn get_id(&self) -> String {
        String::from(&self.id)
    }

    pub fn get_beans(&self) -> String {
        String::from(&self.beans)
    }

    pub fn get_roaster(&self) -> String {
        String::from(&self.roaster)
    }

    pub fn get_roast_date(&self) -> i64 {
        self.roast_date
    }

    pub fn get_shot_date(&self) -> i64 {
        self.shot_date
    }

    pub fn get_grind_setting(&self) -> i32 {
        self.grind_setting
    }

    pub fn get_weight_in_g(&self) -> f32 {
        self.weight_in_g
    }

    pub fn get_weight_out_g(&self) -> f32 {
        self.weight_out_g
    }

    pub fn get_rating(&self) -> i32 {
        self.rating
    }

    pub fn get_notes(&self) -> String {
        String::from(&self.notes)
    }

    pub fn get_updated_at(&self) -> i64 {
        self.updated_at
    }
}

import { Coffee } from "../components/coffee-data-table/columns";

export interface DdbData {
  lastEvaluatedKey: string;
  entities: Coffee[];
}

export const getDummyData = (): DdbData => {
  return { lastEvaluatedKey: "", entities: dummyData };
};

export const getLatestDummyShot = () => {
  return dummyData[dummyData.length - 1];
};

export const dummyData: Coffee[] = [
  {
    id: "1",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-14"),
    grindSetting: 11,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Tastes like blueberries",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "2",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-14"),
    grindSetting: 11,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Floral and fruity flavors",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "3",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-14"),
    grindSetting: 11,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Rich chocolatey taste",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "4",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-15"),
    grindSetting: 11,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Smooth and nutty flavor",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "5",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-15"),
    grindSetting: 9,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Bright and citrusy taste",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "6",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-16"),
    grindSetting: 9,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Caramel and toffee notes",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "7",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-16"),
    grindSetting: 11,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Balanced and smooth flavor",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "8",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-17"),
    grindSetting: 11,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Hints of brown sugar and cocoa",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "9",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-17"),
    grindSetting: 11,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Delicate and tea-like taste",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "10",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-18"),
    grindSetting: 11,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Toasted almond flavor",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "11",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-18"),
    grindSetting: 11,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Sweet and fruity aroma",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "12",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-18"),
    grindSetting: 11,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Smooth and chocolatey taste",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "13",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-19"),
    grindSetting: 11,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Rich and full-bodied flavor",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "14",
    beans: "Test Origin",
    roaster: "Test Roaster",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-19"),
    grindSetting: 10,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Subtle floral undertones",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "15",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-20"),
    grindSetting: 10,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Smooth and balanced profile",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "16",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-20"),
    grindSetting: 10,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Notes of caramel and honey",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "17",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-20"),
    grindSetting: 10,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Bright and fruity acidity",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "18",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-21"),
    grindSetting: 10,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Earthy and spicy flavors",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "19",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-22"),
    grindSetting: 10,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Bold and robust taste",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "20",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-22"),
    grindSetting: 9,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Spicy and aromatic profile",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "21",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-23"),
    grindSetting: 9,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Floral and fruity flavors",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "22",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-23"),
    grindSetting: 9,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Rich chocolatey taste",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "23",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-24"),
    grindSetting: 9,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Smooth and nutty flavor",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "24",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-24"),
    grindSetting: 9,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Bright and citrusy taste",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "25",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-04"),
    shotDate: new Date("2024-04-25"),
    grindSetting: 9,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Caramel and toffee notes",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "26",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-16"),
    shotDate: new Date("2024-04-26"),
    grindSetting: 11,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Balanced and smooth flavor",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "27",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-16"),
    shotDate: new Date("2024-04-26"),
    grindSetting: 11,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Hints of brown sugar and cocoa",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "28",
    beans: "Another Origin",
    roaster: "Another Roaster",
    roastDate: new Date("2024-04-16"),
    shotDate: new Date("2024-04-26"),
    grindSetting: 11,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Delicate and tea-like taste",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "29",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-16"),
    shotDate: new Date("2024-04-27"),
    grindSetting: 11,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Toasted almond flavor",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
  {
    id: "30",
    beans: "Papua New Guinea",
    roaster: "Proud Mary",
    roastDate: new Date("2024-04-16"),
    shotDate: new Date("2024-04-27"),
    grindSetting: 11,
    brewTimeSeconds: getRandomBrewTime(),
    weightInGrams: getRandomWeightIn(),
    weightOutGrams: getRandomWeightOut(),
    rating: Math.random() * 10,
    notes: "Sweet and fruity aroma",
    acidityBitterness: 3,
    muddyWatery: 3,
    updatedAt: new Date("2024-04-14"),
  },
];

function getRandomWeightIn(): number {
  /**
   * Returns a random weight in grams between 18 and 18.5.
   */
  return parseFloat((Math.random() * 0.5 + 18).toFixed(1));
}

function getRandomWeightOut(): number {
  /**
   * Returns a random weight out grams between 43 and 58.
   */
  return parseFloat((Math.random() * 5 + 43).toFixed(1));
}

function getRandomBrewTime(): number {
  /**
   * Returns a random brew time in seconds between 20 and 35.
   */
  return Math.floor(Math.random() * 15 + 20);
}

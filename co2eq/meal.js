export const modelVersion = 1;

export const MEAL_WEIGHT = 400; // grams

// From http://www.greeneatz.com/foods-carbon-footprint.html
const CARBON_INTENSITY = { // kgCO2eq / kg
  'Lamb': 39.2,
  'Beef': 27.0,
  'Cheese': 13.5,
  'Pork': 12.1,
  'Turkey': 10.9,
  'Chicken': 6.9,
  'Tuna': 6.1,
  'Eggs': 4.8,
  'Potatoes': 2.9,
  'Rice': 2.7,
  'Nuts': 2.3,
  'Beans/tofu': 2.0,
  'Vegetables': 2.0,
  'Milk': 1.9,
  'Fruit': 1.1,
  'Lentils': 0.9,
};
export const INGREDIENTS = Object.keys(CARBON_INTENSITY);

/*
Carbon intensity of ingredient (kgCO2 per kg).
*/
export function carbonIntensity(ingredient) {
  if (!CARBON_INTENSITY[ingredient]) {
    throw Error(`Unknown ingredient: ${ingredient}`);
  }
  return CARBON_INTENSITY[ingredient];
}

/*
Carbon emissions of an activity (in kgCO2eq)
*/
export function carbonEmissions(activity) {
  const { ingredients } = activity;
  return ingredients
    .map(k => carbonIntensity(k) * (MEAL_WEIGHT / 1000.0 / ingredients.length))
    .reduce((a, b) => a + b, 0);
}

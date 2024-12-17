const validateCharacterFields = (characterData) => {
  const requiredFields = {
    nombre: "name",
    altura: "height",
    masa: "mass",
    colorCabello: "hair_color",
    colorPiel: "skin_color",
    colorOjos: "eye_color",
    añoNacimiento: "birth_year",
    genero: "gender",
  };

  const missingFields = Object.keys(requiredFields).filter(
    (field) => !characterData[field]
  );

  if (missingFields.length > 0) {
    throw new Error(
      `Faltan campos obligatorios en el personaje: ${missingFields.join(", ")}`
    );
  }
};

export function validatePlanetFields(planet) {
  const requiredFields = [
    "name",
    "rotation_period",
    "orbital_period",
    "diameter",
    "climate",
    "gravity",
    "terrain",
    "surface_water",
    "population",
  ];
  const missingFields = requiredFields.filter((field) => !planet[field]);

  if (missingFields.length > 0) {
    throw new Error(
      `Faltan campos obligatorios en el planeta: ${missingFields.join(", ")}`
    );
  }
}

export default validateCharacterFields;

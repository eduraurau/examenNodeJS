import express from "express";
import {
  getInternalCharacters,
  getExternalCharacters,
  getInternalCharacterById,
  getExternalCharacterById,
} from "../handlers/getCharacters.js";
import {
  getInternalPlanets,
  getExternalPlanets,
  getInternalPlanetById,
  getExternalPlanetById,
} from "../handlers/getPlanets.js";
import { handler as createCharacter } from "../handlers/createCharacter.js";
import { handler as createPlanet } from "../handlers/createPlanet.js";

const router = express.Router();

router.get("/characters/internal", getInternalCharacters);
router.get("/characters/internal/:id", getInternalCharacterById);
router.get("/characters/external", getExternalCharacters);
router.get("/characters/external/:id", getExternalCharacterById);
router.post("/characters/internal", createCharacter);

router.get("/planets/internal", getInternalPlanets);
router.get("/planets/internal/:id", getInternalPlanetById);
router.get("/planets/external", getExternalPlanets);
router.get("/planets/external/:id", getExternalPlanetById);
router.post("/planets/internal", createPlanet);

export default router;

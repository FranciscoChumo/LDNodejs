import  express  from "express";
import { getAvailableSpecialties } from "../controller/CitaController";
const rotuer = express.Router();
rotuer.get('/buscar',getAvailableSpecialties);
export const Router = rotuer;

import { Router } from "express";
import { newClient,viewAllClient,viewIdClient,editClient } from "../controller/user.controller.js";
import { protectRoute,getProfile } from "../controller/auth.controller.js";

const clientRoutes = Router();

clientRoutes.post('/new',protectRoute,getProfile,newClient);
clientRoutes.get('/all',protectRoute,getProfile,viewAllClient);
clientRoutes.get('/view/:id',protectRoute,getProfile,viewIdClient);
clientRoutes.post('/edit/:id',protectRoute,getProfile,editClient);

export default clientRoutes;
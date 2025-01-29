import express from 'express';
//Import Routes
import clientRoutes from '../middlewares/client.routes.js';
import auhtRoutes from '../middlewares/auth.routes.js';
import ticketRoute from '../middlewares/ticket.routes.js';
import payRoutes from '../middlewares/payment.routes.js';
import documentRoutes from '../middlewares/document.routes.js';
import profileRoute from '../middlewares/profile.routes.js';
import notesRoutes from '../middlewares/notes.routes.js';
import serviceRoutes from '../middlewares/servicesPackage.routes.js';


const configureRoutes = (app) => {

    const principal = '/api'

    app.use(`${principal}/client`, clientRoutes);
    app.use(`${principal}/auth`, auhtRoutes);
    app.use(`${principal}/ticket`, ticketRoute);
    app.use(`${principal}/pay`, payRoutes);
    app.use(`${principal}/document`, documentRoutes);
    app.use(`${principal}/public/`, express.static('./storage/img'));
    app.use(`${principal}/profile`, profileRoute);
    app.use(`${principal}/note`, notesRoutes);
    app.use(`${principal}/packages`, serviceRoutes);
}

export default configureRoutes;
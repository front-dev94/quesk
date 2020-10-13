import express from "express";
import bodyParser from "body-parser";
import setRoutes from "./routes";
import cors from 'cors';

const server = express();

// parse requests of content-type - application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
server.use(bodyParser.json());

server.use(cors());

const router = express.Router()

server.use(router);
setRoutes(router);

export default server;
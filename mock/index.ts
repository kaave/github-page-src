/* eslint-disable import/no-extraneous-dependencies */

import express from 'express';
import jsonGraphqlExpress from 'json-graphql-server';
import Dotenv from 'dotenv';

import { data } from './data';

Dotenv.config();

const PORT = parseInt(process.env.PORT_MOCK || '4000', 10);
const ENDPOINT = process.env.ENDPOINT_MOCK || '/graphql';

const app = express();
app.use(ENDPOINT, jsonGraphqlExpress(data));
app.listen(PORT);

console.log(`graphql mock start: http://localhost:${PORT + ENDPOINT}`);

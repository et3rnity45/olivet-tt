import 'reflect-metadata';
import { config } from 'dotenv';
import connectDB from './config/database';
import { initServer, initMailer } from './app';

config();
connectDB();
initServer();
initMailer();

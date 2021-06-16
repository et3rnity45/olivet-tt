import 'reflect-metadata';
import { config } from 'dotenv';
import connectDB from '@Config/database';
import initServer from './app';

config();
connectDB();
initServer();

/* eslint-disable no-console */
import { Redis } from 'ioredis';
import { redisUrl } from '../config';

const redisClient = () => {
  if (redisUrl) {
    console.log('Redis Connected');
    return redisUrl;
  }
  throw new Error('Could not connect to Redis');
};

export const redis = new Redis(redisClient());

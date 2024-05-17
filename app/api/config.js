export const BASE_URL = 'http://localhost:3001/api';

export const endpoints = {
  games: `${BASE_URL}/games`,
  auth: `${BASE_URL}/auth/login`,
  reg: `${BASE_URL}/auth/local/register`,
  me: `${BASE_URL}/me`,
};
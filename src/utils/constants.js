import { API_URL } from "./config";

export const BASE_URL = API_URL() + "/api";

// Users api urls CURRENTLY static 
export const GET_USERS = () => "https://randomuser.me/api/";

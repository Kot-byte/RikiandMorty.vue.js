import axios from "axios";
import { stringify } from "querystring";

const BASE_URL = "https://rickandmortyapi.com/api/";

export const fetchCharacters = async (page, name, status) => {
  try {
    const query = stringify({ page, name, status });
    const response = await axios.get(`${BASE_URL}character?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

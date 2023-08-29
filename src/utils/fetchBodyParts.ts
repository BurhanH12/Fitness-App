import axios, { AxiosRequestConfig } from 'axios';

// Define the API request options
const options: AxiosRequestConfig = {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
  headers: {
    'X-RapidAPI-Key': '1b221abd7dmshc0fe2e069f76ecep1dde66jsn1c7161c266e8',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};

// Function to fetch body parts data
async function fetchBodyParts(): Promise<any> {
  try {
    const response = await axios.request(options);
    return response.data;

  } catch (error) {
    throw new Error(`Failed to fetch body parts: ${error}`);
  }
}

export { fetchBodyParts };

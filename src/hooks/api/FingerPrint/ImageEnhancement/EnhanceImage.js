import axios from "axios";
import { BASE_URL } from "../../../../utils/Constants";

export async function enhanceImage(imgUrl) {
  const url = `${BASE_URL}fingerprint/enhance`;

  try {
    const response = await axios.post(
      url,
      { image_data: imgUrl },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data; // Return the response data instead of the full response
  } catch (error) {
    console.error("Error adding fingerprint:", error);
    throw error;
  }
}

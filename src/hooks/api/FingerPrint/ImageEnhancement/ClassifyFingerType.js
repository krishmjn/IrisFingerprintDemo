import axios from "axios";
import { BASE_URL } from "../../../../utils/Constants";

export async function classifyFingerType(imgUrl) {
  const url = `${BASE_URL}fingerprint/classify_finger_type`;

  try {
    const response = await axios.post(
      url,
      { image_data: imgUrl },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error adding fingerprint:", error);
    throw error;
  }
}

import axios from "axios";
import { BASE_URL } from "../../../../utils/Constants";

export async function searchFingerprint(fingerPrintData) {
  const url = `${BASE_URL}fingerprint/find_matches`;
  // const url = `${BASE_URL}save-template`;

  try {
    const response = await axios.post(url, fingerPrintData);
    return response?.data;
  } catch (error) {
    console.error("Error adding fingerprint:", error);
    throw error;
  }
}

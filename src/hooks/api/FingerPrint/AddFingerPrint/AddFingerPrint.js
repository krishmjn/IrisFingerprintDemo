import axios from "axios";
import { BASE_URL } from "../../../../utils/Constants";

export async function addFingerPrint(fingerPrintData = {}) {
  const url = `${BASE_URL}fingerPrints`;

  try {
    const response = await axios.post(url, fingerPrintData);
    return response;
  } catch (error) {
    console.error("Error adding fingerprint:", error);
    throw error;
  }
}

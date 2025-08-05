import axios from "axios";
import { BASE_URL } from "../../../../utils/Constants";

export async function fetchFingerPrint() {
  const url = BASE_URL + "fingerprint/fetch_all";

  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
}

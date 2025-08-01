import axios from "axios";

import { BASE_URL } from "../../../../utils/Constants";

export async function fetchFingerPrint() {
  const url = BASE_URL + "fingerPrints";

  const response = await axios({
    method: "GET",
    url,
  });
  return response.data;
}

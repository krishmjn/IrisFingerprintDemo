import axios from "axios";

import { BASE_URL } from "../../../../utils/Constants";

export async function deleteFingerPrint(id) {
  const url = `${BASE_URL}fingerPrints/${id}`;

  const response = await axios({
    method: "DELETE",
    url,
  });
  return response.data;
}

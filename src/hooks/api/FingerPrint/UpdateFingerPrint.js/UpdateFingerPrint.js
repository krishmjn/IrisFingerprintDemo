import axios from "axios";

import { BASE_URL } from "../../../../utils/Constants";

export async function updateFingerPrint(id, updateData) {
  const url = `${BASE_URL}fingerPrints/${id}`;

  const response = await axios({
    method: "PUT",
    url,
    data: updateData,
  });
  return response.data;
}

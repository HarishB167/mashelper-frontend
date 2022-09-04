import http from "./httpService";

export async function getMaterialLineItems() {
  const result = await http.get("/materiallineitem/");
  return result.data;
}

export default {
  getMaterialLineItems,
};

import http from "./httpService";

export async function getMaterialLineItems() {
  const result = await http.get("/materiallineitem/");
  return result.data;
}

export async function createMaterialLineItems(lineItems) {
  const result = await http.post("/materiallineitems/", lineItems);
  return result.data;
}

export async function getUnitsList() {
  const result = await http.get("/unit/");
  return result.data;
}

export async function getMaterialsList() {
  const result = await http.get("/material");
  return result.data;
}

export default {
  getMaterialLineItems,
  createMaterialLineItems,
  getUnitsList,
  getMaterialsList,
};

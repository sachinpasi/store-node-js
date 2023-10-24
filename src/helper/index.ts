import { CONSTANTS } from "../constants";
import { IConstantValues } from "../typings/types";

const getConstantValues = (obj: IConstantValues) => {
  return Object.values(obj);
};
const getRouteURL = (API_CATEGORIE: string) => {
  const { PREFIX, API_VERSION } = CONSTANTS.ROUTES;
  return (PREFIX + API_VERSION + API_CATEGORIE).toString();
};

export { getConstantValues, getRouteURL };

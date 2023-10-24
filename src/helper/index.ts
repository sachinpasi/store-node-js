import { CONSTANTS } from "../constants";
import { IConstantValues, IMongoosePaginationOptions } from "../typings/types";

const getConstantValues = (obj: IConstantValues) => {
  return Object.values(obj);
};
const getRouteURL = (API_CATEGORIE: string) => {
  const { PREFIX, API_VERSION } = CONSTANTS.ROUTES;
  return (PREFIX + API_VERSION + API_CATEGORIE).toString();
};

const getMongoosePaginationOptions = ({
  page = 1,
  limit = CONSTANTS.PAGINATION_LIMIT,
  customLabels,
}: any) => {
  return {
    page: Math.max(page, 1),
    limit: Math.max(limit, 1),
    pagination: true,
    customLabels: {
      pagingCounter: "serialNumberStartFrom",
      ...customLabels,
    },
  };
};

export { getConstantValues, getRouteURL, getMongoosePaginationOptions };

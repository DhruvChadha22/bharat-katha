import { apiConnector } from "../apiConnector";
import { regionsAPI } from "../apiRoutes";
import type { ApiResponse } from "@/types/api-response";
import type { Regions } from "@/types/regions";

const {
    GET_ALL_REGIONS,
} = regionsAPI;

export const getAllRegions = async () => {
    const response = await apiConnector("get", GET_ALL_REGIONS);
    const result: ApiResponse<Regions> = response.data;
    return result;
};

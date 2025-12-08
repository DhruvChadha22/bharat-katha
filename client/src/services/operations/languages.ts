import { apiConnector } from "../apiConnector";
import { languagesAPI } from "../apiRoutes";
import type { ApiResponse } from "@/types/api-response";
import type { Languages } from "@/types/languages";

const {
    GET_ALL_LANGUAGES,
} = languagesAPI;

export const getAllLanguages = async () => {
    const response = await apiConnector("get", GET_ALL_LANGUAGES);
    const result: ApiResponse<Languages> = response.data;
    return result;
};

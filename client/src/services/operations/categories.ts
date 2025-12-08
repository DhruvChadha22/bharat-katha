import { apiConnector } from "../apiConnector";
import { categoriesAPI } from "../apiRoutes";
import type { ApiResponse } from "@/types/api-response";
import type { Categories } from "@/types/categories";

const {
    GET_ALL_CATEGORIES,
} = categoriesAPI;

export const getAllCategories = async () => {
    const response = await apiConnector("get", GET_ALL_CATEGORIES);
    const result: ApiResponse<Categories> = response.data;
    return result;
};

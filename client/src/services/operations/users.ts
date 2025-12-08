import { apiConnector } from "../apiConnector";
import { usersAPI } from "../apiRoutes";
import type { ApiResponse } from "@/types/api-response";
import type { 
    User, 
    TopUsers, 
    UserProfile,
    UpdateUserResponse,
} from "@/types/users";

const {
    GET_USER,
    GET_TOP_USERS,
    GET_USER_BY_ID,
    UPDATE_USER,
    DELETE_USER,
} = usersAPI;

export const getUser = async () => {
    const response = await apiConnector("get", GET_USER);
    const result: ApiResponse<User> = response.data;
    return result;
};

export const getTopUsers = async () => {
    const response = await apiConnector("get", GET_TOP_USERS);
    const result: ApiResponse<TopUsers> = response.data;
    return result;
};

export const getUserById = async (userId: string) => {
    const response = await apiConnector("get", `${GET_USER_BY_ID}/${userId}`);
    const result: ApiResponse<UserProfile> = response.data;
    return result;
};

export const updateUser = async (formData: FormData) => {
    const response = await apiConnector("patch", UPDATE_USER, formData);
    const result: ApiResponse<UpdateUserResponse> = response.data;
    return result;
};

export const deleteUser = async () => {
    await apiConnector("delete", DELETE_USER);
};

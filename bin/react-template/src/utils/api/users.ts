import { type AxiosResponse } from "axios";

import { api } from "./api";
import { parseError } from "./error-handler";
import {
    type LoginInput,
    type RegistrationInput,
    type LoginResponse,
    type RegistrationResponse
} from "../types";

export const register = async (
    input: RegistrationInput
): Promise<RegistrationResponse> => {
    try {
        const response: AxiosResponse<RegistrationResponse> =
            await api.post<RegistrationResponse>("/users/register", input);
        return response.data;
    } catch (err) {
        throw parseError(err);
    }
};

export const login = async (input: LoginInput): Promise<LoginResponse> => {
    try {
        const response: AxiosResponse<LoginResponse> =
            await api.post<LoginResponse>("/users/login", input);
        return response.data;
    } catch (err) {
        throw parseError(err);
    }
};

export const me = async (): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await api.get("/users/me");
        return response.data;
    } catch (err) {
        throw parseError(err);
    }
};

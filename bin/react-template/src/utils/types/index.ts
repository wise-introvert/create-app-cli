export interface User {
    id: string;
    username: string;
    passwordHash: string;
    email: string;
    fullName?: string;
    createdAt: string | number;
    updatedAt: string | number;
}

export interface LoginInput {
    username: string;
    password: string;
}

export interface RegistrationInput {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    fullName?: string;
}

export interface SessionInput {
    distance: number;
    notes?: string;
    date?: string;
}

export interface BaseResponse {
    success: boolean;
    message: string | null;
}

export interface LoginResponse extends BaseResponse {
    user: Omit<User, "passwordHash"> | null;
}

export interface RegistrationResponse extends BaseResponse {
    user: Omit<User, "passwordHash"> | null;
}

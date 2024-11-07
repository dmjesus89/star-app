import { UserRole } from "./user-role";

export interface AuthenticationResponse {
    token: string;
    userId: string; // UUID will be string in TypeScript
    email: string;
    fullname: string;
    role: UserRole;
}
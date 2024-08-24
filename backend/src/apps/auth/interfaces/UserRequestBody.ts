export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    verified: boolean;
    isActive: boolean;
    lastLogin: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
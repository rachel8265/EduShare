export interface User {
id: number,
    email: string;
    fullName: string;
    password: string;
    createdAt: string;
    role:   'Admin' | 'User'|'Editor'
    isDeleted: boolean;
    lastLoginAt?: string;
}

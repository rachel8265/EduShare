export interface UserType {
     id: number,
    email: string;
    fullName: string;
    password: string;
    role:  'User';
    // "Admin" | "Teacher" | "SchoolAdmin" | "Student" | "User"
    //  token?: string
}


export interface LoginUser {
    email: string;
    password: string;
}
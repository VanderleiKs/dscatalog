export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];           
}

type Role = {
    id: number;
    authority: string;
}

export type UserResponse = {
    content: User[];
    totalPages: number;
    totalElements: number;
    size: number;
}
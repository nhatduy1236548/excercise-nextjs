export interface User {
    _id: string
    email: string 
    name?: string
}

export interface Role {
    role_name: string
}

export interface Permission {
    permission_name: string
    description: string
    roles: Role[];
}
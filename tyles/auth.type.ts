import { Permission, User } from "./user.type"
import { SuccessResponse } from "./utils.type"

export type AuthResponse = SuccessResponse<{
    accessToken: string
    expires?: number
    user?: User
}>

export type AllPermissionResponse = SuccessResponse<{
    permissions: Permission[]
}>
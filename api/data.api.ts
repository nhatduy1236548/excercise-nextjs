import { AllPermissionResponse } from "@/tyles/auth.type";
import http from "@/utils/http";


export const URL_ALLPERMISSION = 'getAllPermissions'

const permissionApi = {
    getAllPermissions() {
        return http.get<AllPermissionResponse>(URL_ALLPERMISSION);
    }
}

export default permissionApi;
import { Permission } from "@/tyles/user.type";
import React, { useState } from "react";
import Cell from "../TableListCell";

interface Props {
    children: React.ReactNode,
    permissions: Permission[],
    handleRoleDelete: (name: string) => void,
    selectedPermission: Permission | null,
    setSelectedPermission: React.Dispatch<React.SetStateAction<Permission | null>>
}

export default function Table({ selectedPermission, setSelectedPermission, children, permissions, handleRoleDelete }: Props) {

    const handlePermissionClick = (permission: Permission) => {
        setSelectedPermission(permission);
    }

    return (
        <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
                {children}
            </thead>
            <tbody>
                {permissions.map((permission, index) => (
                    <tr
                        key={index}
                        className={`border-t border-gray-200 ${selectedPermission === permission ? 'bg-blue-100' : ''}`}
                        onClick={() => handlePermissionClick(permission)}
                    >
                            <td className="px-4 py-2 text-center">{permission.permission_name}</td>
                            <td className="px-4 py-2 text-center">{permission.description}</td>
                            <td className="px-4 py-2 text-center">
                                <ul className="flex space-x-4">
                                    {permission.roles.map((role, index_role) => {
                                       console.log(role)
                                       console.log(`${role.role_name}${index}`)
                                       return (
                                        <Cell index={`${index_role}${index}`} role={role} handleRoleDelete={handleRoleDelete} />
                                    ) })
                                }  
                                </ul>
                            </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
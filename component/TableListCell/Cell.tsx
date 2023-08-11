import { Role } from "@/tyles/user.type";

interface Props {
    role: Role,
    handleRoleDelete: ( name:string ) =>void,
    index: string
}
export function Cell({ role, handleRoleDelete, index}: Props) {
  console.log(`${role.role_name}${index}`)
  return (
    <li key={`${role.role_name}${index}`} className="flex items-center">
    {role.role_name}
    <button
      className="ml-2 text-red-500 p-0 w-4"
      onClick={() => handleRoleDelete(role.role_name)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </li>
  );
}

import { Permission } from "@/tyles/user.type"
import config from "@/constants/config";
import Table from "@/component/Table/Table";
import { Fragment, useContext, useEffect, useState } from "react";
import { URL_ALLPERMISSION } from "@/api/data.api";
import { AppContext } from "@/contexts/app.context";
import http from "@/utils/http";
import { getAccessTokenFromLS } from "@/utils/auth";
import Head from "next/head";

interface Props {
    posts: Permission[]
}

function Home() {
  const [data, setData] = useState<Permission[]>([])
    const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
    const handleRoleDelete = (roleName: string) => {
        if(selectedPermission) {
            const updatedRoles = selectedPermission.roles.filter((role)=> role.role_name !== roleName);
            const updatedPermission = {...selectedPermission, roles: updatedRoles};
            setSelectedPermission(updatedPermission);
        }
    }

    useEffect(() => {
      console.log('home_page: '+ getAccessTokenFromLS());
      const fetchData = async () => {
        const url = `${config.baseUrl}/${URL_ALLPERMISSION}`;
        const headers = {
          Authorization: `Bearer ${getAccessTokenFromLS()}`
        };
        const response = await fetch(url, { method: 'GET', headers: headers});
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
      }
   
      fetchData().catch((e) => {
        // handle the error as needed
        console.error('An error occurred while fetching the data: ', e)
      })
    }, []);

    return (
      <Fragment>
          <Head>
            <title>Home</title>
            <meta name='description' content='Dashboard' />
          </Head>
          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="text-lg font-semibold mb-4">Permission List</h2>
                  <Table handleRoleDelete={handleRoleDelete} permissions={data} selectedPermission={selectedPermission} setSelectedPermission={setSelectedPermission}>
                      <tr>
                          <th className="px-4 py-2">Permission Name</th>
                          <th className="px-4 py-2">Description</th>
                          <th className="px-4 py-2">Roles</th>
                      </tr>
                  </Table>
              </div>
           </div>
      </Fragment>   
    )
  }

  export default Home;
   

import { User } from "@/tyles/user.type";
import { getAccessTokenFromLS, getProfileFromLS } from "@/utils/auth";
import { createContext, useState } from "react";

interface AppContextInterface {
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    profile: User | null
    setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
    isAuthenticated: Boolean(getAccessTokenFromLS()),
    setIsAuthenticated: () => null,
    profile: getProfileFromLS(),
    setProfile: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext);
export const AppProvider = ({children}:{children: React.ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated);
    const [profile, setProfile] = useState<User | null>(initialAppContext.profile)

    return (
        <AppContext.Provider value={{ 
            isAuthenticated,
            setIsAuthenticated,
            profile,
            setProfile
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
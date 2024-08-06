import { User } from "@/lib/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {parseCookies} from "nookies";
import { useRouter } from "next/navigation";


interface AuthProps {
    user : User | null;
    logout : () => void;    
}

const AuthContext = createContext<AuthProps | undefined>(undefined)

export const AuthProvider : React.FC<{children : ReactNode}> = ({children}) => {
    const router = useRouter();
    const [user , setUser] = useState<User | null>(null);

    useEffect(()=>{
        const cookies = parseCookies();
        const token = cookies.token;

        if(token) {
            // verifyToken(token).then(user => setUser(user)).catch(()=>setUser(null));
        }
    },[])

    const logout = () => {
        fetch('/api/auth/logout', { method: 'POST' })
          .then(() => {
            setUser(null);
            router.push('/login');
          })
          .catch(err => console.error(err));
      };

    return (
        <AuthContext.Provider value={{
            user,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
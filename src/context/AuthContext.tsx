"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { UserInterface } from "@/models/user.model";
import axios from "axios";
import { CookieDataInterface } from "@/types/Data/cookieData";
import toast from "react-hot-toast";

export interface AuthProps {
  isAuthenticated: boolean;
  user: CookieDataInterface | null;
  login: (
    username: string | null | undefined,
    email: string | null | undefined,
    password: string
  ) => Promise<void>;
  signup: (
    username: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string | null | undefined
  ) => Promise<boolean>;
  verifyUser : (token : string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const [user, setUser] = useState<CookieDataInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const checkAuth = async () => {
    try {
      const response = await axios.get("/api/user/userInfo");
      setIsAuthenticated(true);
      setUser(response.data.data);
    } catch (error: any) {
      setIsAuthenticated(false);
      toast.success(error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth().then(()=>{
      console.log("Data fetch successfully")
    });
  }, []);

  const login = async (
    username: string | null | undefined,
    email: string | null | undefined,
    password: string
  ) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/login", {
        username,
        email,
        password,
      });
      checkAuth().then(()=>{
        toast.success("Login Successful");
        router.push("/");
      })
    } catch (error) {
     
      setIsAuthenticated(false);
      setUser(null);
      toast.success("Login failed");
      router.push("/login");
    } finally {
      setLoading(false)
    }
  };

  const signup = async (
    username: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string | null | undefined
  ) => {
    let response;
    let res = false;
    try {
      setLoading(true);
      response = await toast.promise(
        axios.post("/api/user/signup", {
          username,
          email,
          password,
          firstname,
          lastname,
        }),
        {
          loading: "Loading",
          success: "Got the data",
          error: "Error when fetching",
        }
      );
      console.log(response)
      toast.success("Success : Verification link send to your email");
      res = true;
      // return true;
    } catch (error: any) {
      console.log(error)
      setUser(null);
      toast.error(error.response.data.error);
      // return false;
    }finally{
      console.log("Finally running")
      setLoading(false)
    }
    return res;
  };

  const logout = () => {
    axios
      .get("/api/user/logout")
      .then(() => {
        setIsAuthenticated(false);
        toast.success(
          "Logout Successfully"
        )
        setUser(null);
        router.push("/login");
      })
      .catch((err) => console.error(err));
  };
  const verifyUser = async (token : string) => {
    let response = false;
    try {
      await toast.promise(axios.post("/api/user/verifyemail",{token}),{
        loading: "Verifying",
        success: "Verified",
        error: "Verification failed",
      })
      await checkAuth()
      response = true;
    } catch (error : any) {
      console.error(error.message);  
    }      
    setLoading(false);
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout,
        verifyUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

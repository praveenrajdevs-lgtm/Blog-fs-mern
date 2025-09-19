import { createContext, useContext } from "react";

export const AuthContext = createContext();

export default AuthProvider = ({ children }) => {
  return <AuthContext>{children}</AuthContext>;
};

export const useAuthContext = useContext(AuthContext);

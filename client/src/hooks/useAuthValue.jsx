import { useContext } from "react";
import AuthContext from "../Providers/Auth/AuthContext";

const useAuthValue = () => useContext(AuthContext);

export default useAuthValue;

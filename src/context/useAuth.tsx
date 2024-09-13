import { useContext } from "react"
//// Others
import { AuthContext } from "./authProvider"

export const useAuth = () => useContext(AuthContext)
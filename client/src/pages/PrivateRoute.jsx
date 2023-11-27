import { Outlet, useLocation } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { UserAUth } from "../context/UserContext"
const PrivateRoute = () => {

    const {user} = UserAUth()
    const location = useLocation()
  
    if(user.isLoggedIn){
      console.log("logged in : private",user.isLoggedIn)
    }
  return (
    
     user.isLoggedIn 
     ? <Outlet/> 
     : <Navigate to="/" state={{from: location}} replace/>
    
  )
}

export default PrivateRoute

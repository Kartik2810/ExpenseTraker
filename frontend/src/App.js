import React from "react"
import Homepage from "./pages/Homepage";
import { Routes ,Route ,Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";




function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<ProtectedRoute><Homepage/></ProtectedRoute>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    
    </Routes>
    
    
    </>
  )
}

export function ProtectedRoute(props){
    if(localStorage.getItem("user")){
        return props.children
    }
    else{
      return <Navigate to="/login"/>
    }
}



export default App;

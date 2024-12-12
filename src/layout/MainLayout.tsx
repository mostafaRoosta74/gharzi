import {Outlet} from "react-router-dom";
import {Box, CircularProgress} from "@mui/material";
import BottomNavigate from "./component/BottomNavigate";
import {TopAppBar} from "./component/TopAppBar";
import {useEffect} from "react";

export const MainLayout = ()=> {

    if (!window.localStorage.getItem("token")){
        window.location.pathname = "/login"
        return <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",width:"100vw",height:"100vh"}}>
            <CircularProgress/>
        </Box>
    }else{

        return (
            <Box>
                <TopAppBar/>
                <Outlet />
                <BottomNavigate/>
            </Box>
        )
    }

}
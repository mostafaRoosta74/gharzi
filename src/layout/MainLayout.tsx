import {Outlet} from "react-router-dom";
import {Box, CircularProgress} from "@mui/material";
import BottomNavigate from "./component/BottomNavigate";
import {TopAppBar} from "./component/TopAppBar";
import {useEffect} from "react";
import { fixToken } from "../utils/utils";

export const MainLayout = ()=> {

    if (!window.localStorage.getItem("token")){
        window.location.pathname = "/login";
        return <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",width:"100vw",height:"100vh"}}>
            <CircularProgress/>
        </Box>
    }else{
        fixToken(window.localStorage.getItem("token") || "");
        return (
            <Box>
                <TopAppBar/>
                <Outlet />
                <BottomNavigate/>
            </Box>
        )
    }

}
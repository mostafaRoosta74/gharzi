import {AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography, useTheme} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LanguageIcon from '@mui/icons-material/Language';
import {matchRoutes, useLocation, useNavigate} from "react-router-dom";
import {useMemo, useState, useTransition} from "react";
import useLocales from "../../hooks/useLocales";
import useSettings from "../../hooks/useSettings";

const backList = [
    "ABSOLUTE_ROUTES.CHAT.VIEW",
].map((item) => ({
    path: item,
}));

const getPageTitle= (pathname:string) => {
    if (pathname === "/"){
        return "BOTTOM_NAVIGATE_HOME"
    }else if (pathname === "/profile"){
        return "BOTTOM_NAVIGATE_PROFILE"
    }else if (pathname === "/add_post"){
        return "BOTTOM_NAVIGATE_ADD_POST"
    }
}



export const TopAppBar = () => {
    const location = useLocation();
    const {translate} = useLocales();
    const {onChangeDirectionByLang} = useSettings();
    const theme = useTheme();
    const {onChangeLang} = useLocales();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const isInBlackList = useMemo(
        () => !!matchRoutes(backList, location),
        [location]
    );

    return (
        <AppBar position="static">
        <Toolbar>
            {
                isInBlackList &&
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <ArrowBackIosNewIcon/>
                    </IconButton>
            }
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {translate(getPageTitle(location.pathname))}
            </Typography>
            <IconButton sx={{color:"white"}} onClick={(event)=>{
                setAnchorEl(event.currentTarget)
            }}>
                <LanguageIcon color={"inherit"}/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={()=>{
                    setAnchorEl(null)
                }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={()=>{
                    setAnchorEl(null);
                    onChangeLang("en")
                    onChangeDirectionByLang("en")
                }}>English</MenuItem>
                <MenuItem onClick={()=>{
                    setAnchorEl(null)
                    onChangeLang("fa")
                    onChangeDirectionByLang("fa")

                }}>فارسی</MenuItem>
            </Menu>
        </Toolbar>
    </AppBar>)
}
import {Box, Button, IconButton, Menu, MenuItem, Stack, TextField, Typography} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LanguageIcon from "@mui/icons-material/Language";
import {useState} from "react";
import useLocales from "../../hooks/useLocales";
import useSettings from "../../hooks/useSettings";
import {Formalite} from "@novin-dev/formalite";
import {useSignupForm, useSignupRef, validation, ValidationType} from "../../hooks/forms/useSignupForm";
import serverAxios from "../../axios/serverAxios";
import {useNavigate, useSearchParams} from "react-router-dom";
import {LoadingButton} from "@mui/lab";

export const SignUp = () => {
    const {translate} = useLocales();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const {onChangeLang} = useLocales();
    const {onChangeDirectionByLang} = useSettings();
    const signupForm = useSignupForm();
    const userRef = useSignupRef()
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const  number =  searchParams.get('phone')



    return <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height={"100vh"} >
        <Box sx={{background:"url(/img8.jpg)" ,position:"absolute",zIndex:"-1",top:0,left:0,right:0,bottom:0,
            backgroundSize: "cover",
            opacity: "0.3"
        }}/>
        <Box sx={{position:"absolute",top:"8px",right:"8px"}}>
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
        </Box>
        <Stack spacing={3} width={"220px"}>
            <Typography variant={"h2"}>{translate("SIGNUP_TITLE")}</Typography>
            {/*<Formalite<ValidationType>*/}
            {/*    formString={signupForm}*/}
            {/*    onSubmit={(values)=>{*/}
            {/*        console.log("aaa");*/}
            {/*        */}
            {/*        setLoading(true);*/}
            {/*        serverAxios.createNewUser({*/}
            {/*            name:values.firstName,*/}
            {/*            lastName:values.lastName,*/}
            {/*            bannerUrl:"",*/}
            {/*            imageUrl:"",*/}
            {/*            isBanned:false,*/}
            {/*            rate:0,*/}
            {/*            walletAmount:0,*/}
            {/*            phone:number || ""*/}

            {/*        }).then(res=>{*/}
            {/*            window.localStorage.setItem("token","token123")*/}
            {/*            window.localStorage.setItem("clientId",res[0].id)*/}

            {/*            setTimeout(()=>{*/}
            {/*                navigate("/");*/}
            {/*            })*/}
            {/*        })*/}
            {/*    }}*/}
            {/*    validationSchema={validation as any}*/}
            {/*    initialValues={{*/}
            {/*        firstName:"",*/}
            {/*        lastName:"",*/}

            {/*    }}*/}
            {/*    formRef={userRef}*/}
            {/*/>*/}

            <LoadingButton
                loading={loading}
                variant={"contained"}
                endIcon={<ArrowForwardIcon/>}
                onClick={()=>{
                    userRef.current?.callSubmit();
                    userRef.current?.formik.validateForm().then(res=> console.log(res))
                }}>
                {translate("SIGNUP_TITLE")}
            </LoadingButton>
        </Stack>
    </Box>
}
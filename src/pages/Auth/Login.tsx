import {Box, Button, IconButton, Menu, MenuItem, Stack, TextField, Typography} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useLocales from "../../hooks/useLocales";
import LanguageIcon from "@mui/icons-material/Language";
import {useState} from "react";
import useSettings from "../../hooks/useSettings";
import serverAxios from "../../axios/serverAxios";
import {useNavigate} from "react-router-dom";
import {Formalite} from "@novin-dev/formalite";
import {usePhoneFrom, usePhoneRef, validation, ValidationType} from "../../hooks/forms/usePhoneForm";
import {useSignupForm, useSignupRef, validation as v1, ValidationType as v1t} from "../../hooks/forms/useSignupForm";
import {LoadingButton} from "@mui/lab";
import {fixToken} from "../../utils/utils";
import Countdown from "react-countdown";

export const Login = ()=>{
    const {translate}  = useLocales();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const {onChangeLang} = useLocales();
    const {onChangeDirectionByLang} = useSettings();

    const [currentPage,setCurrentPage] = useState<"login" | "verify" | "signup">("login");

    const [phoneNumber,setPhoneNumber] = useState("");
    const [loading,setLoading] = useState(false);
    const [countDown,setCountDown] = useState(0)

    const navigate = useNavigate();

    const phoneFrom = usePhoneFrom();
    const phoneRef = usePhoneRef();
    const signupForm = useSignupForm();
    const signupRef = useSignupRef();


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
        {
            currentPage === "login" && <Stack spacing={3}>
                <Typography variant={"h2"}>{translate("LOGIN_TITLE")}</Typography>
                <Stack spacing={1}>
                    <Formalite<ValidationType>
                        formString={phoneFrom}
                        onSubmit={(values)=>{
                            setPhoneNumber(values.phone || "")
                            serverAxios.sendMobileLogin(values.phone).then(res =>{
                                setCountDown(res.result.time)
                                if(res.result.isExist){
                                    setCurrentPage("verify")
                                }else {
                                    setCurrentPage("signup")
                                }
                            })
                        }}
                        validationSchema={validation as any}
                        initialValues={{
                            phone:""
                        }}
                        formRef={phoneRef}
                    />
                </Stack>

                <Button variant={"contained"} endIcon={<ArrowForwardIcon/>} onClick={()=>{
                    phoneRef.current?.callSubmit()
                }}>
                    {translate("LOGIN_CONTINUE")}
                </Button>
            </Stack>
        }

        {[ "signup" ,"verify"].includes(currentPage) && <Box sx={{p:4}}><Stack spacing={3}>
            <Typography variant={"h2"}>
                {translate("VERIFY_TITLE")}
                <Typography variant={"body2"}>
                    <Countdown date={Date.now() + countDown * 60 *1000} renderer={(props)=><>{`${props.minutes}:${props.seconds}`}</>} />
                </Typography>
            </Typography>
                <Stack spacing={1}>
                    <Formalite<v1t>
                        formString={signupForm}
                        onSubmit={(values)=>{
                            setLoading(true);
                            serverAxios.sendVerifyLogin({phone:phoneNumber,code:values.verify,fullName:`${values.firstName} ${values.lastName}`}).then(res =>{
                                fixToken(`bearer ${res.result.access_token}`)
                                window.localStorage.setItem("token",res.result.access_token);
                                window.localStorage.setItem("fullName",res.result.client.fullName);
                                window.localStorage.setItem("phone",res.result.client.phone);
                                window.localStorage.setItem("rate",String(res.result.client.rate));
                                window.localStorage.setItem("clientId",String(res.result.client.id));
                                setTimeout(()=>{
                                     navigate("/");
                                 })
                            })
                        }}
                        validationSchema={v1 as any}
                        initialValues={{
                            firstName:"",
                            lastName:"",
                            verify:""
                        }}
                        formRef={signupRef}
                        isUpdateMode={currentPage === "signup"}
                    />
                </Stack>

                <LoadingButton loading={loading} variant={"contained"} endIcon={<ArrowForwardIcon/>}
                 onClick={()=>{
                     signupRef.current?.callSubmit();
                 }}
                >
                    {translate("VERIFY_LOGIN")}
                </LoadingButton>
            </Stack> </Box>
        }


    </Box>
}
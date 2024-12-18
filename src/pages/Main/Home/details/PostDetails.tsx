import {Box, Button, CardContent, Divider, Paper, Stack, Typography,Backdrop,CircularProgress} from "@mui/material";
import moment from "moment-jalaali";
import {RequestForPostDialog} from "../components/dialogs/RequestForPostDialog";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import serverAxios, {BASE_URL} from "../../../../axios/serverAxios";
import {PostType} from "../../../../@types/other";
import {useSearchParams} from "react-router-dom";
import {ReturnObjectDialog} from "../../Profile/dialogs/ReturnObjectDialog";
import useLocales from "../../../../hooks/useLocales";


export const PostDetails = () => {
    const {translate} = useLocales();
    const [data,setData] = useState<PostType | null>(null)
    const [confirmDialog,setConfirmDialog] = useState<{ show: boolean,postId:string,clientId:string }>({
        show:false,
        postId:"",
        clientId:""
    });
    const [returnDialog,setReturnDialog] = useState<{ show: boolean,requestId:string }>({
        show:false,
        requestId:"",
    });
    const {id} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const requestId = searchParams.get('requestId')
    const status = searchParams.get('status')
    const [loading,setLoading] =useState(true)



    useEffect(()=>{
        serverAxios.getSinglePost(id || "").then(res => {
            setData(res.result)
            setLoading(false)
        })
    },[])

    return <Box pb={7}>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <Paper sx={{height:"250px",overflow:"hidden",borderRadius:"4px"}}>
            <img src={`${BASE_URL}/${data?.file.url}`} alt={"aa"} style={{height:"100%",objectFit:"contain",width:"100%"}}/>
        </Paper>
        <CardContent>
            <Stack spacing={1}>
                <Typography variant={"h4"}>
                    {data?.title}
                </Typography>
                <Typography variant={"caption"} color={"text.secondary"}>
                    {moment(data?.createDate).locale("fa").format("jYYYY/jM/jD HH:mm")}
                </Typography>
                <Typography variant={"body1"}>
                    {data?.desc}
                </Typography>
                <Divider/>
                <Box display={"flex"} justifyContent={"space-evenly"} style={{height:"60px"}} alignItems={"center"}>
                    <Stack alignItems={"center"}>
                        <Typography variant={"body2"}>{translate("CATEGORY")}</Typography>
                        <Typography variant={"subtitle1"}>{data?.category.name}</Typography>
                    </Stack>
                    <Divider orientation={"vertical"} />
                    <Stack alignItems={"center"}>
                        <Typography variant={"body2"}>{translate("NAME")}</Typography>
                        <Typography variant={"subtitle1"}>{data?.client.fullName}</Typography>
                    </Stack>
                    <Divider orientation={"vertical"}/>
                    <Stack alignItems={"center"}>
                        <Typography variant={"body2"}>{translate("TIME")}</Typography>
                        <Typography variant={"subtitle1"}>{data?.maxTime.time} {data?.maxTime.unit}</Typography>
                    </Stack>
                </Box>
                <Divider/>
                <Stack spacing={1} divider={<Divider/>}>
                    <Box display={"flex"} justifyContent={"space-between"} >
                        <Typography color={"text.secondary"} variant={"body1"}>{translate("BAIL_AMOUNT")}</Typography>
                        <Typography>{data?.bailAmount}</Typography>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"} >
                        <Typography color={"text.secondary"} variant={"body1"}>{translate("COUNT")}</Typography>
                        <Typography>{data?.count || 1}</Typography>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"} >
                        <Typography color={"text.secondary"} variant={"body1"}>{translate("STATUS")}</Typography>
                        <Typography>{data?.status}</Typography>
                    </Box>
                    <Stack direction={"row"} spacing={1}>

                        {
                            !!requestId
                                ?<Button disabled={status==="Pending"} variant={"contained"} fullWidth onClick={()=>{
                                    setReturnDialog({show:true,requestId})
                                }}>return Object</Button>
                                :<Button variant={"contained"} fullWidth
                                             disabled={window.localStorage.getItem("clientId") === data?.clientId}
                                         onClick={()=>{
                                    setConfirmDialog({ show: true, postId:id || "", clientId:data?.clientId || ""})
                                }}>
                                    Request
                                </Button>
                        }

                    </Stack>
                </Stack>
            </Stack>
        </CardContent>
        <RequestForPostDialog dialog={confirmDialog} setDialog={setConfirmDialog}/>
        <ReturnObjectDialog setDialog={setReturnDialog} dialog={returnDialog}/>


    </Box>
}
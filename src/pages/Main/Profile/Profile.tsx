import {Box, Button, Card, CardActions, CardContent, Chip, Stack, Tab, Tabs, Typography} from "@mui/material";
import {TopProfile} from "./components/TopProfile";
import {ProfileItems} from "./components/ProfileItems";
import {SyntheticEvent, useEffect, useState} from "react";
import serverAxios, {GeneralType} from "../../../axios/serverAxios";
import {Post} from "../../../@types/dataTypes/post";
import {CustomTabPanel} from "./components/CustomTabPanel";
import useLocales from "../../../hooks/useLocales";
import {ReturnObjectDialog} from "./dialogs/ReturnObjectDialog";
import {MyRequestDialog} from "./dialogs/MyRequestDialog";
import {createSearchParams, useNavigate} from "react-router-dom";
import {ABSOLUTE_ROUTES, createPath} from "../../../routes/paths";
import {PostType, RequestType} from "../../../@types/other";

export const Profile = () => {
    const [myProfilePosts,setMyProfilePosts] = useState<GeneralType<PostType[]>>({result:[]} as any);
    const [myBorrowed,setMyBorrowed] = useState<RequestType["requests"]>([]);
    const {translate} = useLocales();
    const navigate = useNavigate();
    useEffect(()=>{
        const clientId = window.localStorage.getItem("clientId") || "";
        serverAxios.getMyPost().then(res=>{
            setMyProfilePosts(res)
        })
        serverAxios.getListMyRequest().then(res => {
            setMyBorrowed(res.result);
        })
    },[])

    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };



    const [returnDialog,setReturnDialog] = useState<{ show: boolean }>({
        show:false,
    })
    const [acceptDialog,setAcceptDialog] = useState<{ show: boolean }>({
        show:false,
    })

    return (
        <CardContent>
            <Stack spacing={1} pb={7}>
                <TopProfile/>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={translate("PROFILE_TAB_YOUR_OBJECTS")} />
                        <Tab label={translate("PROFILE_TAB_BORROWED_OBJECTS")} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Stack spacing={1}>
                        {
                            myProfilePosts.result.map((res) =>
                                <ProfileItems
                                    key={res._id}
                                    item={res}
                                    onClick={()=>{
                                        navigate(createPath({
                                            path:ABSOLUTE_ROUTES.REQUESTS_POST,
                                            params:{id:res._id || ""}
                                        }))
                                       // setAcceptDialog({show:true})
                                    }}/>
                            )
                        }
                    </Stack>

                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    {
                        myBorrowed.map(item => (
                            <Card key={item.id} onClick={()=>{
                                navigate({
                                    pathname: createPath({
                                        path:ABSOLUTE_ROUTES.DETAILS_POST,
                                        params:{
                                            id: item.post?.id || ""
                                        },
                                    }),
                                    search:createSearchParams({
                                        requestId: item.id,
                                        status:item.status
                                    }).toString()
                                })
                            }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.post?.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {item.desc}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {
                                    item.status === "Pending" &&
                                    <Chip label="Pending for accept" color="info" />
                                }
                                {
                                    item.status === "Accept" &&
                                    <Chip label="Accepted & Pending for pickup" color="primary" />
                                }
                                {
                                    item.status === "Reject" &&
                                    <Chip label="Rejected!" color="error" />
                                }
                                {
                                    item.status === "Refund" &&
                                    <Chip label="Refund and returned" color="success" />
                                }

                            </CardActions>
                        </Card>))
                    }
                    {/*{*/}
                    {/*    myBorrowed.map(res => <ProfileItems key={res.id} item={res.post} onClick={()=>{*/}
                    {/*        setReturnDialog({show:true})*/}
                    {/*    }}/>)*/}
                    {/*}*/}
                </CustomTabPanel>
            </Stack>
            {/*<ReturnObjectDialog setDialog={setReturnDialog} dialog={returnDialog}/>*/}
            <MyRequestDialog setDialog={setAcceptDialog} dialog={acceptDialog}/>
        </CardContent>
    )
}
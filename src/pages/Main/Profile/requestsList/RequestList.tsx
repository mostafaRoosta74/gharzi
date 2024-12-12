import {Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import serverAxios from "../../../../axios/serverAxios";
import {useParams} from "react-router";
import {RequestType} from "../../../../@types/other";
import useLocales from "../../../../hooks/useLocales";


export const RequestList = () => {
    const [data,setData] = useState<RequestType["requests"]>([])
    const [title,setTitle] = useState<string>("")
    const {id} = useParams();
    const {translate} = useLocales();


    const fetchData = () => {
        serverAxios.getPostRequest(id||"").then(res =>{
            setData(res.result.requests)
            setTitle(res.result.post.title)
            //console.log(res.result.requests)
        })
    }

    useEffect(()=>{
        fetchData();
    },[])

    return (
        <CardContent>
            <Stack spacing={2}>
                {
                    data.map(item =>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {item.desc}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {
                                    item.status === "Pending" && <>
                                        <Button size="small" color={"success"} onClick={()=>{
                                            serverAxios.postChangeRequestStatus(item.id,"Accept").then(res => {
                                                fetchData()
                                            })
                                        }}>{translate("ACCEPT")}</Button>
                                        <Button size="small" color={"error"} onClick={()=>{
                                            serverAxios.postChangeRequestStatus(item.id,"Reject").then(res => {
                                                fetchData()
                                            })
                                        }}>{translate("REJECT")}</Button>
                                    </>
                                }
                                {
                                    item.status === "Accept" &&
                                    <Chip label={translate("ACCEPTED_AND_PENDING_FOR_REQUEST")} color="primary" />
                                }
                                {
                                    item.status === "Reject" &&
                                    <Chip label={translate("REJECTED")} color="error" />
                                }
                                {
                                    item.status === "Refund" &&
                                    <Chip label={translate("REFUND")} color="success" />
                                }

                            </CardActions>
                        </Card>
                    )
                }
        </Stack>
    </CardContent>)
}
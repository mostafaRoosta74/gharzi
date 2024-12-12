import {Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import serverAxios from "../../../../axios/serverAxios";
import {useParams} from "react-router";
import {RequestType} from "../../../../@types/other";

export const RequestList = () => {
    const [data,setData] = useState<RequestType["requests"]>([])
    const [title,setTitle] = useState<string>("")
    const {id} = useParams();

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
                                        }}>Accept</Button>
                                        <Button size="small" color={"error"} onClick={()=>{
                                            serverAxios.postChangeRequestStatus(item.id,"Reject").then(res => {
                                                fetchData()
                                            })
                                        }}>Reject</Button>
                                    </>
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
                        </Card>
                    )
                }
        </Stack>
    </CardContent>)
}
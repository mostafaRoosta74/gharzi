import {ArrElement, stateType} from "../../../../contexts/AppProvider";
import {Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Stack, Typography} from "@mui/material";
import {PostType} from "../../../../@types/other";
import {BASE_URL} from "../../../../axios/serverAxios";

export const MainListItem = (props:{item:PostType,onClick:()=>void}) => {
    return (
    <Card onClick={props.onClick}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image={BASE_URL +"/" + props.item?.file?.url}
                alt="green iguana"
                style={{objectFit:"contain"}}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.item.desc}
                </Typography>
                <Typography variant={"subtitle1"} color={"primary"}>{props.item.bailAmount} Rial</Typography>
                <Stack spacing={1} direction={"row"}>
                    {/*<Box sx={theme=>({*/}
                    {/*    background:theme.palette.background.neutral,*/}
                    {/*    borderRadius:"8px",*/}
                    {/*    padding:0.5,*/}
                    {/*})}>*/}
                    {/*    <Typography>{"props.item.city?.name"}</Typography>*/}
                    {/*</Box>*/}
                    <Box sx={theme=>({
                        background:theme.palette.background.neutral,
                        borderRadius:"8px",
                        padding:0.5,
                    })}>
                        <Typography>{props.item.category?.name}</Typography>
                    </Box>
                </Stack>
            </CardContent>
        </CardActionArea>
    </Card>)
}
import {Box, ButtonBase, Card, CardContent, CardMedia, IconButton, Typography} from "@mui/material"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {Post} from "../../../../@types/dataTypes/post";
import useLocales from "../../../../hooks/useLocales";
import {PostType} from "../../../../@types/other";
import {BASE_URL} from "../../../../axios/serverAxios";

export const ProfileItems = (props:{item: PostType,onClick:()=>void}) => {
    const {translate} = useLocales();
    const getColorStatus =  (status:string) =>{
     switch (status) {
         case "pending":
             return "warning.main"
         case "Verified":
             return "success.main"
         case "barrow":
             return "primary.main"
     }
    }
    const getIconStatus = (status:string) => {
        switch (status) {
            case "pending":
                return <WarningAmberIcon sx={{ fontSize: 16, mr: 0.5, mt: '1px' }} />
            case "Verified":
                return <CheckCircleOutlineIcon sx={{ fontSize: 16, mr: 0.5, mt: '1px' }} />
            case "barrow":
                return <InfoOutlinedIcon sx={{ fontSize: 16, mr: 0.5, mt: '1px' }} />
        }
    }
    return (
        <Card
            variant="outlined"
            sx={{
                p: 1,
                boxShadow: '0 1px 3px rgba(0, 127, 255, 0.1)',
                display: 'flex',
                flexDirection: {
                    xs: 'column', // mobile
                    sm: 'row', // tablet and up
                },cursor:"pointer"
            }}
            onClick={props.onClick}
        >
            <CardMedia
                component="img"
                width="100"
                height="100"
                alt="123 Main St, Phoenix, AZ cover"
                src={BASE_URL +"/" + props.item.file.url}
                sx={{
                    borderRadius: 0.5,
                    width: { xs: '100%', sm: 100 },
                    mr: { sm: 1.5 },
                    mb: { xs: 1.5, sm: 0 },
                }}
            />
            <Box sx={{ alignSelf: 'self-start', ml: 2 }}>
                <Typography variant="body2" color="text.secondary" fontWeight="medium">
                    {props.item.title}
                </Typography>
                <Typography fontWeight="bold" noWrap>
                    {props.item.bailAmount} {translate("FILTER_RIAL")}
                </Typography>
                <Box
                    sx={(theme) => ({
                        mt: 1,
                        py: 0.4,
                        pl: 0.5,
                        pr: 1,
                        typography: 'caption',
                        borderRadius: 10,
                        display: 'flex',
                        bgcolor: 'primary.50',
                        border: '1px solid',
                        borderColor: getColorStatus(props.item.status),
                        color: getColorStatus(props.item.status),
                        width:"fit-content"
                    })}
                >
                    {getIconStatus(props.item.status)}
                    {translate("STATUS_"+props.item.status)}
                </Box>
            </Box>
        </Card>
    )
}
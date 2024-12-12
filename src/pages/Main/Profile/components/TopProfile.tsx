import {Avatar, Box, Card, Divider, IconButton, Stack, styled, Typography} from "@mui/material";
import cssStyles from "../../../../utils/cssStyles";
import Image from '../../../../component/Image';
import SvgIconStyle from "../../../../component/SvgIconStyle";
import {useEffect, useState} from "react";
import serverAxios from "../../../../axios/serverAxios";
import {Client} from "../../../../@types/dataTypes/client";
import {Rating} from "@mui/lab";
import EditIcon from '@mui/icons-material/Edit';
import useLocales from "../../../../hooks/useLocales";
import {useNavigate} from "react-router-dom";
import {ABSOLUTE_ROUTES} from "../../../../routes/paths";


const OverlayStyle = styled('div')(({ theme }) => ({
    ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
    top: 0,
    zIndex: 8,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
}));

export const TopProfile = () => {

    const {translate} = useLocales();
    const navigate = useNavigate();



    return (
        <Card sx={{ textAlign: 'center' }}>
            <Box sx={{ position: 'relative' }}>
                <Box sx={{position:"absolute",left:0,top:0,zIndex:800}}>
                    <IconButton onClick={()=>{
                        navigate(ABSOLUTE_ROUTES.EDIT_PROFILE)
                    }}>
                        <EditIcon/>
                    </IconButton>
                </Box>
                <SvgIconStyle
                    src={"aa"}
                    sx={{
                        width: 144,
                        height: 62,
                        zIndex: 10,
                        left: 0,
                        right: 0,
                        bottom: -26,
                        mx: 'auto',
                        position: 'absolute',
                        color: 'background.paper',
                    }}
                />
                <Avatar
                    alt={"name"}
                    src={"null"}
                    sx={{
                        width: 64,
                        height: 64,
                        zIndex: 11,
                        left: 0,
                        right: 0,
                        bottom: -32,
                        mx: 'auto',
                        position: 'absolute',
                    }}
                />
                <OverlayStyle />
                <Image src={"null"} alt={"cover"} ratio="21/9" />
            </Box>

            <Typography variant="subtitle1" sx={{ mt: 6 }}>
                {window.localStorage.getItem("fullName")}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {window.localStorage.getItem("phone")}
            </Typography>

            {/*<Stack alignItems="center">*/}
            {/*    <SocialsButton initialColor sx={{ my: 2.5 }} />*/}
            {/*</Stack>*/}

            <Divider sx={{ borderStyle: 'dashed', mt:1 }} />

            <Box sx={{ py: 3, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <div>
                    <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                        {translate("PROFILE_WALLET_AMOUNT")}
                    </Typography>
                    <Typography variant="subtitle1">0 Rial</Typography>
                </div>

                <div>
                    <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                        {translate("PROFILE_WALLET_RATE")}
                    </Typography>
                    <Typography variant="subtitle1">
                        <Rating name="half-rating" defaultValue={parseInt(window.localStorage.getItem("rate") || "") || 0} precision={0.5} readOnly />
                    </Typography>
                </div>

            </Box>
        </Card>
    )
}
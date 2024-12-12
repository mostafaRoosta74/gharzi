import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField
} from "@mui/material";
import useLocales from "../../../../hooks/useLocales";
import serverAxios from "../../../../axios/serverAxios";
import {useNavigate} from "react-router-dom";
import {ABSOLUTE_ROUTES} from "../../../../routes/paths";

type ReturnObjectDialogProps = {
    dialog: { show: boolean,requestId:string }
    setDialog: (data: { show: boolean,requestId:string }) => void
}

export const ReturnObjectDialog = (props:ReturnObjectDialogProps) => {
    const {translate} = useLocales();
    const navigate = useNavigate();
    const handleClose = () => {
        props.setDialog({show:false,requestId:""});
    };

    return  <Dialog
        open={props.dialog.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {translate("RETURN_DIALOG_TITLE")}
        </DialogTitle>
        <DialogContent>
            <Stack spacing={2}>
                <DialogContentText id="alert-dialog-description">
                    {translate("RETURN_DIALOG_DESC")}
                </DialogContentText>
                <TextField id="outlined-basic" label="Code" variant="outlined"  fullWidth
                           type={"number"}
                />
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>{translate("RETURN_DIALOG_DISAGREE")}</Button>
            <Button onClick={()=>{
                serverAxios.postChangeRequestStatus(props.dialog.requestId,"Refund").then(res => {
                    navigate(ABSOLUTE_ROUTES.PROFILE)
                })
                handleClose();
            }} autoFocus>
                {translate("RETURN_DIALOG_VERIFY")}
            </Button>
        </DialogActions>
    </Dialog>
}
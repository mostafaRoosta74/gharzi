import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import useLocales from "../../../../../hooks/useLocales";
import {LoadingButton} from "@mui/lab";
import {useState} from "react";
import serverAxios from "../../../../../axios/serverAxios";
import {useNavigate} from "react-router-dom";
import {ABSOLUTE_ROUTES} from "../../../../../routes/paths";

type RequestForPostDialogProps = {
    dialog: { show: boolean, postId: string,clientId:string }
    setDialog: (data: { show: boolean, postId: string,clientId:string }) => void
}

export const RequestForPostDialog = (props:RequestForPostDialogProps) =>{
    const { translate }= useLocales();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [desc,setDesc] = useState("")
    const handleClose = () => {
        props.setDialog({show:false,postId:"",clientId:""})
    }
    return <Dialog
        open={props.dialog.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {translate("CONFIRM_DIALOG_TITLE")}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {translate("CONFIRM_DIALOG_DESC")}
            </DialogContentText>
            <TextField
                sx={{mt:1}}
               id="outlined-basic"
                label={translate("ADD_FORM_DESC")}
                variant="outlined"
                value={desc}
                onChange={e=>{setDesc(e.target.value)}}
                fullWidth
            />

        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>{translate("CONFIRM_DIALOG_NO")}</Button>
            <LoadingButton loading={loading} onClick={()=>{
                setLoading(true);
                serverAxios.postNewRequest(props.dialog.postId,desc).then(res=>{
                    setLoading(false)
                    handleClose();
                    navigate(ABSOLUTE_ROUTES.PROFILE);
                })

            }} autoFocus>
                {translate("CONFIRM_DIALOG_YES")}
            </LoadingButton>
        </DialogActions>
    </Dialog>
}
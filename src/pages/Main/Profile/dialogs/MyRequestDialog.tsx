import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText,
    Stack,
    TextField
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import useLocales from "../../../../hooks/useLocales";
import {blue} from "@mui/material/colors";

type MyRequestDialogProps = {
    dialog: { show: boolean }
    setDialog: (data: { show: boolean}) => void
}

export const MyRequestDialog = (props:MyRequestDialogProps) => {
    const {translate} = useLocales();
    const handleClose = () => {
        props.setDialog({show:false});
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
            <List sx={{ pt: 0 }}>
                <ListItem disableGutters >
                    <ListItemButton onClick={() => {
                        props.setDialog({show:false})
                    }}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={"مصطفی روستا"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disableGutters >
                    <ListItemButton onClick={() => {
                        props.setDialog({show:false})

                    }}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={"علی محلاتی"} />
                    </ListItemButton>
                </ListItem>
        </List>
        </DialogContent>

    </Dialog>
}
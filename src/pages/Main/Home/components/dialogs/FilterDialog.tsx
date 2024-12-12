import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, InputLabel, MenuItem, Select,
    Stack, TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {City} from "../../../../../@types/dataTypes/city";
import serverAxios, {GeneralType} from "../../../../../axios/serverAxios";
import {Category} from "../../../../../@types/dataTypes/category";
import useLocales from "../../../../../hooks/useLocales";


type FilterDialogProps = {
    dialog: { show: boolean, cityIds: string[], category: string }
    setDialog: (data: { show: boolean, cityIds: string[], category: string }) => void
}


export const FilterDialog = (props:FilterDialogProps) => {
    const [allCities,setAllCities] = useState<City[]>([]);
    const [allCategories,setAllCategories] = useState<GeneralType<{name:string,id:string}[]>>({result:[]} as any);

    const [selectCities,setSelectCities] = useState<string[]>([]);
    const [selectCategory,setSelectCategory] = useState<string>(props.dialog.category);

    const {translate} = useLocales()

    useEffect(()=>{
        // serverAxios.getCities().then(res =>{
        //     setAllCities(res);
        // })
        serverAxios.getAllCategories().then(res => {
            setAllCategories(res)
        })
    },[])

    return(
        <Dialog
            open={props.dialog.show}
            onClose={event => {
                props.setDialog({...props.dialog,show:false})
            }}
            fullWidth
            maxWidth={"sm"}
        >
            <DialogTitle id="alert-dialog-title">
                {translate("FILTER_DIALOG_TITLE")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Stack spacing={2} mt={1}>
                        {/*<Autocomplete*/}
                        {/*    multiple*/}
                        {/*    id="tags-outlined"*/}
                        {/*    options={allCities}*/}
                        {/*    getOptionLabel={(option) => option.name}*/}
                        {/*    defaultValue={allCities.filter(item => props.dialog.cityIds.includes(item.id) )}*/}
                        {/*    filterSelectedOptions*/}
                        {/*    onChange={(event, value, reason, details) => {*/}
                        {/*        setSelectCities(value.map(item => item.id))*/}
                        {/*    }}*/}
                        {/*    renderInput={(params) => (*/}
                        {/*        <TextField*/}
                        {/*            {...params}*/}
                        {/*            label={translate("FILTER_DIALOG_CITIES")}*/}
                        {/*        />*/}
                        {/*    )}*/}
                        {/*/>*/}
                        <FormControl fullWidth>
                            <InputLabel >{translate("FILTER_DIALOG_CATEGORIES")}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectCategory}
                                label={translate("FILTER_DIALOG_CATEGORIES")}
                                onChange={event => {
                                    const value = event.target.value;
                                    setSelectCategory(value)
                                }}
                            >
                                {allCategories.result.map(item => <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>)}

                            </Select>
                        </FormControl>
                        {/*<Autocomplete*/}
                        {/*    multiple={false}*/}
                        {/*    id="tags-outlined"*/}
                        {/*    options={allCategories.result || []}*/}
                        {/*    getOptionLabel={(option) => option.name}*/}
                        {/*    defaultValue={props.dialog.category}*/}
                        {/*    filterSelectedOptions*/}
                        {/*    onChange={(event, value, reason, details) => {*/}
                        {/*        setSelectCategories(value.map(item => item.id))*/}
                        {/*    }}*/}
                        {/*    renderInput={(params) => (*/}
                        {/*        <TextField*/}
                        {/*            {...params}*/}
                        {/*            label={translate("FILTER_DIALOG_CATEGORIES")}*/}
                        {/*        />*/}
                        {/*    )}*/}
                        {/*/>*/}
                    </Stack>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={event => {
                    props.setDialog({...props.dialog,show:false})
                }} autoFocus>
                    {translate("FILTER_DIALOG_CANCEL")}
                </Button>

                <Button onClick={event => {
                    props.setDialog({...props.dialog,show:false,category:selectCategory,cityIds:selectCities})
                }}>{translate("FILTER_DIALOG_ACCEPT")}
                </Button>

            </DialogActions>
        </Dialog>
    )
}
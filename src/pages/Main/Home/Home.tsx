import {
    Box,
    CardContent,
    FormControl, Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, Skeleton,
    Stack,
} from "@mui/material";
import {MainListItem} from "./components/MainListItem";
import {useEffect, useState} from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import serverAxios, {GeneralType} from "../../../axios/serverAxios";
import {stateType} from "../../../contexts/AppProvider";
import {FilterDialog} from "./components/dialogs/FilterDialog";
import {City} from "../../../@types/dataTypes/city";
import {Category} from "../../../@types/dataTypes/category";
import useLocales from "../../../hooks/useLocales";
import {RequestForPostDialog} from "./components/dialogs/RequestForPostDialog";
import {UserTour} from "./components/TourComponet";
import {useNavigate} from "react-router-dom";
import MapIcon from '@mui/icons-material/Map';
import {ABSOLUTE_ROUTES, createPath} from "../../../routes/paths";
import {PostType} from "../../../@types/other";


export const Home = () => {
    const {translate} = useLocales()
    const navigate = useNavigate();
    const [search,setSearch] = useState("");
    const [allCities,setAllCities] = useState<City[]>([]);
    const [allCategories,setAllCategories] = useState<GeneralType<any>>({result:[]} as any);
    const [data,setData] = useState<GeneralType<PostType[]>>({result:[]} as any)
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        // serverAxios.getCities().then(res =>{
        //     setAllCities(res);
        // })
        serverAxios.getAllCategories().then(res => {
            setAllCategories(res)
        })
    },[])

    const [filterDialog,setFilterDialog] = useState<{ show: boolean, cityIds: string[], category: string }>({
        show:false,
        cityIds:[],
        category:"",
    })


    useEffect(()=>{
        setLoading(true)
        serverAxios.getPosts(filterDialog.category,search).then(res=>{
            setLoading(false);
            setData(res)
        })
    },[search,filterDialog.cityIds,filterDialog.category])
    return (
        <CardContent>
        <Stack spacing={2} pb={7}>
            <Stack spacing={1}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">{translate("FILTER_SEARCH")}</InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-password"
                        onChange={event => {
                            setSearch(event.target.value);
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <Stack spacing={0.5} direction={"row"}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={()=>{
                                            setFilterDialog(pre=>({...pre,show: true}))
                                        }}
                                        edge="end"
                                    >
                                        <FilterListIcon/>
                                    </IconButton>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={()=>{
                                            navigate(ABSOLUTE_ROUTES.MAP)
                                        }}
                                        edge="end"
                                    >
                                        <MapIcon/>
                                    </IconButton>
                                </Stack>

                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Stack spacing={1} direction={"row"}>
                    {
                        filterDialog.category && <Box sx={theme=>({
                            background:theme.palette.background.neutral,
                            borderRadius:"8px",
                            padding:0.5,
                        })}>
                            {allCategories.result.find((inItem: any) => inItem.id === filterDialog.category)?.name}
                        </Box>
                    }
                    {
                        filterDialog.cityIds.map(item =>(
                            <Box sx={theme=>({
                                background:theme.palette.background.neutral,
                                borderRadius:"8px",
                                padding:0.5,
                            })}>
                                {allCities.find(inItem => inItem.id === item)?.name}
                            </Box>
                        ))
                    }

                </Stack>
            </Stack>
            {
                loading?<>
                    <Skeleton variant={"rounded"} height={"250px"}/>
                    <Skeleton variant={"rounded"} height={"250px"}/>
                    <Skeleton variant={"rounded"} height={"250px"}/>
                </>: data.result.map((item) => (
                    <MainListItem key={item._id} item={item} onClick={()=>{
                        navigate(createPath({path:ABSOLUTE_ROUTES.DETAILS_POST,params:{id:item._id}}))
                        //
                    }} />
                ))
            }

            <FilterDialog dialog={filterDialog} setDialog={(data)=>{
                setFilterDialog(data)
            }}/>
        </Stack>
        </CardContent>
    )
}
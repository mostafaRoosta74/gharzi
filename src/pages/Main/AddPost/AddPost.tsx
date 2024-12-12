import {Formalite} from "@novin-dev/formalite";
import {useAddPostForm, useAddPostRef, validation, ValidationType} from "../../../hooks/forms/useAddPostForm";
import {Button, CardContent, Stack} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import useLocales from "../../../hooks/useLocales";
import {useState} from "react";
import serverAxios from "../../../axios/serverAxios";
import {useNavigate} from "react-router-dom";
import {ABSOLUTE_ROUTES} from "../../../routes/paths";

export const AddPost = () => {
    const form = useAddPostForm();
    const {translate} = useLocales()
    const postRef = useAddPostRef()
    const {currentLang} = useLocales();
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();

    return <CardContent sx={{mb:8}}>
        <Stack spacing={2}>
            <Formalite<ValidationType>
                lang={currentLang.value}
                formString={form}
                onSubmit={(values)=>{
                    setLoading(true)
                    serverAxios.addPosts({
                        count:0,
                        desc:values.desc || "",
                        bailAmount:Number(values.amount) || 0,
                        title:values.title,
                        maxTime:{
                            time:Number(values.returnAmount) || 0,
                            unit:values.returnType
                        },
                        forceToHaveBill:false,
                        categoryId:values?.tag,
                        //imageUrl:"/img/2222.png",
                        //status:"pending",
                        //cityId:"1"
                    },values.image?.[0]).then(res=>{
                        setLoading(false);
                        navigate(ABSOLUTE_ROUTES.PROFILE)
                    })
                }}
                validationSchema={validation as any}
                initialValues={{
                    tag:"",
                    image:[],
                    title:"",
                    amount:"",
                    desc:"",
                    returnAmount:"",
                    returnType:""
                }}
                formRef={postRef}
            />
            <LoadingButton
                loading={loading}
                variant={"contained"}
                onClick={()=>{postRef.current?.callSubmit()}}>
                {translate("ADD_FORM_SUBMIT")}
            </LoadingButton>
        </Stack>

    </CardContent>
}
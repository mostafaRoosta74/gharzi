import {Formalite} from "@novin-dev/formalite";
import {useEditProfileRef, useEditProfileForm, validation, ValidationType} from "../../../../hooks/forms/useEditProfile";
import {useState} from "react";
import {Button, CardContent, Stack} from "@mui/material";

export const EditProfile = () => {

    const signupForm = useEditProfileForm();
    const userRef = useEditProfileRef()
    const [loading,setLoading] = useState(false);

    return <CardContent>
        <Stack spacing={2} mb={3}>
            <Formalite<ValidationType>
                formString={signupForm}
                onSubmit={(values)=>{

                }}
                validationSchema={validation as any}
                initialValues={{
                    firstName:"",
                    lastName:""
                }}
                formRef={userRef}
            />
            <Button variant={"contained"}>Update Profile</Button>
        </Stack>

    </CardContent>
}
import * as Yup from "yup";
import { MainType, useFormaliteRef, ViewTypes} from "@novin-dev/formalite";
import useLocales from "../useLocales";
import {useMemo} from "react";

export const validation = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    verify: Yup.string().required()
});
export type ValidationType = Yup.InferType<typeof validation>;

export const useSignupRef = () =>
    useFormaliteRef<ValidationType>();

export const useSignupForm = () => {
    const { translate,currentLang } = useLocales();

    return useMemo<MainType>(
        () => ({
            firstName: {
                type: ViewTypes.TextView,
                layoutProps: {
                    xs: 12,
                },
                renderDependency:[currentLang.value],
                inputProps: {
                    label: translate("SIGNUP_FIRST_NAME"),
                },
                showOnUpdate:true,
            },
            lastName: {
                type: ViewTypes.TextView,
                layoutProps: {
                    xs: 12,
                },
                renderDependency:[currentLang.value],
                inputProps: {
                    label: translate("SIGNUP_LAST_NAME"),
                },
                showOnUpdate:true,
            },
            verify:{
                type: ViewTypes.CardNumberView,
                layoutProps: {
                    xs: 12,
                },
                mask:"0 0 0 0 0 0",
                renderDependency:[currentLang.value],
                inputProps: {
                    style:{
                        direction:"ltr"
                    },
                    fullWidth:true,
                    label: translate("VERIFY_CODE"),
                    helperText: translate("VERIFY_CODE_HELPER")
                },
            }

        }),
        [translate,currentLang.value]
    );
}
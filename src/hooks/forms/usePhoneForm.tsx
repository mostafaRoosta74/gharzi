import * as Yup from "yup";
import {FetchingDataEnum, MainType, useFormaliteRef, ViewTypes} from "@novin-dev/formalite";
import useLocales from "../useLocales";
import {useMemo} from "react";


export const validation = Yup.object({
    phone: Yup.string().min(11).required(),
});
export type ValidationType = Yup.InferType<typeof validation>;

export const usePhoneRef = () =>
    useFormaliteRef<ValidationType>();

export const usePhoneFrom = () => {
    const { translate,currentLang } = useLocales();

    return useMemo<MainType>(
        () => ({
            phone: {
                type: ViewTypes.TextView,
                layoutProps: {
                    xs: 12,
                },
                renderDependency:[currentLang.value],
                inputProps: {
                    label: translate("LOGIN_PHONE_NUMBER"),
                    helperText: translate("LOGIN_PHONE_NUMBER_HELPER")
                },
            },

        }),
        [translate,currentLang.value]
    );
}
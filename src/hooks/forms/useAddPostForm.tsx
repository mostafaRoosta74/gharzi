import * as Yup from "yup";
import {FetchingDataEnum, MainType, useFormaliteRef, ViewTypes} from "@novin-dev/formalite";
import useLocales from "../useLocales";
import {useMemo} from "react";
import serverAxios from "../../axios/serverAxios";
import {InputAdornment} from "@mui/material";

export const validation = Yup.object({
    image: Yup.array().min(1),
    title: Yup.string().required(),
    desc: Yup.string(),
    tag: Yup.string().required(),
    amount: Yup.string().required(),
    returnAmount: Yup.string().required(),
    returnType: Yup.string().required(),
});
export type ValidationType = Yup.InferType<typeof validation>;

export const useAddPostRef = () =>
    useFormaliteRef<ValidationType>();

export const useAddPostForm = () => {
    const { translate,currentLang } = useLocales();

    return useMemo<MainType>(
        () => ({
            image: {
                type: ViewTypes.SingleDropZoneView,
                layoutProps: {
                    xs: 12,
                },
                renderDependency:[currentLang.value],
                inputProps: {
                    label: translate("ADD_FORM_IMAGE"),
                    dropZoneOptions: {
                    },
                    helperText: translate("ADD_FORM_DROPZONE_HELPER"),
                },
                onUpload: (file, progress) =>
                    new Promise<string>((resolve, reject) => {
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function () {
                            resolve(reader.result?.toString() || "")
                        };
                        reader.onerror = function (error) {
                           reject(error)
                        };
                    }),
                onDelete: (id, isFromDefault) =>
                    new Promise<void>((resolve, reject) => {
                        setTimeout(() => {
                            resolve();
                        }, 1);
                    }),
            },
            title: {
                type: ViewTypes.TextView,
                layoutProps: {
                    xs: 12,
                },
                renderDependency:[currentLang.value],
                inputProps: {
                    label: translate("ADD_FORM_TITLE"),
                },
            },
            desc: {
                type: ViewTypes.TextView,
                layoutProps: {
                    xs: 12,
                },
                renderDependency:[currentLang.value],
                inputProps: {
                    label: translate("ADD_FORM_DESC"),
                },
            },
            tag: {
                type: ViewTypes.SelectView,
                layoutProps: {
                    xs: 12,
                },
                renderDependency:[currentLang.value],
                inputProps: {
                    label: translate("ADD_FORM_TAG"),
                },
                dataFetching: {
                    type: FetchingDataEnum.AUTOMATIC,
                    options:() => new Promise((resolve, reject) => {
                        serverAxios.getAllCategories().then(res=>{
                            const data:{[key:string] : any} = {};
                            res.result.forEach(item => {
                                data[item.id]={
                                    label:item.name
                                }
                            })
                            resolve(data as any)
                        })

                    })
                },
            },

            amount: {
                type: ViewTypes.PriceView,
                layoutProps: {
                    xs: 12,
                },
                renderDependency:[currentLang.value],
                inputProps: {
                    label: translate("ADD_FORM_AMOUNT"),
                    InputProps:{
                        endAdornment:(
                            <InputAdornment position="end">
                                {translate("FILTER_RIAL")}
                            </InputAdornment>
                        )


                    }
                },
            },
            returnAmount:{
                type:ViewTypes.PriceView,
                layoutProps: {
                    xs: 6,
                },
                renderDependency:[currentLang.value],
                inputProps: {
                    label: translate("ADD_FORM_RETURN_AMOUNT"),
                },
            },
            returnType:{
                type:ViewTypes.SelectView,
                layoutProps: {
                    xs: 6,
                },
                renderDependency:[currentLang.value],
                inputProps: {
                    label: translate("ADD_FORM_RETURN_TYPE"),
                },
                dataFetching: {
                    type: FetchingDataEnum.AUTOMATIC,
                    options:() => new Promise((resolve, reject) => {
                        resolve({
                            "sec":{
                                label:translate("ADD_FORM_RETURN_TYPE_SEC")
                            }, "min":{
                                label:translate("ADD_FORM_RETURN_TYPE_MIN")
                            }, "h":{
                                label:translate("ADD_FORM_RETURN_TYPE_H")
                            }, "day":{
                                label:translate("ADD_FORM_RETURN_TYPE_DAY")
                            }, "Mo":{
                                label:translate("ADD_FORM_RETURN_TYPE_MON")
                            }
                        })

                    })
                },
            }
        }),
        [translate,currentLang.value]
    );
}
import * as Yup from "yup";
import { MainType, useFormaliteRef, ViewTypes} from "@novin-dev/formalite";
import useLocales from "../useLocales";
import {useMemo} from "react";

export const validation = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),

});
export type ValidationType = Yup.InferType<typeof validation>;

export const useEditProfileRef = () =>
    useFormaliteRef<ValidationType>();

export const useEditProfileForm = () => {
    const { translate,currentLang } = useLocales();

    return useMemo<MainType>(
        () => ({
            profileIcon:{
                type: ViewTypes.AvatarDropZoneView,
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
            firstName: {
                type: ViewTypes.TextView,
                layoutProps: {
                    xs: 12,
                },
                renderDependency:[currentLang.value],
                inputProps: {
                    label: translate("SIGNUP_FIRST_NAME"),
                },
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
            },
            code: {
                type: ViewTypes.CardNumberView,
                layoutProps: {
                    xs: 12,
                },
                mask:"0000000000",
                renderDependency:[currentLang.value],
                inputProps: {
                    label: translate("SIGNUP_CODE"),
                },
            },
            banner:{
                type: ViewTypes.SingleDropZoneView,
                layoutProps: {
                    xs: 12,
                },
                renderDependency:[currentLang.value],
                inputProps: {
                    label: translate("PROFILE_BANNER_IMAGE"),
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

        }),
        [translate,currentLang.value]
    );
}
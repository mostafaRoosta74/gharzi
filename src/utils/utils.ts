import {
  NestedRouteObject,
} from "../types/common";
import axios from "axios";
import serverAxios from "../axios/serverAxios";

const removeAdditionalSlashes = (path: string) => path.replace(/\/+/gi, "/");
export const getAbsoluteRoute = (obj: NestedRouteObject, base = "") => {
  const newobj: NestedRouteObject = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      newobj[key] = getAbsoluteRoute(
        obj[key],
        removeAdditionalSlashes(`${base}/${obj.BASE}`)
      );
    } else if (typeof obj[key] === "string") {
      let value;
      if (key === "BASE") {
        value = obj[key] === "/" ? "/" : `/${base}/${obj[key]}`;
      } else {
        value = `/${base}/${obj.BASE}/${obj[key]}`;
      }
      newobj[key] = removeAdditionalSlashes(value);
    }
  });
  return newobj;
};

export const fixToken= (token: string) => {
  serverAxios.instance.defaults.headers["Authenticate"] = token;
}
import { generatePath } from "react-router-dom";
import { getAbsoluteRoute } from "../utils/utils";
// ----------------------------------------------------------------------

const BASE_ROOT = "/";

export const ROUTES = {
  BASE: BASE_ROOT,
  HOME:"home",
  MAP:"map",
  GROUP:"group",
  FOR_SALE:"for_sale",
  NOTIFICATIONS:"notifications",
  PROFILE:"profile",
  EDIT_PROFILE: "edit_profile",
  REQUESTS_POST: "posts/:id/requests",
  ADD_POST:"add_post",
  DETAILS_POST:"posts/:id",
  AUTH:{
    LOGIN:"login",
    SIGNUP:"signup"
  },
  PAGE404:"page404"
};

type RoutesArgsType =
  | { path: typeof ROUTES.BASE; params: {} }
  | { path: typeof ROUTES.HOME };

type RoutesArgsWithParamsType = Extract<
  RoutesArgsType,
  { path: string; params: object }
>;

export const createPath = (args: RoutesArgsType) => {
  // Save some CPU power for routes without params
  if (args.hasOwnProperty("params") === false) return args.path;
  return generatePath(args.path, (args as RoutesArgsWithParamsType).params);
};

export const ABSOLUTE_ROUTES = getAbsoluteRoute(ROUTES) as typeof ROUTES;

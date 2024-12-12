import { useReducer } from "react";
import { createContainer } from "react-tracked";
import {Category} from "../@types/dataTypes/category";
import {City} from "../@types/dataTypes/city";
import {Client} from "../@types/dataTypes/client";
import {Post} from "../@types/dataTypes/post";
import {PostRequest} from "../@types/dataTypes/post-request";
import {PostRequestVerify} from "../@types/dataTypes/post-request-verify";

export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export type stateType = {
  categories:Category[],
  cities:City[],
  clients:Client[],
  posts:Post[],
  postRequests:PostRequest[],
  postRequestVerify:PostRequestVerify[],

};
//
// const initialState: stateType = {
//   categories:[{
//     name:"aa",
//     id:""
//   }]
// };
//
// type Action =
//   | { type: "SET_ALL_DATA"; allState: (data:stateType) => stateType }
//
// const reducer = (state: stateType, action: Action) => {
//   switch (action.type) {
//     case "SET_ALL_DATA":
//       const {allState} = action
//       return {
//         ...state,
//         ...allState(state),
//       };
//     default:
//       return state;
//   }
// };
//
// const useValue = () => useReducer(reducer, initialState);
//
// export const {
//   Provider,
//   useTrackedState,
//   useUpdate: useDispatch,
// } = createContainer(useValue);

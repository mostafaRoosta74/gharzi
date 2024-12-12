import axios from "axios";
import {stateType} from "../contexts/AppProvider";
import {Post} from "../@types/dataTypes/post";
import {City} from "../@types/dataTypes/city";
import {Category} from "../@types/dataTypes/category";
import {PostRequest} from "../@types/dataTypes/post-request";
import {Client} from "../@types/dataTypes/client";
import {PostType, RequestType} from "../@types/other";


export type GeneralType<T> = {
    code:number,
    message?:string;
    result:T,
    success:boolean
}
export const BASE_URL = "https://gharzino.ghahveland.com"
const instance = axios.create({
    baseURL: BASE_URL,
    headers:{
        "x-lang":"fa",
        Authorization:`Bearer ${window.localStorage.getItem("token")}`
    }
});

export default {
    instance,
    //login
    sendMobileLogin: (phone:string) =>
        instance.post<GeneralType<{time:number,isExist:boolean}>>("Auth/Client/Request",{phone})
            .then(res => res.data),
    sendVerifyLogin: (data:{phone:string,code:string,fullName:string}) =>
        instance.post<GeneralType<{access_token:string,client:{
                "fullName": string,
                "phone": string,
                "rate": number,
                "id": string
            }}>>("Auth/Client/Token",data)
            .then(res => res.data),

    // categories
    getAllCategories: () => instance.get<GeneralType<{name:string,id:string}[]>>("/Category/getAll").then(res => res.data),

    // posts
    getPosts: (categoryId:string,search:string)=>
        instance.post<GeneralType<PostType[]>>("/ClientPost/All",{filters:{categoryId}},{params:{q:search}})
            .then(res => res.data),
    addPosts: (data:{
        "categoryId": string,
        "title": string,
        "desc": string,
        "count": number,
        "bailAmount": number,
        "forceToHaveBill": boolean,
        "maxTime": {
            "time": number,
            "unit": string
        }
    },file:File) => {
        const formdata = new FormData()
        formdata.append("file",file);
        formdata.append("body", JSON.stringify(data))

        return instance.post("/ClientPost/Add", formdata, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then(res => res.data)
    },
    getMyPost   : ()=> instance.get<GeneralType<PostType[]>>("/ClientPost/ClientList").then(res => res.data),
    getSinglePost: (id:string) => instance.get<GeneralType<PostType>>(`/ClientPost/${id}`).then(res => res.data),

    postNewRequest: (postId:string,desc:string) =>
        instance.post("/ClientPost/Request/Create",{postId,desc})
            .then(res => res.data),

    getListMyRequest: () => instance.get<GeneralType<RequestType["requests"]>>("/ClientPost/Request/MyRequests").then(res => res.data),

    getPostRequest: (postId:string) => instance.get<GeneralType<RequestType>>(`/ClientPost/Request/${postId}`).then(res => res.data),

    postChangeRequestStatus: (requestId:string, status:string) =>
        instance.post(`/ClientPost/Request/ChangeStatus/${requestId}`, {status})
            .then(res => res.data),

    ////////////////////////////////-----------
    getPostList:(cityFilters:string[],tagFilters:string[],search:string)=>
        instance.get<Post[]>(`/posts?status=active&title_like=${search}${cityFilters.map(item => `&cityId=${item}`)}${tagFilters.map(item => `&categoryId=${item}`)}&_expand=city&_expand=category`).then(res=>
            res.data
    ),
    getMyPosts:(clientId:string) => instance.get<Post[]>(`/posts?clientId=${clientId}`).then(res=>res.data),

    getMyBorrowed: (clientId:string) => instance
        .get(`/postRequests?clientId=${clientId}&_embed=postRequestVerify&_expand=post`)
        .then(res => res.data.filter((item:any) => !!item.postRequestVerify.length)),

    getCities:() => {
        return  instance.get<City[]>("/cities").then(res =>
            res.data
        )
    },
    getCategories: () => instance.get<Category[]>("/categories").then(res=>res.data),

    createPost:(data:Partial<Post>)=> instance.post("/posts",data).then(res=>res.data),

    createPostRequest:(data:Partial<PostRequest>)=> instance.post("/postRequests",data).then(res=>res.data),

    getIsUserExist: (phoneNumber:string) => instance.get<Client[]>(`/clients?phone=${phoneNumber}`).then(res => res.data),

    createNewUser: (data:Partial<Client>) => instance.post("/clients",data).then(res=>res.data),

    getMyProfile:(clientId:string) => instance.get(`/clients/${clientId}`).then(res=>res.data)
}
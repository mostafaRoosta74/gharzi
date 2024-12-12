export type KeycloakType = "admin" | "client";


export type PostType = {
    _id:string,
    createDate:string,
    status:"Verified",
    "categoryId": string,
    "title": string,
    "desc": string,
    "count": number,
    "bailAmount": number,
    "forceToHaveBill": boolean,
    "maxTime": {
        "time": number,
        "unit": string
    },
    file:{
        url:string;
    }
    category:{
        name: string
    }
    client:{
        fullName:string,
        phone:string,
    },
    clientId:string,
}

export type RequestType = {
    post:PostType,
    requests:{
        clientId:string,
        createDate:string,
        desc:string,
        id:string,
        postId:string,
        status:string,
        post?:{
            id:string,
            title:string
        }
    }[]

}
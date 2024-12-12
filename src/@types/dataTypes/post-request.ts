import { PostRequestVerify } from "./post-request-verify";

export type PostRequest = {
    id: string;

    postId: string;

    clientId: string;

    date: Date;

    desc: string;

    // virtual props

    isVerified?: boolean;
    requestVerify?: PostRequestVerify;
}

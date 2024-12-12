export type Client = {
    id: string;

    name: string;
    lastName: string;

    phone: string;

    isBanned: boolean

    // virtual props

    // median client rates
    // 4.8
    rate?: number;

    imageUrl?:string;
    bannerUrl?:string;

    walletAmount:number
}

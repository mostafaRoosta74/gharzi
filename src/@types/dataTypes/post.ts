import { Category } from "./category";
import { City } from "./city";
import { Time } from "./temp/time";

// شامل تمامی موارد قابل قرض دادن
export type Post = {
    id: string;

    date: Date;

    clientId: string;

    title: string;
    desc: string;

    // مبلغ وثیقه
    // currency: IRR
    bailAmount: number;

    forceToHaveBill: boolean;

    // حداکثر زمان مجاز برای قرض گرفتن
    maxTime: Time;

    categoryId?: string;
    cityId?: string;

    // virtual props
    category?: Category;
    city?: City;

    isClientRequested?: boolean;

    imageUrl?:string;
    status:"pending" | "active" | "barrow"
}

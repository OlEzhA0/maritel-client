/// <reference types="react-scripts" />

interface SubCateg {
    id: string;
    subs: string;
}

type SortBy = "Новизне" | "От дешевых к дорогим" | "От дорогих к дешевым";

interface CategoriesTypes {
    id: string;
    category: string;
    subCategories: SubCateg[];
}

interface CategoriesFromDB {
    id: string;
    category: string;
    subCategories: string;
}

interface SpecProdsCategory {
    id: string;
    name: string;
    products: string[];
}

interface SubFooterInfo {
    name: string;
    link: string;
}

interface FooterInfo {
    name: string;
    fields: SubFooterInfo[];
}

interface Sizes {
    size: string;
    articul: string;
    stock: string;
}

interface Products {
    uuid: string;
    id: string;
    title: string;
    descr: string;
    color: string;
    price: string;
    modelParam: string;
    gender: string;
    care: string;
    composition: string;
    sizes: Sizes[];
    lastPrice: string;
    type: string;
    photos: string[];
    previewPhoto: string;
    timestamp: string;
}

interface LocalProduct {
    id: string;
    uuid: string;
    title: string;
    descr: string;
    color: string;
    price: string;
    modelParam: string;
    gender: string;
    care: string;
    composition: string;
    sizes: string;
    lastPrice: string;
    type: string;
    photos: string[];
    previewPhoto: string;
    timestamp: string;
}

interface ColorTypes {
    id: string;
    name: string;
    link: string;
}

interface SortOptions {
    name: string;
    count: number;
}

interface CartProd {
    prodUuid: string;
    quantity: string;
    size: string;
}

interface Customer {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    city: OptionType;
    phone: string;
    shippingMethod?: { value: "postOffice" | "courier"; name: string };
    shippingAddress: {
        street?: OptionType;
        houseNumber?: string;
        appartment?: string;
        value?: string;
        name?: string;
    };
    birthday: {
        day: string;
        month: string;
    };
    orders: Order[];
    gender: { value: "male" | "female"; name: string };
    status: "registering" | "registered";
}

interface OptionType {
    value: string;
    name: string;
}

interface Order {
    _id: string;
    uuid: string;
    orderId: string;
    items: [
        {
            prodUuid: string;
            name: string;
            size: string;
            quantity: string;
            price: string;
        }
    ];
    date: string;
    receiver?: {
        firstName: string;
        lastName: string;
        patronymic: string;
        phone: string;
    };
    payer: {
        firstName: string;
        lastName: string;
        phone: string;
    };
    city: OptionType;
    customReceiver: Boolean;
    paymentMethod: string;
    paymentService: string;
    shippingAddress: {
        street?: OptionType;
        appartment?: string;
        houseNumber?: string;
        value?: string;
        name?: string;
    };
    shippingMethod: string;
    amount: string;
    paymentStatus: string;
    deliveryStatus: string;
}

interface MainSettings {
    main?: string;
    phone?: string;
    instagram?: string;
    facebook?: string;
    telegram?: string;
}

interface SocialLink {
    name: "facebook" | "instagram" | "telegram";
    link: string;
}

type Promo = {
    promoName: string;
    promoDisc: "grn" | "percent";
    promoValue: number;
};


type InfoPageNames = "brand" | "bloggers" | "vacancies" | "delivery-policies" | "return-policies" | "rules"
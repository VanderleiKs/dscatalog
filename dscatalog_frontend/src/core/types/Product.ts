export type ProductResponse = {
    content: Product[];
    totalPages: number;
}

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    date: string;
    categories: Categories[];
}

export type Categories = {
    id: number;
    name: string;
}
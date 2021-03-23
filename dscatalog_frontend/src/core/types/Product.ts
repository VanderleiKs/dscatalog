export type ProductResponse = {
    content: Product[];
    totalPages: number;
    totalElements: number;
    size: number;
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

export type CategoryResponse = {
    content: Categories[];
    totalPages: number;
}

export type Categories = {
    id: number;
    name: string;
}
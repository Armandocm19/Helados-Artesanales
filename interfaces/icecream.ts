

export interface IIcecream {
    _id: string,
    name: string,
    price: number,
    inStock: number,
    slug: string,
    tags: string[],
    images: string,

    // TODO: Agregar createAt y updateAt

    createdAt: string;
    updatedAt: string;
}
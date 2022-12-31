

interface SeedProduct {
    name: string,
    price: number,
    inStock: number,
    slug: string,
    tags: string[],
    images: string,
}

interface seedData {
    Icecreams: SeedProduct[]
}

export const InitialData : seedData = {
    Icecreams: [
        {
            name:'Crema',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_crema',
            tags: ['crema', 'cre'],
            images: 'icecream20.jpeg'
        },
        {
            name:'Café Capuchino',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_cafe_capuchino',
            tags: ['cafe', 'capuchino'],
            images: 'icecream19.jpeg'
        },
        {
            name:'Galleta María',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_galleta_maria',
            tags: ['galleta', 'maria'],
            images: 'icecream18.jpeg'
        },
        {
            name:'Frutas Mixtas',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_frutas_mixtas',
            tags: ['crema', 'cre'],
            images: 'icecream17.jpeg'
        },
        {
            name:'Nutella',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_nutella',
            tags: ['crema', 'cre'],
            images: 'icecream21.jpeg'
        },
        {
            name:'Milán Menta',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_milan_menta',
            tags: ['crema', 'cre'],
            images: 'icecream15.jpeg'
        },
        {
            name:'M&MS',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_m&ms',
            tags: ['m&ms'],
            images: 'icecream14.jpeg'
        },
        {
            name:'Caelota de Limón',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_carlota_de_limon',
            tags: ['carlota', 'limon'],
            images: 'icecream13.jpeg'
        },
        {
            name:'Tres leches',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_tres_leches',
            tags: ['tres', 'leches'],
            images: 'icecream212.jpeg'
        },
        {
            name:'Nucita',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_nucita',
            tags: ['nucita'],
            images: 'icecream11.jpeg'
        },
        {
            name:'Coco',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_coco',
            tags: ['coco'],
            images: 'icecream10.jpeg'
        },
        {
            name:'Chicle',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_chicle',
            tags: ['chicle'],
            images: 'icecream9.jpeg'
        },
        {
            name:'Nutifrutas',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_nutifrutas',
            tags: ['nuti', 'frutas'],
            images: 'icecream8.jpeg'
        },
        {
            name:'Fresa con crema',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_fresa_con_cream',
            tags: ['fresa', 'crema', 'fresaconcrema'],
            images: 'icecream5.jpeg'
        },
        {
            name:'Choco Banano',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_choco_banano',
            tags: ['choco', 'banano', 'chocobanano'],
            images: 'icecream6.jpeg'
        },
        {
            name:'Oreo',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_oreo',
            tags: ['oreo'],
            images: 'icecream4.jpeg'
        },
        {
            name:'Guayabita',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_guayabita',
            tags: ['guayabita'],
            images: 'icecream3.jpeg'
        },
        {
            name:'Maní',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_mani',
            tags: ['mani'],
            images: 'icecream1.jpeg'
        },
        {
            name:'Choco Maní',
            price: 700,
            inStock: 0,
            slug: 'helado_sabor_choco_mani',
            tags: ['choco', 'mani'],
            images: 'icecream2.jpeg'
        },
    ]
}
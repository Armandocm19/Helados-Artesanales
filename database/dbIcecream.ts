import { db } from "."
import { IIcecream, IOrderIcecream } from "../interfaces";
import { Icecream } from "../models"


export const getByIcecreamBySlug = async ( slug: string ): Promise<IIcecream | null> => {

    const icecream = await Icecream.findOne({ slug }).lean();

    return icecream ? JSON.parse( JSON.stringify(icecream)) : null;

}

interface ProductSlug{
    slug: string
}

export const getAllIcecreamsSlug = async (): Promise<ProductSlug[]> => {

    await db.connect();

    const slugs = await Icecream.find().select( 'slug -_id' ).lean();

    await db.disconnect();

    return slugs;

}

export const getIcecreamByTerm = async ( term: string ): Promise<IIcecream[]> => {

    const icecreams = await Icecream.find({
        $text : { $search : term.toLocaleLowerCase() }
    })
    .select('name images price inStock slug -_id')
    .lean();

    return icecreams;

}

export const changeQuantityProduct = async ( orderIcecreams: IOrderIcecream[], MoreStock: boolean ) => {
    
  await orderIcecreams.forEach(async(order) =>{

    try {

      let { slug, quantity } = order;
      const icecream = await Icecream.findOne({ slug }).select('inStock _id').lean();
  
      if (!icecream) {
        throw new Error(`El producto con el slug "${slug}" no existe en la base de datos.`);
      }

      const currentStock = icecream.inStock;
  
      // Verificar si el stock del producto es suficiente
      if (!MoreStock && currentStock < quantity) {
        throw new Error(`El stock actual del producto es insuficiente para disminuirlo en ${quantity} unidades.`);
      }
  
      const newStock = !MoreStock ? currentStock - quantity : currentStock + quantity;

      if(MoreStock) console.log({newStock})
  
      await Icecream.updateOne({ slug: slug }, {
        $set: {
          inStock: newStock
        }

    })

  } catch (error) {
    console.error(error);

    throw error;
  }

  });

}
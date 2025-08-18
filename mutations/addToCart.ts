import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('addToCart');
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to add an item to the cart');
  }
  const allCartItems = await context.lists.CartItem.findMany({
    where: {
      user: { id: sesh.itemId },
      product: { id: productId },
    },
    resolveFields: 'id quantity',
  });
  const [exestingCartItem] = allCartItems;
  if (exestingCartItem) {
    console.log(
      `There are ${exestingCartItem.quantity} of this item in the cart`
    );
    return context.lists.CartItem.updateOne({
      id: exestingCartItem.id,
      data: { quantity: exestingCartItem.quantity + 1 },
    });
  }
  return context.lists.CartItem.createOne({
    data: {
      user: { connect: { id: sesh.itemId } },
      product: { connect: { id: productId } },
    },
  });
}
export default addToCart;

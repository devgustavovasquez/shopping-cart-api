import { CartItem } from './cart-item';

export type CartProps = {
  id: number;
  userId: number;
  items: CartItem[];
};

export class Cart {
  private props: CartProps;

  constructor(props: CartProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get userId() {
    return this.props.userId;
  }

  get items() {
    return this.props.items;
  }

  addItem(item: CartItem): void {
    const itemIndex = this.props.items.findIndex(
      (cartItem) => cartItem.product.id === item.product.id,
    );

    if (itemIndex === -1) {
      item.product.stock = item.product.stock - item.quantity;
      this.props.items.push(item);
    } else {
      const newQuantity = this.props.items[itemIndex].quantity + item.quantity;
      this.validateAndUpdateQuantity(itemIndex, newQuantity);
    }
  }

  reduceQuantity(item: CartItem, quantity: number): void {
    const itemIndex = this.props.items.findIndex(
      (cartItem) => cartItem.product.id === item.product.id,
    );

    if (itemIndex === -1) {
      throw new Error('Cart item not found');
    }

    const newQuantity = this.props.items[itemIndex].quantity - quantity;
    this.validateAndUpdateQuantity(itemIndex, newQuantity);
  }

  clearCart(): void {
    this.props.items = [];
  }

  calculateTotalCost(): number {
    return this.props.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }

  private validateAndUpdateQuantity(
    itemIndex: number,
    newQuantity: number,
  ): void {
    if (newQuantity <= 0) {
      this.props.items.splice(itemIndex, 1);
    } else {
      const item = this.props.items[itemIndex];
      item.quantity = newQuantity;
    }
  }
}

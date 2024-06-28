// order.model.ts

  import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
});


  export const Order = model<IOrder>('Order', orderSchema);

  
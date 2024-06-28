// order.model.ts

    import { IOrder } from "./order.interface";
    import { Order } from "./order.model";
 
    export const createOrderService = async (payload: IOrder) => {
  const result = await Order.create(payload);
  return result;
};
    
      
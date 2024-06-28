// Order.controller.ts
  import { RequestHandler } from 'express';
  import {  sendResponse } from '../../utils/sendResponse';
  import { catchAsync } from '../../utils/catchAsync';
  import { createOrderService } from './order.service'; // Update with your service path

  export const getAllOrderController: RequestHandler = catchAsync(async (req, res) => {
    const result = await createOrderService(req.body);
    sendResponse(res, {
      status: 201,
      success: true,
      message: 'Successfully created order',
      data: result,
    });
  });
  
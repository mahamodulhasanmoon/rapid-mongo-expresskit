import { RequestHandler } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { createDemoService } from './demo.service';
import { IDemo } from './demo.interface';

export const createStudentController: RequestHandler = catchAsync(
  async (req, res) => {
    const demoData: IDemo = req.body;
    const result = await createDemoService(demoData);
    sendResponse(res, {
      status: 201,
      success: true,
      message: 'successfully created demo',
      data: result,
    });
  },
);

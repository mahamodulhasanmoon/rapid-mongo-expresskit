
  // Text.controller.ts
  import { RequestHandler } from 'express';
  import {  sendResponse } from '../../utils/sendResponse';
  import { catchAsync } from '../../utils/catchAsync';
  import { 
  createTextService,
   getAllTextService ,
   getTextByIdService,
   updateTextByIdService,
   deleteTextByIdService
   } from './text.service'; // Update with your service path

  export const createTextController: RequestHandler = catchAsync(async (req, res) => {
    const result = await createTextService(req.body);
    sendResponse(res, {
      status: 201,
      success: true,
      message: 'Successfully created text',
      data: result,
    });
  });

  // Get All Text 

    export const getAllTextController: RequestHandler = catchAsync(async (req, res) => {
    const result = await getAllTextService(req.query);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'text retrived successfully',
      data: result,
    });
  });


  // Get single Text 

    export const getTextByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await getTextByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'text retrived successfully',
      data: result,
    });
  });


  // update Text 

    export const updateTextByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await updateTextByIdService(req.params.id,req.body);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'text updated successfully',
      data: result,
    });
  });

  // delete Text 

    export const deleteTextByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await deleteTextByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'text deleted successfully',
      data: result,
    });
  });


  
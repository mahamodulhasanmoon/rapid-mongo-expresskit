#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const fs = require('fs');
const path = require('path');

// Command line arguments
const moduleName = process.argv[2];

if (!moduleName) {
  console.error('Please provide a module name.');
  process.exit(1);
}

// Directory where modules will be created
const modulesDir = path.join(__dirname, '../src/modules');

// Function to create module files
function createModuleFiles(moduleName) {
  const modulePath = path.join(modulesDir, moduleName);
  fs.mkdirSync(modulePath, { recursive: true });

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // Create interface file
  const interfaceContent = `// ${moduleName}.model.ts
export interface I${capitalize(moduleName)} {
  name: string;
  email: string;
  phone?: string;

  // update your content here 
}

  `;
  fs.writeFileSync(
    path.join(modulePath, `${moduleName}.interface.ts`),
    interfaceContent,
  );

  // Create schema file and model file
  // model
  const modelContent = `// ${moduleName}.model.ts

  import { Schema, model } from 'mongoose';
import { I${capitalize(moduleName)} } from './${moduleName}.interface';

const ${moduleName}Schema = new Schema<I${capitalize(moduleName)}>({
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


  export const ${capitalize(moduleName)} = model<I${capitalize(moduleName)}>('${capitalize(moduleName)}', ${moduleName}Schema);

  `;

  fs.writeFileSync(
    path.join(modulePath, `${moduleName}.model.ts`),
    modelContent,
  );

  // Validation
  const validationContent = `// ${moduleName}.validation.ts

import { z } from 'zod';
export const ${moduleName}ValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    name: z.string(),
    avatar: z.string(),
  }),
});

  `;
  fs.writeFileSync(
    path.join(modulePath, `${moduleName}.validation.ts`),
    validationContent,
  );

  // routes
  const routeContent = `// ${moduleName}.routes.ts

import { Router } from 'express';

export const ${moduleName}Routes: Router = Router();

${moduleName}Routes.post('/demo');

  `;
  fs.writeFileSync(
    path.join(modulePath, `${moduleName}.routes.ts`),
    routeContent,
  );

  // Create controller file
  const controllerContent = `
  // ${capitalize(moduleName)}.controller.ts
  import { RequestHandler } from 'express';
  import {  sendResponse } from '../../utils/sendResponse';
  import { catchAsync } from '../../utils/catchAsync';
  import { 
  create${capitalize(moduleName)}Service,
   getAll${capitalize(moduleName)}Service ,
   get${capitalize(moduleName)}ByIdService,
   update${capitalize(moduleName)}ByIdService,
   delete${capitalize(moduleName)}ByIdService
   } from './${moduleName}.service'; // Update with your service path

  export const create${capitalize(moduleName)}Controller: RequestHandler = catchAsync(async (req, res) => {
    const result = await create${capitalize(moduleName)}Service(req.body);
    sendResponse(res, {
      status: 201,
      success: true,
      message: 'Successfully created ${moduleName}',
      data: result,
    });
  });

  // Get All ${capitalize(moduleName)} 

    export const getAll${capitalize(moduleName)}Controller: RequestHandler = catchAsync(async (req, res) => {
    const result = await getAll${capitalize(moduleName)}Service(req.query);
    sendResponse(res, {
      status: 200,
      success: true,
      message: '${moduleName} retrived successfully',
      data: result,
    });
  });


  // Get single ${capitalize(moduleName)} 

    export const get${capitalize(moduleName)}ByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await get${capitalize(moduleName)}ByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: '${moduleName} retrived successfully',
      data: result,
    });
  });


  // update ${capitalize(moduleName)} 

    export const update${capitalize(moduleName)}ByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await update${capitalize(moduleName)}ByIdService(req.params.id,req.body);
    sendResponse(res, {
      status: 200,
      success: true,
      message: '${moduleName} updated successfully',
      data: result,
    });
  });

  // delete ${capitalize(moduleName)} 

    export const delete${capitalize(moduleName)}ByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await delete${capitalize(moduleName)}ByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: '${moduleName} deleted successfully',
      data: result,
    });
  });


  `;

  fs.writeFileSync(
    path.join(modulePath, `${moduleName}.controller.ts`),
    controllerContent,
  );

  // Service Content

  // Create model file
  const serviceContent = `// ${moduleName}.service.ts
    import { QueryBuilder } from "../../builder/QueryBuilder";
    import { I${capitalize(moduleName)} } from "./${moduleName}.interface";
    import { ${capitalize(moduleName)} } from "./${moduleName}.model";

    // Create New ${moduleName} service
 
    export const create${capitalize(moduleName)}Service = async (payload: I${capitalize(moduleName)}) => {
  const result = await ${capitalize(moduleName)}.create(payload);
  return result;
};

// getAll ${moduleName} service

    export const getAll${capitalize(moduleName)}Service = async (query: Record<string, unknown>) => {
      const ${moduleName}Queries = new QueryBuilder(${capitalize(moduleName)}.find(), query)
      .sort()
      .filter()
      .search([
            'name',
            'category',
            'description',
            // replace  with proper fields
            ])
      .fields()
      .paginate()

      const result = await ${moduleName}Queries.modelQuery;
      return result ;
};

// get ${moduleName} by Id or single  service

export const get${capitalize(moduleName)}ByIdService = async (id:string) => {
  const result = await ${capitalize(moduleName)}.findById(id);
  return result;
};

// delete ${moduleName} by Id or single  service

export const delete${capitalize(moduleName)}ByIdService = async (id:string) => {
  const result = await ${capitalize(moduleName)}.findByIdAndDelete(id);
  return result;
};
// update ${moduleName} by Id or single  service

export const update${capitalize(moduleName)}ByIdService = async (id:string,payload:Partial<I${capitalize(moduleName)}>) => {
  const result = await ${capitalize(moduleName)}.findByIdAndUpdate(id,payload,{
      
      new: true,
      runValidators: true,
    
  });
  return result;
};

    
      `;
  fs.writeFileSync(
    path.join(modulePath, `${moduleName}.service.ts`),
    serviceContent,
  );

  console.log(`Module '${moduleName}' created successfully.`);
}

// Execute function to create module files
createModuleFiles(moduleName);

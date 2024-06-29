# Rapid Mongo Express Kit

Rapid Mongo Express Kit is a ready-to-use boilerplate for building Express.js applications with MongoDB. It includes pre-configured authentication, mail sending, error handling, and other utilities to streamline development and reduce repetitive tasks.

## Features

- Authentication using JWT and bcrypt
- MongoDB integration with Mongoose
- Mail sending with Nodemailer
- Error handling middleware
- Environment configuration with dotenv
- CORS support
- Cookie parsing
- Templating with EJS
- API documentation with Swagger
- Data validation with Zod
- Redis support with ioredis

## Installation

To create a new project using this kit:

```
npx rapid-mongo-expresskit my-new-project
cd my-new-project
npm install
npm dev
```



## Usage
After running the above commands, your Express.js application will be ready to use with the included features.

## Project Structure
```
📦rapid-mongo-expresskit 
 ┣ 📂src
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📜app.ts
 ┃ ┃ ┣ 📜errors.ts
 ┃ ┃ ┣ 📜middleware.ts
 ┃ ┃ ┗ 📜routes.ts
 ┃ ┣ 📂builder
 ┃ ┃ ┗ 📜QueryBuilder.ts
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂db
 ┃ ┃ ┣ 📜dbConnect.ts
 ┃ ┃ ┗ 📜redisConnect.ts
 ┃ ┣ 📂docs
 ┃ ┃ ┗ 📜swagger.yaml
 ┃ ┣ 📂errors
 ┃ ┃ ┣ 📜CustomError.ts
 ┃ ┃ ┣ 📜duplicateErrors.ts
 ┃ ┃ ┣ 📜notFoundError.ts
 ┃ ┃ ┣ 📜validation.mongoose.error.ts
 ┃ ┃ ┗ 📜zodError.ts
 ┃ ┣ 📂interfaces
 ┃ ┃ ┣ 📜error.interface.ts
 ┃ ┃ ┗ 📜index.d.ts
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┗ 📜requestValidator.ts
 ┃ ┣ 📂modules
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📜auth.constant.ts
 ┃ ┃ ┃ ┣ 📜auth.controller.ts
 ┃ ┃ ┃ ┣ 📜auth.interface.ts
 ┃ ┃ ┃ ┣ 📜auth.routes.ts
 ┃ ┃ ┃ ┣ 📜auth.service.ts
 ┃ ┃ ┃ ┣ 📜auth.utils.ts
 ┃ ┃ ┃ ┗ 📜auth.validaton.ts
 ┃ ┃ ┣ 📂Demo
 ┃ ┃ ┃ ┣ 📜demo.controller.ts
 ┃ ┃ ┃ ┣ 📜demo.interface.ts
 ┃ ┃ ┃ ┣ 📜demo.model.ts
 ┃ ┃ ┃ ┣ 📜demo.routes.ts
 ┃ ┃ ┃ ┣ 📜demo.service.ts
 ┃ ┃ ┃ ┗ 📜demo.validation.ts
 ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┣ 📜user.constant.ts
 ┃ ┃ ┃ ┣ 📜user.controller.ts
 ┃ ┃ ┃ ┣ 📜user.interface.ts
 ┃ ┃ ┃ ┣ 📜user.model.ts
 ┃ ┃ ┃ ┣ 📜user.routes.ts
 ┃ ┃ ┃ ┣ 📜user.service.ts
 ┃ ┃ ┃ ┗ 📜user.validation.ts
 ┃ ┣ 📂routes
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂test
 ┃ ┃ ┗ 📜dataTest.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜catchAsync.ts
 ┃ ┃ ┣ 📜emailSender.ts
 ┃ ┃ ┣ 📜genarateToken.ts
 ┃ ┃ ┗ 📜sendResponse.ts
 ┃ ┣ 📂views
 ┃ ┃ ┣ 📜email.ejs
 ┃ ┃ ┣ 📜reset.ejs
 ┃ ┃ ┗ 📜success_mail.ejs
 ┃ ┗ 📜index.ts
 ┣ 📜.env
 ┣ 📜.env.example
 ┣ 📜.eslintignore
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.prettierrc.json
 ┣ 📜package.json
 ┣ 📜pnpm-lock.yaml
 ┣ 📜readme.md
 ┗ 📜tsconfig.json
```


## Create Module routes controller service using cli 

you Can Create full Module with Boilarplate code using   cli command :

```
pnpm create-module <module-name>
```

now you can see your routes interface model controller and service boilerplate code is available under src/modules/<module-name> folder 
like 
```
module-name.model.ts
module-name.controller.ts
module-name.service.ts
module-name.interface.ts
module-name.validation.ts
module-name.routes.ts
```

# modulename.model.ts

```ts

  import { Schema, model } from 'mongoose';
import { IModulename } from './modulename.interface';

const modulenameSchema = new Schema<IModulename>({
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


  export const Modulename = model<IModulename>('Modulename', modulenameSchema);


```

# modulename.interface.ts

```ts

// modulename.model.ts
export interface IModulename {
  name: string;
  email: string;
  phone?: string;

  // update your content here 
}

```

# modulename.validation.ts

```ts
// modulename.validation.ts

import { z } from 'zod';
export const modulenameValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    name: z.string(),
    avatar: z.string(),
  }),
});

```

# modulename.controller.ts

```ts

// Modulename.controller.ts
  import { RequestHandler } from 'express';
  import {  sendResponse } from '../../utils/sendResponse';
  import { catchAsync } from '../../utils/catchAsync';
  import { createModulenameService } from './modulename.service'; // Update with your service path

  export const getAllModulenameController: RequestHandler = catchAsync(async (req, res) => {
    const result = await createModulenameService(req.body);
    sendResponse(res, {
      status: 201,
      success: true,
      message: 'Successfully created modulename',
      data: result,
    });
  });
  ```

  # modulename.service.ts

  ```ts

// modulename.service.ts

    import { IModulename } from "./modulename.interface";
    import { Modulename } from "./modulename.model";
 
    export const createModulenameService = async (payload: IModulename) => {
  const result = await Modulename.create(payload);
  return result;
};

  ```

  # modulename.routes.ts

  ```ts
// modulename.routes.ts

import { Router } from 'express';

export const modulenameRoutes: Router = Router();

modulenameRoutes.post('/demo');


  ```
## How to Implement Routes

- go to src/routes
- open index.ts
- you can see here : 
```ts
import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';

type IModulerRoutes = { path: string; route: Router }[];

export const modulerRoutes: IModulerRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

```

this is  built-in routes for authentication
if you want to add new routes then format is:

```ts
{
    path:'endpoint here'
    route: modulenameRoutes
}

```

## Advance Data Query and Filtering 

you can add get Request and  sorting querey searching in your service code format is:

```ts
    export const getAllModulnameService = async (query: Record<string, unknown>) => {
      const moduleQueries = new QueryBuilder(Modulename.find(), query)
      .fields()
      .filter()
      .sort()
      .search('search value here ')

      const result = await moduleQueries.modelQuery;
      return result ;
};
```


## License
This project is licensed under the MIT License.
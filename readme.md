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
## License
This project is licensed under the MIT License.
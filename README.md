## ToDo Backend + Frontend
This is a fullstack app created by Express.js on backend side and JavaScript/html/css on frontend side

### How to setup
There is a file called `.env.local` containing a environment variable named `DB_URL`. This variable is important in the app because it is used by `mongoose` to connect to DB. For you who want to test this app, you have to setup your MongoDB locally, or create a free account in MongoDB Atlas cloud system. At the end, set your DB url in the `.env.local` file and run the project

### How to run the project
The project is setup using `npm`. Follow these steps:


Checkout git repo
```
git checkout https://github.com/Arashr8/todo-backend.git
```

Navigate to project's folder
```
cd todo-backend
```

Install dependencies
```
npm install
```

Run the project
```
npm start
```


`❗Work In Progress❗`
# GamesLock
## About the project
GamesLock is a social media where everything you post will be there for eternity as once something is posted, you cannot edit it or delete it.

The backend was done in Node.js and the frontend with React.js

## Table of contents
- [About the project](#about-the-project)
- [Table of contents](#table-of-contents)
- [TODO](#todo)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [Development usage](#development-usage)
  - [Backend](#backend-1)
  - [Frontend](#frontend-1)

## TODO
Things done and not yet done:
- Backend
  - User
    - [x] Register/login/logout
    - [x] Delete account
    - [x] Getting a specific user profile
    - [x] Level system
    - [x] Notifications
    - [x] Follow system
    - [x] Getting an achievement
    - [x] Connection log system
  - Messages
    - [x] Adding message
    - [x] Getting a specific message
    - [x] Deleting message (admin only)
    - [x] Like system
    - [x] Report system
  - Comments
    - [x] Adding a comment to a post
    - [x] Getting a specific comment
    - [x] Deleting comment (admin only)
    - [ ] Like system
  - Achievements
    - [x] Adding achievements (admin only) 
    - [x] Editing an achievement (admin only)
  - Other
    - [ ] Optimisation
- Frontend
  - User
    - [ ] Profile page
    - [ ] Achievements page
    - [ ] Setting page
  - Home
    - [ ] Home page
  - Search 
    - [ ] Search page
  - Notifications
    - [ ] Notifications page

## Installation
clone the repo.
```bash
git clone https://github.com/NamelessProj/GamesLock.git
cd GamesLock
```

### Backend
Then go to the backend folder and install the dependencies.
```bash
cd backend
npm install
npm run dev
```

### Frontend
For the frontend, you'll need to go the frontend folder and install the dependencies.
```bash
cd frontend
npm install
npm run dev
```

## Usage
To use the project, you'll need some environment variables. You can create a `.env` file in the backend folder and add the following variables:
```env
PORT
NODE_ENV
DATABASE_URI
JWT_SECRET
```
The `PORT` is the port where the server will run.

The `NODE_ENV` is the environment where the server will run. It can be `dev` for `development` or `prod` for `production`.

The `DATABASE_URI` is the URI for the MongoDB database.

The `JWT_SECRET` is the secret for the JWT token. You can put anything you want, like `mysecret`.

## Development usage
###  Backend
Navigate to the backend folder and run the `server.js`
```bash
cd backend
npm run start
```

### Frontend
Navigate to the frontend folder and start the React app.
```bash
cd frontend
npm run start
```
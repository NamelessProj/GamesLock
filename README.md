![Work In Progress](https://img.shields.io/badge/Work_In_Progress-red?style=for-the-badge)

![Node version](https://img.shields.io/badge/Node-v.20.12.1-5FA04E?style=for-the-badge)
![React version](https://img.shields.io/badge/React-v.18.3.1-61DAFB?style=for-the-badge)

![License](https://img.shields.io/github/license/NamelessProj/GamesLock?style=for-the-badge)
![Repo size](https://img.shields.io/github/repo-size/NamelessProj/GamesLock?style=for-the-badge)
![Languages count](https://img.shields.io/github/languages/count/NamelessProj/GamesLock?style=for-the-badge)

![GamesLock logo](./frontend/public/LOGO.svg)
# GamesLock
## About the project
GamesLock is a social media where everything you post will be there for eternity as once something is posted, you cannot edit it or delete it.

The backend was done using Node.js with Express. The database used is MongoDB with Mongoose. The frontend was done using React with Vite.

If you're interested in the technical documentation, you can find it [here](./TECHNICAL_DOCUMENTATION.md).

## Table of contents
* [GamesLock](#gameslock)
  * [About the project](#about-the-project)
  * [Table of contents](#table-of-contents)
  * [TODO](#todo)
  * [Installation](#installation)
    * [Clone the repo](#clone-the-repo)
      * [Backend](#backend)
      * [Frontend](#frontend)
    * [Using the install script](#using-the-install-script)
  * [Usage](#usage)
    * [Example](#example)
    * [Images stored in the backend](#images-stored-in-the-backend)
  * [Development usage](#development-usage)
    * [Backend](#backend-1)
    * [Frontend](#frontend-1)
      * [Usage](#usage-1)
        * [Example](#example-1)
      * [Easter egg _(spoiler)_](#easter-egg-spoiler)
        * [404 page](#404-page)
        * [Search page](#search-page)
        * [Profile page](#profile-page)
  * [Cron jobs](#cron-jobs)
  * [Special thanks](#special-thanks)

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
    - [x] Profile page
    - [x] Achievements page
    - [x] Login/register page
    - [x] Edit profile page
  - Home
    - [x] Home page
  - Search 
    - [x] Search page
  - Notifications
    - [x] Notifications page
  - Posts
    - [x] Post page
    - [x] Adding comments
  - Other
    - [x] Translation

## Installation
### Clone the repo
clone the repo.
```bash
git clone https://github.com/NamelessProj/GamesLock.git
cd GamesLock
```

#### Backend
Then go to the backend folder and install the dependencies.
```bash
cd backend
npm install
npm run dev
```

#### Frontend
For the frontend, you'll need to go the frontend folder and install the dependencies.
```bash
cd frontend
npm install
npm run dev
```

### Using the install script
You can also use the install script to install the project and directly set up the .env file for both the backend and the frontend.

you'll need to download the [install.sh](./install.sh) script and place it into the parent folder you'd like the project to be in before running the script.

Then you can run the script with the following command:
```bash
./install.sh
```
or by double-clicking on the script and running it with the terminal.

The script will clone the project, install the dependencies for the backend and the frontend, and create the `.env` file for both the backend and the frontend.

Then to run the project,l you'll have to run the backend and the frontend separately, using the following commands:
```bash
# for the backend
cd backend
npm run dev
```
```bash
# for the frontend
cd frontend
npm run dev
```

## Usage
To use the project, you'll need some environment variables. You can create a `.env` file in the `backend folder` and add the following variables:
```env
PORT
NODE_ENV
DATABASE_URI
JWT_SECRET
MAILER_HOST
MAILER_PORT
MAILER_SECURE
MAILER_PASS
MAILER_USER
MAILER_DEV_EMAIL
ADMIN_EMAIL
```
The `PORT` is the port where the server will run.

The `NODE_ENV` is the environment where the server will run. It can be `dev` for `development` or `prod` for `production`.

The `DATABASE_URI` is the URI for the MongoDB database.

The `JWT_SECRET` is the secret for the JWT token. You can put anything you want, like `mysecret`.

The `MAILER_HOST` is the host for the mailer. You can use `smtp.gmail.com` for Gmail.

The `MAILER_PORT` is the port for the mailer. You can use `465` or `587`.

The `MAILER_SECURE` is a boolean for the mailer. You can use `true` or `false`.

The `MAILER_PASS` is the password for the mailer.

The `MAILER_USER` is the email for the mailer, For Gmail, it's your gmail account. This is the email who will send the emails.

The `MAILER_DEV_EMAIL` is the email where the mailer will send the emails in development, so you should put your personal email there to receive all the emails.

The `ADMIN_EMAIL` is the email for the admin. You can put your email there. It's used when something is reported.

>[!IMPORTANT]
> #### `ADMIN_EMAIL`
> The `ADMIN_EMAIL` is not only used to send reports to the admin. If your `NODE_ENV` is set to `prod`, the admin will receive every email, like OTP for registration and deletion of the account.
> 
> If you don't want to receive all the emails, you can set the `NODE_ENV` to `dev` and the admin will only receive reports while users will receive the emails.

### Example
```env
PORT=3000
NODE_ENV=dev
DATABASE_URI=mongodb://localhost:27017/gameslock
JWT_SECRET=mysecret
MAILER_HOST=smtp.gmail.com
MAILER_PORT=465
MAILER_SECURE=true
MAILER_PASS=abcdefghijklmnop
MAILER_USER=user@gmail.com
MAILER_DEV_EMAIL=personal@hotmail.com
ADMIN_EMAIL=my.admin.contact@gmail.com
```

>[!TIP]
> #### Using Gmail
> If you're using Gmail, you'll need to allow less secure apps to access your account. You'll have to use the 2-step verification and create an app password. You can do that [here](https://myaccount.google.com/apppasswords).
> 
> You can also use the OAuth2 method, but it's a bit more complicated.

### Images stored in the backend
The profile pictures and the images for the posts are stored in the backend. You'll find all the default profile pictures in the [./backend/uploads/user](./backend/uploads/user). And the images for the posts in the [./backend/uploads/post](./backend/uploads), so you won't have to add any folder when setting up the project.

If you ever wondered, don't worry every image are handled so they won't be too big. they are resized to 120x120 for the profile pictures and 500x500 for the post images. And they're even reformatted to be in the `webp` format.

## Development usage
###  Backend
Navigate to the backend folder and run the `server.js`
```bash
cd backend
npm run start
# or
npm run dev
```

### Frontend
Navigate to the frontend folder and start the React app.
```bash
cd frontend
npm run start
# or
npm run dev
```

#### Usage
To use the project, you'll need some environment variables. You can create a `.env` file in the `frontend folder` and add the following variables:
```env
VITE_BACKEND_URL
VITE_API_URL
VITE_IMG_URL
```
The `VITE_BACKEND_URL` is the URL for the backend.

The `VITE_API_URL` is the URL for the backend API.

The `VITE_IMG_URL` is the URL for the images. Since the images are stored in the backend, you'll need to put the URL for the images.

##### __Example__
```env
VITE_BACKEND_URL=http://localhost:3000
VITE_API_URL=$VITE_BACKEND_URL/api/
VITE_IMG_URL=$VITE_BACKEND_URL/images/
```
Since the `VITE_API_URL` and `VITE_IMG_URL` are using the `VITE_BACKEND_URL`, you only need to set the `VITE_BACKEND_URL` and the other two will use it.

#### Easter egg _(spoiler)_
I added some easter eggs in the project. If you're willing to find them yourself, don't read the following. If you want to know where they are, you can read the following.

##### __404 page__
Doing the konami code but switching the 'B' and 'A' buttons will redirect you to a tutorial on how to do the konami code.

Doing the konami code correctly will display a message.

If you wait 2 minutes on the page, a character will appear.

##### __Search page__
You can search for the following terms:
- `do a barrel roll`

##### __Profile page__
You should try clicking on the profile picture a bunch of times.

## Cron jobs
I added some cron jobs to the project. They are used to delete logs, notifications and OTP after a certain amount of time.

## Special thanks
I'd like to thank [Jenni Corentin (CroclingJ09)](https://github.com/CroclingJ09) for the profile pictures he made for the project.

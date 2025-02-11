# Technical Documentation
## Project Context
Create a social media platform, where users can connect, share their experiences, comment on the experiences of others or even make new friends.

The key feature of the platform is the way everything users will post will be permanent with no way to delete it, just like progression in a game. Users still have the ability to edit and delete their profile, but not their posts.

## Technologies Used
### Frontend
- Axios
- i18next
- Material Tailwind
- React
- React Router
- TailwindCSS
- Vite
- Zustand

And many others libraries that can be found in the `package.json` file.

### Backend
- bcrypt
- cookie-parser
- cors
- dotenv
- express
- jsonwebtoken
- mongoose
- multer
- nodemailer
- nodemon
- sharp

And many others libraries that can be found in the `package.json` file.

## Difficulties Encountered
When downloading pictures, from time to time the picture was double downloaded. The problem was solved by removing an unnecessary check that was only relevant for the development.

When changing the password, the validation of the current password was not happening, allowing any password to change the user's password.

When trying to delete pictures either from the profile or from the post, the picture was not being deleted from the folder. The problem was solved by adding a synchronous function to delete the picture. But the problem is not completely solved because if the file is somehow used by another process, it will not be deleted but an email will be sent to the administrator to let him know that the file was not deleted.

## Future Of The Project
It will be subsequently studied to add the possibility to like and report comments too.

A chat system will also be considered, allowing users to talk to each other in real-time.

Letting users log in with their Google account will also be considered.
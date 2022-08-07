## About The Project

xLO is a free online platform where you can sell your own stuffs. It’s a great place to sell used cars, furniture, and even old houses.

Create you first ad at https://react---xlo.web.app/ :partying_face:

**This project is developed for educational purpose, inspired by www.olx.bg.**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![react.js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![bootstrap.com](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
- ![firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Getting Started

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/selyami-angelov/my-app.git
   ```
2. Install NPM packages

   ```sh
   npm install --legacy-peer-deps
   ```

   > **_NOTE:_** Use `--legacy-peer-deps` flag when installing packages to avoid dependency conflicts.

3. Set firebase config

   ```js
   //prod
   // const firebaseConfig = {
   //   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   //   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
   //   projectId: process.env.REACT_APP_PROJECT_ID,
   //   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
   //   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
   //   appId: process.env.REACT_APP_APP_ID,
   //   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
   // }

   //dev
   const firebaseConfig = {
     apiKey: 'AIzaSyAKML5f5uLvidhMIF-cI096JHofpOECs14',
     authDomain: 'react--xlo-dev.firebaseapp.com',
     projectId: 'react--xlo-dev',
     storageBucket: 'react--xlo-dev.appspot.com',
     messagingSenderId: '408138765253',
     appId: '1:408138765253:web:3d07e2365cd8dcd5aab1ac',
   }
   ```

   > **_NOTE:_** Commend prod config that use environment variables and uncomment dev config. Note that, there is no created ads in dev.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Authentication

1. You can use email and password based account.

2. You can use Google Account.

> **_NOTE:_** If you already have an account created with this email, the old one will be overwritten and you will not be able to log in with password again(user data is saved).

3. You can use Facebook Account
   > **_NOTE:_** If you already have an account created with the same email that your Facebook account was created with, they will be linked and you will be able to use both sign in methods

## Features

- Create, edit, follow and remove listings
- Search by category or location
- Filter by category, subcategory, price-from, price-to, delivery-condition
- Google maps marker by user location
  > **_NOTE:_** City location only

## Contact

Selyami Angelov - angelov.selyami@gmail.com

Project Link: [https://github.com/selyami-angelov/my-app](https://github.com/selyami-angelov/my-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
```

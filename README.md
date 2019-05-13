# Capstone Chat

@Author: William M Nau

The web application for my Rose State College Capstone Project, Spring 2019.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

Launches the npm run build and firebase deploy.<br>

'firebase deploy' is a firebase-cli to deploy the application to firebase hosting.<br>

You must have the firebase cli installed with 'npm i -g firebase-tools'.<br>
Login to firebase through the cli with firebase login.<br>
To run firebase deploy, run 'firebase init' and select 'Hosting'.<br>
When asked which folder to deploy to, enter 'build'.<br>
Enter 'y' when asked if this will be a single page application.

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

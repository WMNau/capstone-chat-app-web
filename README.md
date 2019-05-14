# Capstone Chat

@Author: William M Nau

The web application for my Rose State College Capstone Project, Spring 2019.

## Running locally

Required programs:

- Command line (i.e., Terminal for mac, Powershell for windows)
- Node Package Manager (NPM)
- Your favorite text editor (i.e., Visual Studio Code, Atom, Sublime, Notepad++, Brackets)

### How to run locally

- Open your command line
- Change directory to where you have Capstone Chat saved to
- Install npm

* On a mac `sudo npm i -S npm`
* On windows `npm i -S npm`

- Run `npm install`
- Start the local server `npm start`

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

```javascript
firebase deploy
```

is a firebase-cli to deploy the application to firebase hosting.<br>

You must have the firebase cli installed with

```javascript
npm i -g firebase-tools
```

Login to firebase through the cli with firebase login.<br>
To run firebase deploy, run

```javascript
firebase init
```

and select 'Hosting'.<br>

When asked which folder to deploy to, enter 'build'.<br>
Enter 'y' when asked if this will be a single page application.

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

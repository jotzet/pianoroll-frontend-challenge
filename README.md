After cloning this repository, go to the project directory, open it in a terminal and run:

### `npm install`

After installing all the packages, run:

### `npm start`

Then open [http://localhost:3000](http://localhost:3000) to view it in your browser.

In case of CORS-related errors, make sure to install the following extensions:

1. [for Chrome](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)
2. [for Firefox](https://addons.mozilla.org/en-US/firefox/addon/access-control-allow-origin)

## Directory Descriptions

- **`App.jsx`** and **`index.js`**: The entry point of the React application.

- **`assets`**: This directory contains various assets like images and icons used in the project.

- **`components`**: Components that make up the UI of the application. Each component is responsible for a specific part of the user interface.
  **_PianoRoll.jsx_** and **_MainPianoRoll.jsx_** are core components that provide the most functionality to the app.

- **`pages`**: React components that represent different pages of the app. Each page has its own routing defined in **_App.jsx_**.

- **`styles`**: Stylesheets for styling your components and pages. It includes both CSS and Less files.

- **`utils`**: Utility modules that can be used across the project for functions like gradient generation and storage handling.

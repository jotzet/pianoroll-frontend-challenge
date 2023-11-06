# Piano Roll Frontend Challenge
## Video demo
To see the screencast of my solution use this link:
[youtu.be/ieaIWmCoLdE](https://youtu.be/ieaIWmCoLdE)
## Installation and Usage

The project is deployed on this website:

[pianorollfrontendchallenge.netlify.app](https://pianorollfrontendchallenge.netlify.app/)

If you prefer to run it locally, clone this repository, go to the project directory, open it in a terminal and run:

### `npm install`

After installing all the packages, run:

### `npm start`

Then open [http://localhost:3000](http://localhost:3000) to view it in your browser.

In case of CORS-related errors, make sure to install the following extensions:

1. [for Chrome](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)
2. [for Firefox](https://addons.mozilla.org/en-US/firefox/addon/access-control-allow-origin)

## How the app works

_To access this manual while using the website, click on the red question mark at the upper right corner in the topbar._

### Navigation to the Main Page

At any point, you can easily navigate back to the main page by clicking on the app's logo in the top bar.

### Loading Main Piano Rolls

At the main page, you'll notice a button labeled "_Load the Main Piano Rolls_". Clicking on this button triggers a request to an external API to fetch random piano roll data. This data is then stored in your browser's local storage. It's worth noting that each time you click this button, the previous data in local storage is cleared, and the new data is saved.

Sometimes, very rarely, there is a problem with the API and the website doesn't properly import the data. If that's the case, try to go to the main page and reload the rolls.

### Viewing All Piano Rolls

After you've clicked the "_Load the Main Piano Rolls_" button, you'll be redirected to a specific link that displays all the piano rolls presented in a grid layout with three columns by default. However, the number of columns adjusts dynamically for smaller screens, ensuring an optimal viewing experience.

### Detailed Roll View

When you click on a specific piano roll in the grid, you'll be directed to a dedicated page for that roll. The main piano roll is displayed on the left side, and the remaining rolls are presented on the right side as a scrollable vertical component. For users with smaller screens, the rolls are displayed horizontally to improve convenience.

### Selecting and Logging Data

To interact with the piano roll, you can click on specific points or coordinates within the roll. The first click initiates the starting point. The second click initiates the ending point. You can also drag the points or the whole selection. To remove the selection click a red "x" icon.

When you've selected two coordinates, a button will appear, allowing you to log the selected data to the console.
The logged data is stored in the console as a JSON file, including the corresponding data from the selected points on the piano roll and the number of notes within the selection.

## Directory Descriptions

- **`App.jsx`** and **`index.js`**: The entry point of the React application.

- **`assets`**: This directory contains various assets like images and icons used in the project.

- **`components`**: Components that make up the UI of the application. Each component is responsible for a specific part of the user interface.
  **_PianoRoll.jsx_** and **_MainPianoRoll.jsx_** are core components that provide the majority of the app's functionality.

- **`pages`**: React components that represent different pages of the app. Each page has its own routing defined in **_App.jsx_**.

- **`styles`**: Stylesheets for styling components and pages. It uses the LESS file **_mainstyle.less_**, which compiles to a CSS file.

- **`utils`**: Utility modules that can be used across the project for functions like gradient generation and storage handling.

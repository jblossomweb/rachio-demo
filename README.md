# Rachio Demo

![](https://media.giphy.com/media/7EqSP8bbgxYvS/giphy.gif)

## Zones User Interface

live demo: [https://jblossom-rachio-demo.firebaseapp.com/](https://jblossom-rachio-demo.firebaseapp.com/)

# Quick Start

1. clone from github: `git clone git@github.com:jblossomweb/rachio-demo.git`<br/>
or from bundle: `git clone -b master rachio-demo.bundle`
2. `cd rachio-demo`
3. `cp .env.example .env`
4. add your API key to the .env file
5. `yarn`
6. `yarn start`
7. open your browser to [http://localhost:3000](http://localhost:3000)

Note: you can use `npm` instead of `yarn`, but be advised the committed lock file is a `yarn.lock`

# Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test-ci`

Launches the test runner in CI mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn coverage`

Runs all tests and outputs an Istanbul coverage report, both on the command line, and into the coverage directory as HTML.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn lint`

Runs the linter, and outputs any tslint warnings/errors to the command line.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn storybook`

Runs the UI component storybook in isolation.<br />
Open [http://localhost:9001](http://localhost:9001) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build-storybook`

Builds the UI component storybook to the `.storybook/build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your UI component storybook is ready to be deployed!

### `yarn ship`

A handly shorthand command to sequentially:<br />
1. run linter
2. run tests
3. firebase deploy the app

This is basically a local CI. An error at any step in the process will exit.
If everything passes, it will securely deploy to firebase based on the settings in the repository, and the values in your .env file. You will need to be logged in on the CLI, and have access to the project.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn about Storybook, check out the [Storybook documentation](https://storybook.js.org/).

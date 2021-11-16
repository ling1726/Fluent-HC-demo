# Fluent UI v0 v9 High contrast test bench

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Usage

In the project directory, you run:

### `yarn`

* Installs dependencies
* Applies Northstar system colour theme patch
* Copies system colours theme to `node_modules` for Northstar

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Some learnings

### Sometimes `forced-color-adjust: none` is still necessary

There can be bugs with the rendering of forced colours in windows high contrast mode. One quite infuriating bug
is that `background-color` and `color` don't work together when explicitly setting the system colours.

We also can't assume there will never be rendering bugs with forced colours in different browser or OS versions
so it's important to remember, that it can and should be used in certain scenarios.

### Media queries still affect `forced-color-adjust: none`

Once a document/element styled to ignored forced-colors, media queries that explicitly set forced colours will still
affect that style. So if you want to completely avoid using system colours, remember to remove the media queries.
## Description

This is a showcase project created with React.
It's a website integrated with the [REST Countries API](https://restcountries.eu) to pull country data and display it.

[Click here to view the website at Heroku.](https://daniellrs-frontend-challenge.herokuapp.com)

The librarys used in this project was:

hw-api-fetch - To easily configure a api endpoint and make requests.
node-sass - To use the power of sass.
react-grid-system - To help handle with the layout.
react-loader-spinner - To show a spinner in loading cases.
redux, react-redux, simplerdux - To use a global state.
react-router - To handle the website routes.

## pathfinder

Besides the project has a logic test that can be found at pathfinder.html file.

It is a "virtual robot" that can walk up, right, left and bottom. And given a 2d matrix like below, it has to find the shortest path to `9`. `1` is a walkable place. `0` is a hole, and must be avoided.

```
[[1,1,1,1],
[0,1,1,0],
[0,1,0,1],
[0,1,9,1],
[1,1,1,1]]
```

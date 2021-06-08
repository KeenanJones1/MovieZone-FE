# The Movie Zone (front-end)

A dynamic movie app that receives data from an external RapidApi and an internal API built with Ruby on Rails that interacts with the local storage. Built with React JS, below is a list of the packages and properties used.

- React Hooks
- Styled-components
- Axios
- Props-Types
- React-spring
- React-Fontawesome


## Lessons Learned

This project was used as an introduction to react-spring. I wanted to take this opportunity to practice using animations.
Even though the animations I implemented were rudimentary I learned the fundamentals and enjoyed myself while doing so. The biggest obstacles this project provided were understanding the flow of API requests to be most efficient.

## Demo

![](https://media4.giphy.com/media/KgJ3X3qSuMSq9VRw94/giphy.gif?cid=790b7611a3e63c3ca6c2e7e872c9bbc9efcd3e2c79b0fdce&rid=giphy.gif&ct=g)


## Tech Stack

**Client:** React, Styled-components, React-spring

**Server:** Node


## Run Locally

Clone the repo from github
but make sure that the rails backend is running on localhost: 3000 before starting the react server.
Here's the link to the ruby on rails backend https://github.com/KeenanJones1/MovieZone-BE


Clone the project

```bash
  git clone https://github.com/KeenanJones1/MovieZone-FE
```

Go to the project directory

```bash
  cd Movie-Zone-FE
```

Install dependencies

```bash
  npm install
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_RAPID_API_KEY=`'f74d1279c4mshd4559ccc27337ccp1b5ff7jsnab1a1a8d0581'

`REACT_APP_API_BASE_URL=`'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/'

`REACT_APP_API_HOST=`'imdb-internet-movie-database-unofficial.p.rapidapi.com'



Start the server

```bash
  npm run start
```

# Turner App Challenge

## The Challenge

We would like you to build an application that allows users to:

- Search for a Title by its name. DONE
- Display the titles that match the search query. DONE
- Allow the user to pull up detailed information about a selected title from the list. DONE

## Backend Description

I generally approach projects from the bottom of the stack up. The mongo database was already provided
in the cloud for me. Given this, I didn't have to define any models and therefore went with a simple
library called monk to help me make queries to it instead of mongoose.

#### Two GET routes are defined.

1. /api/v1/titles
   This route pulls the entire collection of objects needed to populate the application.
   If a query is given like this: `[someresource]/?TitleName=` or `[someresource]/?ReleaseYear` a record matching
   that name will be pulled or if nothing is found it will return everything.
2. /api/v1/titles/names  
   This route pulls the entire collection of strings representing all the title names available.

### Front End Description

I decided to create the front-end in Angular. I used ngx-bootstrap as my UI framework because I like how easy it is to get started for prototyping quickly.

When the app boots up you are presented with a title jumbotron and a search box with a button to activate search querys.

Two UI components were used from ngx: accordian and typeahead.

Inside the project you will find a service which provides 2 public methods to pull the data from the api. This service is then consumed by the only component page used in the app. The lifecycle hook OnInit was used to load an initial list of Titles into the accordian list and to load the title names into the typeahead search box upon visiting the page.

# Final Thoughts

Due to time restrictions and current work situation I had to make decisions to get it functional and usable first and to prioritize things accordingly.

I would have liked to dockerize it and deploy it to Heroku but I ran out of time by the time I finished up with the core requirements. [I have done another app challenge months ago which is full CRUD and features those 2 skill sets if you're curious](https://github.com/JasonBBelcher/CRUD-code-challenge)

I enjoyed the challenge and will most probably take a json snapshot of the data and keep working on it after you have reviewed it and shut down the sample database

# Installation instruction

create a .env file and add the following:

```bash
# env file inside of server directory
PORT=8080
MONGO_URI=[MONGO_URL goes here]

```

#### Run API in dev mode

```bash
user@yourcomputer: ~/turner-challenge$ cd server
user@yourcomputer: ~/turner-challenge/server$ npm i
user@yourcomputer: ~/turner-challenge/server$ npm run start:dev

```

access it on localhost:8080/api/v1/titles/

#### Run server in production mode

```bash
user@yourcomputer: ~/turner-challenge$ cd server
user@yourcomputer: ~/turner-challenge/server$ npm i
user@yourcomputer: ~/turner-challenge/server$ npm start
```

#### Run frontend in dev mode

```bash
user@yourcomputer: ~/turner-challenge$ cd frontend/turner-app-challenge
user@yourcomputer: ~/turner-challenge/frontend/turner-app-challenge$ npm i
user@yourcomputer: ~/turner-challenge/frontend/turnere-app-challenge$ ng serve --open
```

Note: I have included the .env file for convenience only. Usually this would not be checked into a repo

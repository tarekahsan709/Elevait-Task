# Elevait Task
[![](https://github.com/tarekahsan709/Elevait-Task/workflows/Build/badge.svg)](https://github.com/tarekahsan709/Elevait-Task/actions?query=workflow%3ABuild)

##  Installation
1. Install [Node.js](https://nodejs.org)
2. Install Angular CLI: `npm i -g @angular/cli`
3. Go to backend and frontend folder to install all the dependencies: `npm i`

##  Run
- Copy the .env.example file and rename it .env, put all the environment variable. For database connection string put all the value under <> bracket.
- Go to backend folder and run `npm run dev` to start the backend which compile typeScript run the Express server.
- Go to frontend folder and run `ng serve` to start the frontend.

Frontend will be open at [localhost:4200](http://localhost:4200). Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

## Testing
```bash
# go to backend folder and run unit tests 
npm run test
```

## < ENTER TITLE OF THE PR GOES HERE..... >
< DESCRIPTION OF PR GOES HERE ... >

## What
* <WHAT CHANGED GOES HERE... >

## How to Test
### Get the code
* Clone the repo and checkout the PR branch

	```
	$ git clone https://github.com/guanguer/first-angular-app.git
	$ cd first-angular-app
	$ git checkout feat/<banch>
	$ npm install
	$ npm start
	```
Then navigate to [http://localhost:4200](http://localhost:4200) in your browser.

## Linting

Run `ng lint` to run the tslint. 

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `npm run build-prod` for a production build.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 

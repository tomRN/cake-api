# cake-api

## About this repo

An api for storing information about cakes.
Uses serverless to deploy api-gw + lambda endpoints to an AWS account.
This took around 2 hours from a totally empty repo to what you see here, with a couple of coffee breaks.
Uses typescript, with jest for testing.

## Note for reviewer
> "Both API and app should be downloadable and runnable with a simple git clone ->npm install -> npm start (yarn is fine too!)"
^ this was a requirement of the task.

To run locally some additional faff is required (to get dynamodb local running)
This is described below.


## Running locally
`npm i` to grab dependencies

then you need to start dynamodb locally:

`npm run start-dynamodb`

then you can start the api

`npm run start`


### Additional steps to setup / run dynamo db local

To run dynamo db local, I also needed to do some extra steps which you may need to do too:

+ install Java SDK https://www.oracle.com/uk/java/technologies/javase-jdk11-downloads.html
+ Run a separate command to install dynamo db local `sls dynamodb install`
+ Run `sls dynamodb start` and then `aws dynamodb list-tables --endpoint-url http://localhost:8000` to check all running locally correctly
+ To view the contents of a table, you can run `aws dynamodb scan --table-name cake_api_cakes_dev --endpoint-url http://localhost:8000`

Then run the following to start the service locally:

`npm run start`

## Testing
`npm run test` after an `npm run start` runs all unit tests and end to end tests - again this will require the AWS access mentioned above.

Alternatively:

`npm run test-e2e-dev` runs the e2e tests against the deployed dev endpoints.
`npm run test-unit` runs the unit tests only, not e2e

## Testing philosophy

To prevent development taking too long, not everything is unit tested, but there are some examples of the types of tests I write.
There is no need for mocking in the small number of unit tets I have written, in a second pass I would unit test the dynamo module which would involve mocking the dynamo db calls.
The endpoints have been tested with a single e2e script rather than unit tests or individual endpoint e2e tests, this has a range of advantages:

+ Very flexible to run against locally running service or deployed services (often replacing human testers)
+ Unlike unit tests, tests full e2e journey catching bugs around (for instance) the connection to the DB etc. which are common sources of problems
+ Very quick way to get high confidence that code is functional, at a sacrifice of granularity and independence of well-written unit tests.

## Blog/Notes as I was writing this

+ Create a blank repo
+ Add gitignore
+ Add serverless, typescript, jest, ts-jest
+ Add serverless.yml file with a table and stubs for the endpoints
+ Add simple blank file for each handler that returns a 500 not implemented.
    + While doing the above, add a responses helper lib and associated unit test.
    + Inc adding jest, a jest config, adding ts-jest and setting up test command
+ Add some commands and check that the stack deploys without issues (including fixing a silly typo in the serverless.yml file)
+ Stack deployed to an API-GW url for dev of https://muk48t5ptj.execute-api.eu-west-2.amazonaws.com/dev/cakes
+ Write some basic failing e2e tests for the endpoints
+ Add serverless offline so we can test a locally running version.
+ run npm test-e2e-offline to watch the test fail, we are ready then for development on the endpoints to proceed...
+ Get the first endpoint test passing, then move on to the rest.
Later...
+ Added in dynamodb local for easier local testing

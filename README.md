# cake-api

## About this repo

An api for storing information about cakes.
Uses serverless to deploy api-gw + lambda endpoints to an AWS account.
This took around 2 hours from a totally empty repo to what you see here, with a couple of coffee breaks.
Uses typescript, with jest for testing.

## Note for reviewer
> "Both API and app should be downloadable and runnable with a simple git clone ->npm install -> npm start (yarn is fine too!)"

^ I haven't been able to meet this criteria, I could have set up a locally running dyamo db instance but even that requires a load of additional faff beyond just running `npm i`

It will run locally, but the locally running version on your machine won't be able to talk to my dev dynamo databases (which are deployed in the cloud).

If we were working on this as a development team we'd get everyone set up with an AWS-CLI with access to an automated test env to get around this. Nonetheless you can still run my e2e and unit tests.


## Running locally
`npm i` to grab dependencies


To run dynamo db local, I also needed to

+ install Java SDK https://www.oracle.com/uk/java/technologies/javase-jdk11-downloads.html
+ Run a separate command to install dynamo db local `sls dynamodb install`
+ Run `sls dynamodb start` and then `aws dynamodb list-tables --endpoint-url http://localhost:8000` to check all running locally correctly
+ To view the contents of a table, you can run `aws dynamodb scan --table-name cake_api_cakes_dev --endpoint-url http://localhost:8000`

Then run the following to start the service locally:

`npm run start`

uses sls offline to run a version of the service locally on port 4040.
it also starts a local dynamodb instance on port 8000

NOTE - DB connectivity *will not work* unless you have the aws-cli installed on your machine, and an aws profile called tomn-personal, with credentials of an IAM user with access to the dev databases. Contact Tom N if you want to get this set up, or run the unit tests, and the tests against dev to verify that this is working as you expect without having to run the code locally.

## Testing
`npm run test` after an `npm run start` runs all unit tests and end to end tests - again this will require the AWS access mentioned above.

Alternatively:

`npm run test-e2e-dev` runs the e2e tests against the deployed dev endpoints.
`npm run test-unit` runs the unit tests which should always work.

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

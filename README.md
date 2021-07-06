# cake-api

## Blog as I was writing this

+ Create a blank repo
+ Add gitignore
+ Add serverless, typescript, jest, ts-jest
+ Add serverless.yml file with a table and stubs for the endpoints
+ Add simple blank file for each handler that returns a 500 not implemented.
    ++ While doing the above, add a responses helper lib and associated unit test.
    ++ Inc adding jest, a jest config, adding ts-jest and setting up test command
+ Add some commands and check that the stack deploys without issues (including fixing a silly typo in the serverless.yml file)
+ Stack deployed to an API-GW url for dev of https://muk48t5ptj.execute-api.eu-west-2.amazonaws.com/dev/cakes
+ Write some basic failing e2e tests for the endpoints


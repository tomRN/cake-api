import * as AWS from 'aws-sdk';

let docClientConfig: any = { region: (process.env.region || "eu-west-2") }
if (process.env.DYNAMO_DB_LOCAL) {
    docClientConfig = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
        secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
    }
}

const documentClient = new AWS.DynamoDB.DocumentClient(docClientConfig);

//Normally would unit test this, but won't under the time constraints of this excercise.

export const write = async <T>(tableName: string, data: T) => {
    //@ts-ignore
    if (!data.ID) throw new Error("Object you are writing must have an ID property");
    const params = {
        TableName: tableName,
        Item: { ...data },
    };
    await documentClient.put(params).promise();
    return ({ ...data } as unknown) as T;
}

export const scanAll = async<T>(tableName: string) => {
    const params: any = {
        TableName: tableName
    }
    const res = await documentClient.scan(params).promise();
    return res.Items as T[];
}

export const deleteByID = async (tableName: string, ID: string) => {
    const params = {
        TableName: tableName,
        Key: {
            ID
        },
    };
    return await documentClient.delete(params).promise();
}
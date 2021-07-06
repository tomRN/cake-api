import * as AWS from 'aws-sdk';
const documentClient = new AWS.DynamoDB.DocumentClient({ region: (process.env.region || "eu-west-2") });

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
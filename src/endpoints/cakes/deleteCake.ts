import { APIGatewayProxyEvent } from 'aws-lambda';
import { getResponseWithStatusCode } from '../../lib/responses';
import { deleteByID } from "../../lib/dynamo";

export const handler = async (event: APIGatewayProxyEvent) => {
    const cakeID = event.pathParameters?.cakeID;
    if (!cakeID) return getResponseWithStatusCode({ message: "cakeID required in path to delete" }, 400);
    const tableName = process.env.cakeTableName;
    if (!tableName) return getResponseWithStatusCode({ message: "server misconfigured, no table name in env" }, 500);
    await deleteByID(tableName, cakeID);

    return getResponseWithStatusCode({ message: "deleted" }, 200);
}
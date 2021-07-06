import { APIGatewayProxyEvent } from 'aws-lambda';
import { scanAll } from '../../lib/dynamo';
import { getResponseWithStatusCode } from '../../lib/responses';

export const handler = async (event: APIGatewayProxyEvent) => {
    const tableName = process.env.cakeTableName;
    if (!tableName) return getResponseWithStatusCode({ message: "server misconfigured, no table name in env" }, 500);
    //In prod we'd have to paginate etc... but this should do for now.
    let res = await scanAll(tableName);
    return getResponseWithStatusCode({ cakes: res }, 200);
}
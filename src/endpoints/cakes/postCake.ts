import { APIGatewayProxyEvent } from 'aws-lambda';
import { getResponseWithStatusCode } from '../../lib/responses';
import { validate } from "../../lib/cakes";
import { PostCake, Cake } from 'types';
import { v4 as uuidv4 } from 'uuid';
import { write } from "../../lib/dynamo"

export const handler = async (event: APIGatewayProxyEvent) => {
    if (!event.body) return getResponseWithStatusCode({ message: "Body required on event" }, 400)
    let parsedBody: any;
    try {
        parsedBody = JSON.parse(event.body);
    } catch (e) {
        return getResponseWithStatusCode({ message: "Body was not valid JSON" }, 400)
    }
    const validation = validate(parsedBody);
    if (!validation.isValid) {
        return getResponseWithStatusCode({ messages: validation.messages }, 400);
    }
    const postCake = validation.validatedObject as PostCake;
    const ID = uuidv4();
    //write to db;
    let cake: Cake = { ID, ...postCake };
    const tableName = process.env.cakeTableName;
    if (!tableName) return getResponseWithStatusCode({ message: "Endpoint misconfigured no table name in env." }, 500)

    const res = await write(tableName, cake);
    return getResponseWithStatusCode(res, 200);
}
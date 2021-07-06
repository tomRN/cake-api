import { APIGatewayProxyEvent } from 'aws-lambda';
import { PassThrough } from 'stream';
import { PostCake } from 'types';
import { getResponseWithStatusCode } from '../../lib/responses';

export const handler = async (event: APIGatewayProxyEvent) => {
    if (!event.body) return getResponseWithStatusCode({ message: "Body required on event" }, 400)
    let parsedBody: any;
    try {
        parsedBody = JSON.parse(event.body);
    } catch (e) {
        return getResponseWithStatusCode({ message: "Body was not valid JSON" }, 400)
    }
    //Some basic validation
    if (!parsedBody.name) {
        return getResponseWithStatusCode({ message: "'name' required on body" }, 400)
    }
    if (!parsedBody.yumFactor || typeof (parsedBody.yumFactor) !== 'number' || parsedBody.yumFactor < 1 || parsedBody.yumFactor > 5) {
        return getResponseWithStatusCode({ message: "'yumFactor' required on body, and must be number 1-5" }, 400)
    }


    return getResponseWithStatusCode({ message: "Not implemented" }, 500);
}
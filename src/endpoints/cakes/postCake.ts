import { APIGatewayProxyEvent } from 'aws-lambda';
import { getResponseWithStatusCode } from '../../lib/responses';

export const handler = async (event: APIGatewayProxyEvent) => {
    return getResponseWithStatusCode({ message: "Not implemented" }, 500);
}
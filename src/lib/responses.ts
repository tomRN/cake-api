
export const getResponseWithStatusCode = (data: any = {}, statusCode: number = 200) => {
    return {
        body: JSON.stringify(data), statusCode, headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}
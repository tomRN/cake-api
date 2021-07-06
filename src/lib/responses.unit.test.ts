
import { getResponseWithStatusCode } from "./responses"

describe("Response helper", () => {

    it("Returns the correct response code", () => {
        const res = getResponseWithStatusCode({ 'foo': 'bar' }, 200);
        expect(res.statusCode).toBe(200);
        const res2 = getResponseWithStatusCode({ 'foo': 'bar' }, 500);
        expect(res2.statusCode).toBe(500);
    })

    it("defaults to 200 if no res passed", () => {
        const res = getResponseWithStatusCode({ 'foo': 'bar' });
        expect(res.statusCode).toBe(200);
    })

    it("correctly serialises JSON for the response", () => {
        const exampleObject = {
            "foo": "bar",
            "test": [1]
        }
        const res = getResponseWithStatusCode(exampleObject);
        expect(typeof res.body).toBe("string");
        const parsedBody = JSON.parse(res.body);
        expect(parsedBody).toMatchObject(exampleObject);

    })

    it("sets the correct headers on the response", () => {
        const res = getResponseWithStatusCode({ 'foo': 'bar' });
        expect(res.headers).toMatchObject({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        })
    })
})
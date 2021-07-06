
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
})
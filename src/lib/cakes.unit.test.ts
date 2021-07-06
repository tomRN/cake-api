import { PassThrough } from "stream";
import { validate } from "./cakes";

describe("Cake validation", () => {
    it("Rejects a cake with no name", () => {
        let res = validate({ "test": "blah" });
        expect(res.isValid).toBeFalsy();
    })

    it("Returns at least one message when the cake is invalid", () => {
        let res = validate({ "test": "blah" });
        expect(res.messages?.length).toBeGreaterThanOrEqual(1);
        expect(typeof res.messages?.[0]).toBe('string');
    })

    it("Rejects a cake with no yum factor", () => {
        let res = validate({ "name": "Chocolate Cake" });
        expect(res.isValid).toBeFalsy();
    })

    it("Rejects a cake with a Yum factor too high", () => {
        let res = validate({ "name": "Chocolate Cake", yumFactor: 6 });
        expect(res.isValid).toBeFalsy();
    })

    it("Rejects a cake with a Yum factor too low", () => {
        let res = validate({ "name": "Chocolate Cake", yumFactor: 0 });
        expect(res.isValid).toBeFalsy();
    })

    it("Accepts a valid cake with minimal fields", () => {
        let res = validate({ "name": "Chocolate Cake", yumFactor: 5 });
        expect(res.isValid).toBeTruthy();
    })

    it("Returns the valid cake on the response", () => {
        const testCake = { "name": "Chocolate Cake", yumFactor: 5 }
        let res = validate(testCake);
        expect(res.validatedObject).toMatchObject(testCake);
    })

    it("Removes any additional fields from the cake", () => {
        const testCake = { "name": "Chocolate Cake", yumFactor: 5, maliciousField: "test" }
        let res = validate(testCake);
        //@ts-ignore
        expect(res.validatedObject?.maliciousField).toBeUndefined();
    })
})
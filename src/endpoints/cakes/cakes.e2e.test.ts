import { getEndpointURLForCurrentEnv } from "../../lib/self"
import axios from 'axios';

describe("Cake endpoints work e2e as expected", () => {

    const baseURL = getEndpointURLForCurrentEnv();

    it("Allows us to POST a new cake", async () => {
        let newCake = {
            name: "Coconut Cake",
            comment: "A delicious coconut based cake",
            imageURL: "https://www.cookingclassy.com/wp-content/uploads/2014/02/coconut-cake-5-500x500.jpg",
            yumFactor: 5
        }
        let res = await axios.post(`${baseURL}/cakes`, newCake);
        expect(res.status).toBe(200);
        expect(typeof res.data.ID).toBe('string');//The endpoint has given the cake an ID
        expect(res.data.ID.length).toBeGreaterThan(10);//Expect some sort of sensible length for the ID
        expect(res.data).toMatchObject(newCake);//Everything else should look the same.
    })

    it("400s on a POST of invalid cake", async () => {
        let newCake = {
            //name: "Coconut Cake",
            comment: "A delicious coconut based cake",
            imageURL: "https://www.cookingclassy.com/wp-content/uploads/2014/02/coconut-cake-5-500x500.jpg",
            yumFactor: 5
        }
        try {
            let res = await axios.post(`${baseURL}/cakes`, newCake);
            expect("No error").toBe("Should throw an error when trying to post an invalid cake")
        } catch (e) {
            if (e.matcherResult?.pass === false) throw e; //it's a jest error, rethrow.
            expect(e.response?.status).toEqual(400);
        }

    })

})
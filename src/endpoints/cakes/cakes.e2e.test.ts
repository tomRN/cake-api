import { getEndpointURLForCurrentEnv } from "../../lib/self"
import axios from 'axios';

describe("Cake endpoints work e2e as expected", () => {

    const baseURL = getEndpointURLForCurrentEnv();

    const coconutCake = {
        name: "Coconut Cake",
        comment: "A delicious coconut based cake",
        imageURL: "https://www.cookingclassy.com/wp-content/uploads/2014/02/coconut-cake-5-500x500.jpg",
        yumFactor: 5
    }
    const chocolateCake = {
        name: "Chocolate Cake",
        comment: "A delicious chocolate based cake",
        imageURL: "https://anerdcooks.com/wp-content/uploads/2014/11/double_chocolate_cake6-720x720.jpg",
        yumFactor: 3
    }

    const newCakeIDs: string[] = [];

    it("Allows us to POST a new cake", async () => {
        let newCake = coconutCake
        let res = await axios.post(`${baseURL}/cakes`, newCake);
        expect(res.status).toBe(200);
        expect(typeof res.data.ID).toBe('string');//The endpoint has given the cake an ID
        expect(res.data.ID.length).toBeGreaterThan(10);//Expect some sort of sensible length for the ID
        expect(res.data).toMatchObject(newCake);//Everything else should look the same.
        newCakeIDs.push(res.data.ID);
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

    });

    it("Allows us to DELETE our cake", async () => {
        let res = await axios.delete(`${baseURL}/cakes/${newCakeIDs[0]}`);
        expect(res.status).toBe(200);
    })

    it("GET all cakes doesnt contain the cake that we just deleted", async () => {
        let res = await axios.get(`${baseURL}/cakes`);
        expect(res.status).toBe(200);
        let chocolateCakeFromAPI = (res.data.cakes as any[]).find(x => x.ID === newCakeIDs[0]);
        //Confirm the response doesn't contain the cake.
        expect(chocolateCakeFromAPI).toBeFalsy();
        //For this excercise since we have a dev instance shared between manual testing and autoamted, we won't check the length of the array as a tester might have tested adding a few cakes etc..
    })

    it("Allows us to rePOST the cake we just deleted", async () => {
        let newCake = coconutCake
        let res = await axios.post(`${baseURL}/cakes`, newCake);
        expect(res.status).toBe(200);
        expect(typeof res.data.ID).toBe('string');//The endpoint has given the cake an ID
        expect(res.data.ID.length).toBeGreaterThan(10);//Expect some sort of sensible length for the ID
        expect(res.data).toMatchObject(newCake);//Everything else should look the same.
        newCakeIDs.push(res.data.ID);
    })

    it("Allows us to POST another new cake", async () => {
        let newCake = chocolateCake;
        let res = await axios.post(`${baseURL}/cakes`, newCake);
        expect(res.status).toBe(200);
        newCakeIDs.push(res.data.ID);
    })

    it("Allows us to GET the two cakes we just created", async () => {
        const idOfLastCakeWeCreated = newCakeIDs[newCakeIDs.length - 1];
        const idOfLastButOneCakeWeCreated = newCakeIDs[newCakeIDs.length - 2];

        let res = await axios.get(`${baseURL}/cakes`);
        expect(res.status).toBe(200);
        expect(res.data.cakes.length).toBeGreaterThanOrEqual(2);
        let chocolateCakeFromAPI = (res.data.cakes as any[]).find(x => x.ID === idOfLastCakeWeCreated);
        let coconutCakeFromAPI = (res.data.cakes as any[]).find(x => x.ID === idOfLastButOneCakeWeCreated);
        //Confirm the response contains both cakes
        expect(chocolateCakeFromAPI).toBeTruthy();
        expect(coconutCakeFromAPI).toBeTruthy();

        //Confirm they look as expected
        expect(chocolateCakeFromAPI).toMatchObject({
            ...chocolateCake,
            ID: idOfLastCakeWeCreated
        })
        expect(coconutCakeFromAPI).toMatchObject({
            ...coconutCake,
            ID: idOfLastButOneCakeWeCreated
        })

    })


    it("Allows us to Update the last cake we just created to change the comment", async () => {
        const coconutCakeID = newCakeIDs[newCakeIDs.length - 1];
        const updateBody = {
            ...coconutCake,
            comment: "This is an updated field"
        }
        const expectedCakeAfterUpdate = {
            ID: coconutCakeID,
            ...updateBody
        }
        let res = await axios.put(`${baseURL}/cakes/${coconutCakeID}`, {
            ...updateBody
        });
        expect(res.status).toBe(200);
        expect(res.data).toMatchObject(expectedCakeAfterUpdate);
    })

    it("Wont allow us to update a cake if we post up an invalid cake", async () => {
        const coconutCakeID = newCakeIDs[newCakeIDs.length - 1];
        const updateBody = {
            "comment": "We are trying to just update one field here"
        }
        try {
            let res = await axios.put(`${baseURL}/cakes/${coconutCakeID}`, {
                ...updateBody
            });
            expect("No error").toBe("Should throw an error when trying to put an invalid cake")
        } catch (e) {
            if (e.matcherResult?.pass === false) throw e; //it's a jest error, rethrow.
            expect(e.response?.status).toEqual(400);
        }
    })



    afterAll(async () => {
        //Tidy up any cakes we created.
        for (const cakeID of newCakeIDs) {
            try {
                await axios.delete(`${baseURL}/cakes/${cakeID}`);
            } catch (e) {
                //ignore any errors and just get through the list.
            }
        }
    })

})
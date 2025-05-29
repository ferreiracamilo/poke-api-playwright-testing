import { test, expect, request } from '@playwright/test';

test.describe('GET /berry/', () => {
    test.describe('GET /berry/ - Positive Cases', () => {

        test.describe('GET /berry/ by ID', () => {
            let response;
            let body;

            test.beforeEach(async ({ request }) => {
                    await test.step(`Perform GET request to /pokemon/pikachu`, async () => {
                            response = await request.get('https://pokeapi.co/api/v2/berry/1');
                    });

                    await test.step(`Transform the response into JSON`, async () => {
                            body = await response.json();
                    });
            });

            //END GET /berry/ - Positive Cases
        });


        test.describe('GET /berry/ by Name', () => {
            let response;
            let body;

            test.beforeEach(async ({ request }) => {
                    await test.step(`Perform GET request to /pokemon/pikachu`, async () => {
                            response = await request.get('https://pokeapi.co/api/v2/cheri/cheri');
                    });

                    await test.step(`Transform the response into JSON`, async () => {
                            body = await response.json();
                    });
            });

            //END GET /berry/ - Positive Cases
        });


        test.describe('GET LIST /berry/', () => {

            //END GET LIST /berry/
        });


        //END GET /berry/ - Positive Cases
    });

    test.describe('GET /pokemon/ - Negative Cases', () => {

        const non_existing_ids = [-1,0,1.3];
        for (const id of non_existing_ids) {
            test(`Verify status code for non existing berry by Id equal to ${id}`, async ({ request }) => {
                const response = await request.get(`https://pokeapi.co/api/v2/berry/${id}`);
                expect(response.status()).toBe(404);
                expect(response.statusText()).toBe("Not Found");
            });
        }

        const non_existing_names = ["@","Felipe","Agurumon"];
        for (const name of non_existing_names) {
            test(`Verify status code for non existing berry by Name equal to ${name}`, async ({ request }) => {
                const response = await request.get(`https://pokeapi.co/api/v2/berry/${name}`);
                expect(response.status()).toBe(404);
                expect(response.statusText()).toBe("Not Found");
            });
        }
        //END GET /pokemon/ - Negative Cases
    });

    //END GET /berry/
});
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

            test('Verify response code is 200', async () => {
                    await test.step(`[ASSERTION] Verify response status is code 200`, async () => {
                            expect(response.status()).toBe(200);
                    });
            });

            test('Check the Berry information is correct', async () => {
                    await test.step(`[ASSERTION] Verify pokemon name is Pikachu`, async () => {
                            expect(body.name).toBe('cheri');
                    });

                    await test.step(`[ASSERTION] Verify pokemon ID is 25`, async () => {
                            expect(body.id).toBe(1);
                    });
            });

            test('Check the Berry information includes all expected properties', async () => {
                    await test.step(`Verify unexpected properties are not present`, async () => {
                            expect(body).toHaveProperty('id');
                            expect(body).toHaveProperty('name');
                            expect(body).toHaveProperty('growth_time');
                            expect(body).toHaveProperty('max_harvest');
                            expect(body).toHaveProperty('natural_gift_power');
                            expect(body).toHaveProperty('size');
                            expect(body).toHaveProperty('smoothness');
                            expect(body).toHaveProperty('soil_dryness');
                            expect(body).toHaveProperty('firmness');
                            expect(body).toHaveProperty('flavors');
                            expect(body).toHaveProperty('item');
                            expect(body).toHaveProperty('natural_gift_type');
                    });
            });

            //END GET /berry/ by ID
        });


        test.describe('GET /berry/ by Name', () => {
            let response;
            let body;

            test.beforeEach(async ({ request }) => {
                    await test.step(`Perform GET request to /pokemon/pikachu`, async () => {
                            response = await request.get('https://pokeapi.co/api/v2/berry/cheri');
                    });

                    await test.step(`Transform the response into JSON`, async () => {
                            body = await response.json();
                    });
            });

            test('Verify response code is 200', async () => {
                    await test.step(`[ASSERTION] Verify response status is code 200`, async () => {
                            expect(response.status()).toBe(200);
                    });
            });

            test('Check the Berry information is correct', async () => {
                    await test.step(`[ASSERTION] Verify pokemon name is Pikachu`, async () => {
                            expect(body.name).toBe('cheri');
                    });

                    await test.step(`[ASSERTION] Verify pokemon ID is 25`, async () => {
                            expect(body.id).toBe(1);
                    });
            });

            test('Check the Berry information includes all expected properties', async () => {
                    await test.step(`Verify unexpected properties are not present`, async () => {
                            expect(body).toHaveProperty('id');
                            expect(body).toHaveProperty('name');
                            expect(body).toHaveProperty('growth_time');
                            expect(body).toHaveProperty('max_harvest');
                            expect(body).toHaveProperty('natural_gift_power');
                            expect(body).toHaveProperty('size');
                            expect(body).toHaveProperty('smoothness');
                            expect(body).toHaveProperty('soil_dryness');
                            expect(body).toHaveProperty('firmness');
                            expect(body).toHaveProperty('flavors');
                            expect(body).toHaveProperty('item');
                            expect(body).toHaveProperty('natural_gift_type');
                    });
            });

            //END GET /berry/ by Name
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
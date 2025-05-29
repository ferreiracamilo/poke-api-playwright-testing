import { test, expect, request } from '@playwright/test';

test.describe('GET /berry/', () => {
    test.describe('GET /berry/ - Positive Cases', () => {

        test.describe('GET /berry/ by ID', () => {
            let response;
            let body;

            test.beforeEach(async ({ request }) => {
                    await test.step(`Perform GET request to /berry/1`, async () => {
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
                    await test.step(`[ASSERTION] Verify berry name is cheri`, async () => {
                            expect(body.name).toBe('cheri');
                    });

                    await test.step(`[ASSERTION] Verify berry ID is 1`, async () => {
                            expect(body.id).toBe(1);
                    });
            });

            test('Check the Berry information includes all expected properties', async () => {
                    const unexpectedProperties = [
                        'id','name','growth_time','max_harvest','natural_gift_power',
                        'size','smoothness','soil_dryness','firmness','flavors','item','natural_gift_type'
                    ];

                    for (const prop of unexpectedProperties) {
                        await test.step(`Verify property ${prop} is not present at response`, async () => {
                            expect(response).not.toHaveProperty(prop);
                        });
                    }
            });

            //END GET /berry/ by ID
        });


        test.describe('GET /berry/ by Name', () => {
            let response;
            let body;

            test.beforeEach(async ({ request }) => {
                    await test.step(`Perform GET request to /berry/cheri`, async () => {
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
                    await test.step(`[ASSERTION] Verify berry name is cheri`, async () => {
                            expect(body.name).toBe('cheri');
                    });

                    await test.step(`[ASSERTION] Verify berry ID is 1`, async () => {
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
            test('Verify is possible to retrieve all berries', async ({ request }) => {
                let response;
                await test.step(`Perform GET request to /berry/`, async () => {
                        response = await request.get('https://pokeapi.co/api/v2/berry');
                });

                await test.step(`Verify status code equals to 200`, async () => {
                        expect(response.status()).toBe(200);
                });

                const body = await response.json();

                await test.step(`Verify response contains an array`, async () => {
                        expect(Array.isArray(body.results)).toBeTruthy();
                });

                await test.step(`Verify response contains more than one berry/resource`, async () => {
                        expect(body.results.length).toBeGreaterThan(1);
                });

                for (const berry of body.results) {
                        await test.step(`Verify expected properties are present`, async () => {
                                expect(berry).toHaveProperty('name');
                                expect(typeof berry.name).toBe('string');

                                expect(berry).toHaveProperty('url');
                                expect(typeof berry.url).toBe('string');
                        });
                }
            });

            //END GET LIST /berry/
        });


        //END GET /berry/ - Positive Cases
    });

    test.describe('GET /berry/ - Negative Cases', () => {

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
        //END GET /berry/ - Negative Cases
    });

    //END GET /berry/
});
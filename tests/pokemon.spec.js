import { test, expect, request } from '@playwright/test';

test.describe('GET /pokemon/', () => {
        test.describe('GET /pokemon/ - Negative Cases', () => {
                test('Verify status code for non existing pokemon', async ({ request }) => {
                        const response = await request.get('https://pokeapi.co/api/v2/pokemon/notapokemon');
                        expect(response.status()).toBe(404);
                        expect(response.statusText()).toBe("Not Found");
                });
        });

        test.describe('GET /pokemon/ - Positive Cases', () => {
                test.describe('GET /pokemon (list)', () => {
                        test('Verify is possible to retrieve all pokemons', async ({ request }) => {
                                let response;
                                await test.step(`Perform GET request to /pokemon/`, async () => {
                                        response = await request.get('https://pokeapi.co/api/v2/pokemon');
                                });

                                await test.step(`Verify status code equals to 200`, async () => {
                                        expect(response.status()).toBe(200);
                                });

                                const body = await response.json();

                                await test.step(`Verify response contains an array`, async () => {
                                        expect(Array.isArray(body.results)).toBeTruthy();
                                });

                                await test.step(`Verify response contains more than one pokemon/resource`, async () => {
                                        expect(body.results.length).toBeGreaterThan(1);
                                });

                                for (const pokemon of body.results) {
                                        await test.step(`Verify expected properties are present`, async () => {
                                                expect(pokemon).toHaveProperty('name');
                                                expect(typeof pokemon.name).toBe('string');

                                                expect(pokemon).toHaveProperty('url');
                                                expect(typeof pokemon.url).toBe('string');
                                        });

                                        await test.step(`Verify unexpected properties are not present`, async () => {
                                                //If you query only one pokemon more information would be available, hence I will assert this information is not available
                                                expect(pokemon).not.toHaveProperty('abilities');
                                                expect(pokemon).not.toHaveProperty('cries');
                                                expect(pokemon).not.toHaveProperty('forms');
                                                expect(pokemon).not.toHaveProperty('game_indices');
                                                expect(pokemon).not.toHaveProperty('height');
                                                expect(pokemon).not.toHaveProperty('held_items');
                                                expect(pokemon).not.toHaveProperty('is_default');
                                                expect(pokemon).not.toHaveProperty('location_area_encounters');
                                                expect(pokemon).not.toHaveProperty('moves');
                                                expect(pokemon).not.toHaveProperty('order');
                                                expect(pokemon).not.toHaveProperty('past_abilities');
                                                expect(pokemon).not.toHaveProperty('past_types');
                                                expect(pokemon).not.toHaveProperty('species');
                                                expect(pokemon).not.toHaveProperty('sprites');
                                                expect(pokemon).not.toHaveProperty('stats');
                                                expect(pokemon).not.toHaveProperty('types');
                                        });
                                }
                        });
                });

                test.describe('GET /pokemon/pikachu', () => {
                        let response;
                        let body;

                        test.beforeEach(async ({ request }) => {
                                await test.step(`Perform GET request to /pokemon/pikachu`, async () => {
                                        response = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');
                                });

                                await test.step(`Transform the response into JSON`, async () => {
                                        body = await response.json();
                                });
                        });

                        test('Verify that the response is 200', async () => {
                                //Do not use request because it is already done in beforeEach
                                await test.step(`[ASSERTION] Verify response status is code 200`, async () => {
                                        expect(response.status()).toBe(200);
                                });
                        });

                        test('Check the Pokemon information is correct', async () => {
                                //Do not use request because it is already done in beforeEach hook
                                await test.step(`[ASSERTION] Verify pokemon name is Pikachu`, async () => {
                                        expect(body.name).toBe('pikachu');
                                });

                                await test.step(`[ASSERTION] Verify pokemon ID is 25`, async () => {
                                        expect(body.id).toBe(25);
                                });

                                await test.step(`[ASSERTION] Verify pokemon type is Electric`, async () => {
                                        expect(body.types[0].type.name).toBe('electric');
                                });
                        });

                        test('Check the Pokemon information includes all expected properties', async () => {
                                //Do not use request because it is already done in beforeEach hook
                                await test.step(`Verify unexpected properties are not present`, async () => {
                                        expect(body).toHaveProperty('abilities');
                                        expect(body).toHaveProperty('cries');
                                        expect(body).toHaveProperty('forms');
                                        expect(body).toHaveProperty('game_indices');
                                        expect(body).toHaveProperty('height');
                                        expect(body).toHaveProperty('held_items');
                                        expect(body).toHaveProperty('is_default');
                                        expect(body).toHaveProperty('location_area_encounters');
                                        expect(body).toHaveProperty('moves');
                                        expect(body).toHaveProperty('order');
                                        expect(body).toHaveProperty('past_abilities');
                                        expect(body).toHaveProperty('past_types');
                                        expect(body).toHaveProperty('species');
                                        expect(body).toHaveProperty('sprites');
                                        expect(body).toHaveProperty('stats');
                                        expect(body).toHaveProperty('types');
                                });
                        });
                });
        });
});
import { test, expect, request } from '@playwright/test';

test.describe('GET /pokemon/', () => {
        test.describe('GET /pokemon/ - Negative Cases', () => {
                test('Verify status code for non existing pokemon', async ({ request }) => {
                        const response = await request.get('/pokemon/notapokemon');
                        expect(response.status()).toBe(404);
                        expect(response.statusText()).toBe("Not Found");
                });
        });

        test.describe('GET /pokemon/ - Positive Cases', () => {
                test.describe('GET /pokemon (list)', () => {
                        test('Verify is possible to retrieve all pokemons', async ({ request }) => {
                                let response;
                                await test.step(`Perform GET request to /pokemon/`, async () => {
                                        response = await request.get(`${process.env.BASE_URL}/pokemon`);
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
                                                const unexpectedProperties = [
                                                        'abilities', 'cries', 'forms', 'game_indices',
                                                        'height', 'held_items', 'is_default',
                                                        'location_area_encounters', 'moves', 'order',
                                                        'past_abilities', 'past_types', 'species',
                                                        'sprites', 'stats', 'types'
                                                ];

                                                for (const prop of unexpectedProperties) {
                                                        expect(pokemon).not.toHaveProperty(prop);
                                                }
                                        });
                                }
                        });
                });

                test.describe('GET /pokemon/pikachu', () => {
                        let response;
                        let body;

                        test.beforeEach(async ({ request }) => {
                                await test.step(`Perform GET request to /pokemon/pikachu`, async () => {
                                        response = await request.get(`${process.env.BASE_URL}/pokemon/pikachu`);
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

                                        const expectedProperties = [
                                                'abilities', 'cries', 'forms', 'game_indices',
                                                'height', 'held_items', 'is_default',
                                                'location_area_encounters', 'moves', 'order',
                                                'past_abilities', 'past_types', 'species',
                                                'sprites', 'stats', 'types'
                                        ];

                                        for (const prop of expectedProperties) {
                                                expect(body).toHaveProperty(prop);
                                        }
                                });
                        });
                });
        });
});
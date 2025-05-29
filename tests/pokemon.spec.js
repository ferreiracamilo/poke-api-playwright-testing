import { test, expect, request } from '@playwright/test';

test('Verify Pokemon GET methods return the expected one', async ({ request }) => {
        let response;

        await test.step(`Perform a GET to retrieve pikachu resource`, async () => {
                response = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');
        });

        await test.step(`[ASSERTION] Verify response is SUCCESS 2XX`, async () => {
                expect(response.ok()).toBeTruthy();
        });

        await test.step(`[ASSERTION] Verify response code equals to 200`, async () => {
                expect(response.status()).toBe(200);
        });

        // Convert the response into JSON
        const body = await response.json();

        await test.step(`[ASSERTION] Verify pokemon name is Pikachu`, async () => {
                expect(body.name).toBe('pikachu');
        });

        await test.step(`[ASSERTION] Verify pokemon ID equals to 25`, async () => {
                expect(body.id).toBe(25);
        });

        await test.step(`[ASSERTION] Verify pokemon type is electric`, async () => {
                expect(body.types[0].type.name).toBe('electric');
        });
});

import { test, expect, request } from '@playwright/test';

test('Verify Pokemon GET methods return the expected one', async ({ request }) => {
    let response;

    await test.step(`Perform a GET to retrieve pikachu resource`, async () => {
            response = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');
    });

    await test.step(`Perform a GET to retrieve pikachu resource`, async () => {
            response = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.name).toBe('pikachu');
    expect(body.id).toBe(25);
    expect(body.types[0].type.name).toBe('electric');
});

import { test, expect } from '@playwright/test';

test('GET todos', async ({ request }) => {
    const id = 2;
    const response = await request.fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const data = await response.json();
    expect(response.status()).toEqual(200);
    expect(data.id).toEqual(id);
});

test('POST post', async ({ request }) => {
    const response = await request.fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: 'POST',
        data: {
            title: 'foo',
            body: 'bar',
            userId: 1,
        }
    });
    const data = await response.json();
    expect(response.status()).toEqual(201);
    expect(data.id).toEqual(101);
    expect(data.title).toEqual('foo');
    expect(data.body).toEqual('bar');

});

test('GraphQL', async ({ request }) => {
    const query = `
        query {
            character(id: 1) {
                name,
                status
            }
        }
    `;
    const response = await request.fetch('https://rickandmortyapi.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            query
        }
    });
    const data = await response.json();
    expect(data.data.character.name).toBeDefined();
    expect(data.data.character.status).toBeDefined();
});
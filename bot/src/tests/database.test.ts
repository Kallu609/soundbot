import { knex } from '../database';

describe('Database tests', () => {
  it('connects to database', async () => {
    await knex.raw('select 1+1 as result');
    expect(true).toBe(true);
  });
});

afterAll(() => {
  knex.destroy();
});

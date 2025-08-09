import request from 'supertest';
import app from '../index.js';

describe('Extras API', () => {
  it('should return 200 on GET /extras', async () => {
    const res = await request(app).get('/extras');
    expect(res.statusCode).toBe(200);
  });

  it('should create item on POST /extras', async () => {
    const payload = { name: 'Sample extras' };
    const res = await request(app).post('/extras').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});

import request from 'supertest';
import app from '../index.js';

describe('Formquestions API', () => {
  it('should return 200 on GET /formquestions', async () => {
    const res = await request(app).get('/formquestions');
    expect(res.statusCode).toBe(200);
  });

  it('should create item on POST /formquestions', async () => {
    const payload = { name: 'Sample formquestions' };
    const res = await request(app).post('/formquestions').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});

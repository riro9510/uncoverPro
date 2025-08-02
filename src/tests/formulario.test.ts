import request from 'supertest';
import app from '../index.js';

describe('Formulario API', () => {
  it('should return 200 on GET /formulario', async () => {
    const res = await request(app).get('/formulario');
    expect(res.statusCode).toBe(200);
  });

  it('should create item on POST /formulario', async () => {
    const payload = { name: 'Sample formulario' };
    const res = await request(app).post('/formulario').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});

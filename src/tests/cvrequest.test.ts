import request from 'supertest';
    import app from '../index.js';
    
    describe('Cvrequest API', () => {
      it('should return 200 on GET /cvrequest', async () => {
        const res = await request(app).get('/cvrequest');
        expect(res.statusCode).toBe(200);
      });
    
      it('should create item on POST /cvrequest', async () => {
        const payload = { name: 'Sample cvrequest' };
        const res = await request(app).post('/cvrequest').send(payload);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
      });
    });
    
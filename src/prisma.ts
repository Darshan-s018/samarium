import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { serve } from '@hono/node-server';

const prisma = new PrismaClient();
const app = new Hono();

// Get all cities
app.get('/cities', async (c) => {
  const cities = await prisma.city.findMany();
  return c.json(cities);
});

// Get a city by ID
app.get('/cities/:id', async (c) => {
  const id = c.req.param('id');
  const city = await prisma.city.findUnique({ where: { id } });
  if (!city) return c.json({ error: 'City not found' }, 404);
  return c.json(city);
});

// Create a new city
app.post('/cities', async (c) => {
  const body = await c.req.json();
  const city = await prisma.city.create({ data: body });
  return c.json(city, 201);
});

// Update a city by ID
app.put('/cities/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  try {
    const city = await prisma.city.update({ where: { id }, data: body });
    return c.json(city);
  } catch (error) {
    return c.json({ error: 'City not found or update failed' }, 404);
  }
});

// Partially update a city by ID
app.patch('/cities/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  try {
    const city = await prisma.city.update({ where: { id }, data: body });
    return c.json(city);
  } catch (error) {
    return c.json({ error: 'City not found or update failed' }, 404);
  }
});

// Delete a city by ID
app.delete('/cities/:id', async (c) => {
  const id = c.req.param('id');
  try {
    await prisma.city.delete({ where: { id } });
    return c.json({ message: 'City deleted successfully' });
  } catch (error) {
    return c.json({ error: 'City not found or deletion failed' }, 404);
  }
});

serve({ fetch: app.fetch, port: 3000 });

export default app;

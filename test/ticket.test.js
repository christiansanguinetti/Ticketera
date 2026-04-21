import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import Ticket from "../Models/Ticket.js";
import User from "../Models/User.js";

describe("Tickets API", () => { 
  let token;

  beforeAll(async () => {
    await User.deleteMany({});
    await Ticket.deleteMany({});

    const response = await request(app)
      .post('/api/users/signup')
      .send({
        name: "Test User",
        email: `test${Date.now()}@email.com`, // 🔥 evita duplicados
        password: "12345678",
      });

    token = response.body.token;
  });

  beforeEach(async () => {
    await Ticket.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("create a new ticket", async () => { 
    const response = await request(app)
      .post('/api/tickets')
      .set('Authorization', `Bearer ${token}`) // 🔥 header correcto
      .send({
        title: 'Test Ticket',
        description: "Test Ticket Description",
        priority: "high", // 🔥 corregido typo
        status: "open"
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('ticket');
    expect(response.body.ticket).toHaveProperty('title', 'Test Ticket');
    expect(response.body.ticket).not.toHaveProperty("_id")
  });

  test("Get all Tickets", async () =>{
    const ticket1 = await Ticket.create({
        title: "ticket 1",
        description: "ticket 1 description",
        prority: 'medium',
        status: 'in-progress',
        user: ' test-user-id'
    })
    await ticket1.save()
     const ticket2 = await Ticket.create({
        title: "ticket 2",
        description: "ticket 2 description",
        prority: 'medium',
        status: 'in-progress',
        user: ' test-user-id'
    })
    await ticket2.save()

    const response = await request(app).get('/api/tickets');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("result");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("currentPage")

    expect(response.body.total).toBe(2)
    expect(response.body.currentPage).toBe(1)
   
    expect(response.body.result[0]).toHaveProperty("title", "ticket 1")
  })
});
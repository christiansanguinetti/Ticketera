import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import User from "../Models/User.js";

describe("Users Api", () => {

  beforeAll(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Create a new user", async () => {
    const response = await request(app)
      .post("/api/users/signup") // 👈 ojo acá
      .send({
        name: "Test User",
        email: "test@email.com",
        password: "12345678",
        role: "user",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
  });

});
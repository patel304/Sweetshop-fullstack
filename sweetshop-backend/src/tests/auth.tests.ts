/**
 * Auth API Tests
 * ------------------------------------------------------
 * Covers user registration and login functionality.
 * Ensures JWT generation and validation behavior works.
 */

import request from "supertest";
import mongoose from "mongoose";
import app from "../app";

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(process.env.MONGO_URI as string);
});

afterAll(async () => {
  // Cleanup after test suite finishes
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Auth API", () => {
  
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Dileep",
        email: "dileep@test.com",
        password: "password123",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.email).toBe("dileep@test.com");
  });

  it("should login and return JWT token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "dileep@test.com",
        password: "password123",
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
  });

  it("should reject invalid password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "dileep@test.com",
        password: "wrongpass",
      });

    expect(res.status).toBe(401);
  });
});

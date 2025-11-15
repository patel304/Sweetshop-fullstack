/**
 * Sweets API Tests
 * ------------------------------------------------------
 * Covers CRUD operations and search functionality
 * for the sweets resource.
 */

import request from "supertest";
import mongoose from "mongoose";
import app from "../app";

beforeAll(async () => {
  // Connect to isolated test database
  await mongoose.connect(process.env.MONGO_URI_TEST as string);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Sweets API", () => {
  let token = "";

  beforeAll(async () => {
    // Create admin user
    await request(app).post("/api/auth/register").send({
      name: "Admin",
      email: "admin@test.com",
      password: "password123",
    });

    // Promote user to admin
    if (mongoose.connection.db) {
      await mongoose.connection.db.collection("users").updateOne(
        { email: "admin@test.com" },
        { $set: { role: "admin" } }
      );
    }

    // Login to get token
    const login = await request(app).post("/api/auth/login").send({
      email: "admin@test.com",
      password: "password123",
    });

    token = login.body.token;
  });

  it("should add a new sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Gulab Jamun",
        category: "Indian",
        price: 15,
        quantity: 50,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Gulab Jamun");
  });

  it("should fetch all sweets", async () => {
    const res = await request(app).get("/api/sweets");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should search sweets by name", async () => {
    const res = await request(app).get("/api/sweets/search?name=Gulab");

    expect(res.status).toBe(200);
    expect(res.body[0].name).toContain("Gulab");
  });

  it("should update a sweet", async () => {
    const list = await request(app).get("/api/sweets");
    const id = list.body[0]._id;

    const res = await request(app)
      .put(`/api/sweets/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ price: 20 });

    expect(res.status).toBe(200);
    expect(res.body.price).toBe(20);
  });

  it("should delete a sweet", async () => {
    const list = await request(app).get("/api/sweets");
    const id = list.body[0]._id;

    const res = await request(app)
      .delete(`/api/sweets/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});

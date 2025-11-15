/**
 * Inventory API Tests
 * ------------------------------------------------------
 * Covers purchasing and restocking sweets.
 * Ensures quantity updates behave correctly.
 */

import request from "supertest";
import mongoose from "mongoose";
import app from "../app";

beforeAll(async () => {
  // Connect to test DB
  await mongoose.connect(process.env.MONGO_URI_TEST as string);

  // Register normal user
  await request(app).post("/api/auth/register").send({
    name: "User1",
    email: "user1@test.com",
    password: "password123",
  });

  const loginUser = await request(app).post("/api/auth/login").send({
    email: "user1@test.com",
    password: "password123",
  });

  global.userToken = loginUser.body.token;

  // Register admin
  await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "admin2@test.com",
    password: "password123",
  });

  // Promote to admin
  if (mongoose.connection.db) {
    await mongoose.connection.db.collection("users").updateOne(
      { email: "admin2@test.com" },
      { $set: { role: "admin" } }
    );
  }

  const loginAdmin = await request(app).post("/api/auth/login").send({
    email: "admin2@test.com",
    password: "password123",
  });

  global.adminToken = loginAdmin.body.token;

  // Create a sweet for inventory tests
  const res = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${global.adminToken}`)
    .send({
      name: "Rasgulla",
      category: "Bengali",
      price: 20,
      quantity: 10,
    });

  global.sweetId = res.body._id;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe("Inventory Tests", () => {
  it("should purchase a sweet (quantity decreases)", async () => {
    const res = await request(app)
      .post(`/api/sweets/${global.sweetId}/purchase`)
      .set("Authorization", `Bearer ${global.userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(9); // 10 → 9
  });

  it("should not purchase if quantity is zero", async () => {
    // Deplete stock to zero
    for (let i = 0; i < 9; i++) {
      await request(app)
        .post(`/api/sweets/${global.sweetId}/purchase`)
        .set("Authorization", `Bearer ${global.userToken}`);
    }

    const res = await request(app)
      .post(`/api/sweets/${global.sweetId}/purchase`)
      .set("Authorization", `Bearer ${global.userToken}`);

    expect(res.status).toBe(400);
  });

  it("should restock sweet (admin only)", async () => {
    const res = await request(app)
      .post(`/api/sweets/${global.sweetId}/restock`)
      .set("Authorization", `Bearer ${global.adminToken}`)
      .send({ amount: 5 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBeGreaterThan(0);
  });
});

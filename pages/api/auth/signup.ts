// pages/api/auth/signup.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req: { method: string; body: { email: any; password: any; name: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; user?: { id: number; email: string; password: string; name: string | null; createdAt: Date; }; }): void; new(): any; }; }; }) {
  if (req.method === "POST") {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return res.status(201).json({ user: newUser });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

"use server"
import bcrypt from "bcrypt";

import {z} from "zod";
import {RegisterSchema} from "@/schemas";
import db from "@/prisma/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    console.log(values);

    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid fields"}
    }

    const {name, email, password} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.findUnique({
        where: {
            email,
        }
    })

    if (existingUser) {
        return {error: "Email already in use!"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })


    //Send verification token email.

    return {success: "User created!"}
}

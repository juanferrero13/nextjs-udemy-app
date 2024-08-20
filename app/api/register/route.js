import { NextResponse } from "next/server"
import dbConnect from "@/utils/dbConnect"
import User from "@/models/user"
import bcrypt from "bcrypt"

export async function POST(req) {
    await dbConnect()

    const body = await req.json()
    const { name, email, password } = body

    try {
        await new User({
            name,
            email,
            password: await bcrypt.hash(password, 10),
        }).save()
        return NextResponse.json({ success: "Registro exitoso" })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ err: err.message }, { status: 500 })
    }
}

// try usando postman
// enviar nombre, email, contraseña en formato json en re.body
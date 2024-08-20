import User from "@/models/user"
import dbConnect from "@/utils/dbConnect"
import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                dbConnect()
                const { email, password } = credentials
                const user = await User.findOne({ email })

                if (!user) {
                    throw new Error("Correo electrónico o contraseña inválidos")
                }

                const isMatchedPassword = await bcrypt.compare(password, user.password)
                if (!isMatchedPassword) {
                    throw new Error("Correo electrónico o contraseña inválidos")
                }

                return user
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}
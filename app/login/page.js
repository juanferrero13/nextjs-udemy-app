"use client"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/"

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            })

            if (result?.error) {
                toast.error(result?.error)
                setLoading(false)
            } else {
                toast.success("Inicio de sesión exitoso")
                router.push(callbackUrl)

            }

        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    return (
        <main>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100">
                    <div className="col-lg-5 shadow bg-light p-5">
                        <h2 className="mb-4 text-center">Iniciar sesión</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control mb-4"
                                placeholder="Ingresá tu email"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control mb-4"
                                placeholder="Ingresá tu contraseña"
                            />
                            <button className="btn btn-primary btn-raised"
                                disabled={loading || !email || !password}
                            >
                                {loading ? 'Espere por favor...' : 'Enviar'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
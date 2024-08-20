"use client"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await fetch(`${process.env.API}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                })
            })

            const data = response.json()
            if (!response.ok) {
                toast.error("El nombre o el email no pueden tener más de 30 caracteres")
                setLoading(false)
            } else {
                toast.success("Cuenta creada exitosamente")
                router.push("/login")
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
                        <h2 className="mb-4 text-center">Crear cuenta</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control mb-4"
                                placeholder="Ingresá tu nombre"
                            />
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
                                disabled={loading || !name || !email || !password}
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
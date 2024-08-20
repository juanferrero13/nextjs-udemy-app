"use client"
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { RiNextjsFill } from "react-icons/ri"
import "../app/globals.css"

export default function TopNav() {
    const { data, status } = useSession()
    // console.log(data, status)

    return (
        <nav className='nav shadow p-2 justify-content-around mb-3'>
            <div className='d-flex justify-content-center align-items-center p-0'>
                <Link href="/" className='nav-link p-0'>NEXTJS</Link>
                <RiNextjsFill className='text-dark custom-font' />
            </div>

            {status === "authenticated" ? (
                <>
                    <Link href="/dashboard/user" className='nav-link'>
                        {data?.user?.name}
                    </Link>
                    <a
                        className='nav-link pointer'
                        onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                        Cerrar sesión</a>
                </>
            ) : status === 'loading' ? (
                <a className='nav-link text-danger'>Loading</a>
            ) : (
                <div className='d-flex'>
                    <Link href="/login" className='nav-link'>
                        Iniciar sesión
                    </Link>
                    <Link href="/register" className='nav-link'>
                        Crear cuenta
                    </Link>
                </div>
            )}
        </nav>
    )
}
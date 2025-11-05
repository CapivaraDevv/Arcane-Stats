import React from "react";

const Header = () => {
    return (
        <>
            <header className="w-full px-8 py-6 bg-white border-b border-zinc-200 flex items-center justify-between">
                <h1 className="space-grotesk-title text-2xl font-semibold text-zinc-800">Bem-vindo à Plataforma de Análise eSports</h1>
                <img src="/LogoBranco.png" alt="Logo" className="w-20" />
            </header>
        </> 
    )
}

export default Header
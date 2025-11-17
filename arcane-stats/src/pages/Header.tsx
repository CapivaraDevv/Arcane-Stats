const Header = () => {
    return (
        <>
            <header className="w-full px-8 py-6 bg-[#1D2D50] border-b border-white/5 flex items-center justify-between shadow-lg">
                <h1 className="space-grotesk-titletext-2xl text-4xl font-semibold text-[#E0E0E0]">Bem-vindo à Plataforma de Análise eSports</h1>
                <div className="px-6 bg-white flex items-center justify-center rounded-3xl">
                    <img src="/LogoBranco.png" alt="Logo" className="w-20" />
                </div>
            </header>
        </>
    )
}

export default Header
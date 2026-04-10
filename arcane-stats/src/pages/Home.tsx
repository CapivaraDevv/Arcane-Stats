import { motion } from "framer-motion"
import DarkVeil from "../components/DarkVeilBackground"
import { Link } from "react-router-dom"

export default function Home() {
    const demoVideoUrl = ""
    const demoThumbnail = "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80"

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#020617] text-white">
            <DarkVeil />

            {/* HERO */}
            <section className="relative z-10 px-6 pt-16 md:pt-20">
                <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
                    <div className="text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="space-grotesk-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                        >
                            Entenda partidas de LoL com dados claros, mesmo sem ser especialista.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-5 text-slate-300 max-w-xl text-base md:text-lg"
                        >
                            O Arcane Stats traduz números complexos em dicas simples para você saber onde errou, o que melhorar e como evoluir já na próxima partida.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 flex flex-wrap gap-4"
                        >
                            <Link
                                to="/login"
                                className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-xl font-semibold shadow-lg transition"
                            >
                                Ver demonstração
                            </Link>

                            <Link
                                to="/register"
                                className="border border-slate-600 px-6 py-3 rounded-xl hover:bg-slate-800 transition font-semibold"
                            >
                                Explorar funcionalidades
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.25 }}
                        className="rounded-3xl border border-slate-700 bg-slate-900/70 p-4 backdrop-blur"
                    >
                        {demoVideoUrl ? (
                            <div className="relative overflow-hidden rounded-2xl">
                                <video
                                    controls
                                    poster={demoThumbnail}
                                    className="aspect-video w-full rounded-2xl object-cover"
                                >
                                    <source src={demoVideoUrl} type="video/mp4" />
                                </video>
                            </div>
                        ) : (
                            <div className="relative aspect-video overflow-hidden rounded-2xl">
                                <img
                                    src={demoThumbnail}
                                    alt="Thumbnail da demonstração do Arcane Stats"
                                    className="h-full w-full object-cover opacity-60"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#020617]/60">
                                    <button
                                        type="button"
                                        className="h-16 w-16 rounded-full border border-white/60 bg-white/10 text-2xl text-white"
                                        aria-label="Play da demonstração (em breve)"
                                    >
                                        ▶
                                    </button>
                                    <p className="rounded-full border border-slate-500 bg-slate-950/80 px-4 py-2 text-sm font-medium text-slate-100">
                                        Demonstração em breve
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            
            <section className="relative z-10 mt-20 flex justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-5xl bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-slate-800"
                >
                    <div className="grid md:grid-cols-3 gap-4">
                        
                        {/* CARD 1 */}
                        <div className="bg-slate-800 p-4 rounded-xl">
                            <p className="text-sm text-slate-400">Winrate</p>
                            <h3 className="text-2xl font-bold text-[#00B4D8]">+12%</h3>
                        </div>

                        {/* CARD 2 */}
                        <div className="bg-slate-800 p-4 rounded-xl">
                            <p className="text-sm text-slate-400">Farm médio</p>
                            <h3 className="text-2xl font-bold text-[#00B4D8]">7.8 CS/min</h3>
                        </div>

                        {/* CARD 3 */}
                        <div className="bg-slate-800 p-4 rounded-xl">
                            <p className="text-sm text-slate-400">Erros críticos</p>
                            <h3 className="text-2xl font-bold text-[#00B4D8]">3 detectados</h3>
                        </div>
                    </div>

                    {/* INSIGHT FAKE */}
                    <div className="mt-6 bg-black p-4 rounded-xl border border-slate-800">
                        <p className="text-[#00B4D8] text-sm">Insight da IA</p>
                        <p className="text-slate-300 text-sm">
                            Você perdeu 3 waves por rotação errada aos 12 minutos.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* FEATURES COM SCROLL */}
            {/* <section className="relative z-10 mt-20 px-6 flex justify-center">
                <div className="w-full max-w-4xl h-[60vh] rounded-3xl overflow-hidden">
                    <ScrollStack className="h-full">

                        <ScrollStackItem itemClassName="bg-slate-900 text-white">
                            <Feature
                                title="Análise Inteligente"
                                desc="Nossa IA identifica padrões e erros invisíveis durante a partida."
                            />
                        </ScrollStackItem>

                        <ScrollStackItem itemClassName="bg-slate-900 text-white">
                            <Feature
                                title="Decisão em Tempo Real"
                                desc="Receba recomendações de macro, builds e rotações."
                            />
                        </ScrollStackItem>

                        <ScrollStackItem itemClassName="bg-slate-900 text-white">
                            <Feature
                                title="Comparação de Jogadores"
                                desc="Veja onde você está abaixo dos melhores players."
                            />
                        </ScrollStackItem>

                        <ScrollStackItem itemClassName="bg-slate-900 text-white">
                            <Feature
                                title="Evolução Contínua"
                                desc="Acompanhe sua melhora partida após partida."
                            />
                        </ScrollStackItem>

                    </ScrollStack>
                </div>
            </section> */}

            {/* CTA FINAL */}
            {/* <section className="relative z-10 mt-20 mb-20 flex flex-col items-center text-center px-6 gap-6">
                <h2 className="text-3xl font-bold">
                    Você joga ou você evolui?
                </h2>

                {/* <button className="bg-indigo-500 px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:bg-indigo-600 transition">
                    Começar minha evolução
                </button> 
            </section> */}
        </div>
    )
}

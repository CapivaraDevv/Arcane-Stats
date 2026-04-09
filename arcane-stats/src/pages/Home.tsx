import { motion } from "framer-motion"
import DarkVeil from "../components/DarkVeilBackground"
import { Link } from 'react-router-dom';
import ScrollStack, { ScrollStackItem } from "../components/ScrollStack"

export default function Home() {

    

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#020617] text-white">
            <DarkVeil />

            {/* HERO */}
            <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 gap-6">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="space-grotesk-title text-4xl md:text-6xl font-bold leading-tight"
                >
                    Pare de jogar no automático.
                    <br />
                    <span className="text-[#0077B6]">
                        Comece a jogar com dados.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-slate-400 max-w-xl"
                >
                    O Arcane Stats analisa suas partidas, identifica erros e te mostra exatamente o que melhorar.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-4"
                >
                    <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-xl font-semibold shadow-lg transition">
                        <Link to="/login">Começar agora</Link>
                    </button>

                    {/* <button className="border border-slate-700 px-6 py-3 rounded-xl hover:bg-slate-800 transition">
                        Ver demo
                    </button> */}
                </motion.div>
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

/* COMPONENTE DE FEATURE */
function Feature({ title, desc }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full flex flex-col justify-center gap-4 p-6"
        >
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-slate-400">{desc}</p>
        </motion.div>
    )
}
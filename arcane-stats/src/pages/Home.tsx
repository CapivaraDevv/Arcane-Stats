import { motion } from "framer-motion"
import DarkVeil from "../components/DarkVeilBackground"
import { Link } from "react-router-dom"
import { useState } from "react"
import ScrollReveal from "../components/ScrollReveal"

export default function Home() {
    const demoVideoUrl = "https://www.youtube.com/watch?v=mDYqT0_9VR4"
    const demoThumbnail = "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80"
    const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)
    const youtubeVideoId = demoVideoUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1]
    const demoEmbedUrl = youtubeVideoId
        ? `https://www.youtube.com/embed/${youtubeVideoId}`
        : null

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
    };

    const upItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

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
                                className="bg-[#0077B6] hover:bg-[#00B4D8] px-6 py-3 rounded-xl font-semibold shadow-lg transition"
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
                        {demoEmbedUrl ? (
                            <div className="relative overflow-hidden rounded-2xl">
                                <iframe
                                    src={demoEmbedUrl}
                                    title="Demonstração do Arcane Stats"
                                    className="aspect-video w-full rounded-2xl"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
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

            <section className="relative z-10 mt-12 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mx-auto w-full max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur md:p-8"
                >
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-[#00B4D8]">
                                Novo em LoL/eSports?
                            </p>
                            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                                Um guia rápido para entender o básico sem complicação.
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsLearnMoreOpen(true)}
                            className="w-fit rounded-xl border border-slate-600 px-4 py-2 text-sm font-semibold transition hover:bg-slate-800"
                        >
                            Saiba mais
                        </button>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <article className="rounded-xl border border-slate-800 bg-slate-800/70 p-4">
                            <h3 className="text-lg font-semibold text-[#00B4D8]">O que é LoL?</h3>
                            <p className="mt-2 text-sm text-slate-300">
                                League of Legends é um jogo de equipe 5 contra 5. Cada pessoa escolhe um personagem e trabalha com o time para chegar até a base inimiga.
                            </p>
                        </article>

                        <article className="rounded-xl border border-slate-800 bg-slate-800/70 p-4">
                            <h3 className="text-lg font-semibold text-[#00B4D8]">O que é uma partida competitiva?</h3>
                            <p className="mt-2 text-sm text-slate-300">
                                É uma partida organizada entre times treinados, com estratégia e funções bem definidas. Vence quem toma melhores decisões ao longo do jogo.
                            </p>
                        </article>

                        <article className="rounded-xl border border-slate-800 bg-slate-800/70 p-4">
                            <h3 className="text-lg font-semibold text-[#00B4D8]">O que é eSports e por que existem estatísticas?</h3>
                            <p className="mt-2 text-sm text-slate-300">
                                eSports são campeonatos de jogos. As estatísticas ajudam a mostrar o que funcionou ou não, para entender desempenho de forma justa e melhorar mais rápido.
                            </p>
                        </article>
                    </div>

                    <div className="mt-6 rounded-xl border border-slate-800 bg-black/40 p-4">
                        <p className="text-sm font-semibold text-slate-100">Microglossário</p>
                        <div className="mt-3 grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                            <p><span className="font-semibold text-slate-100">Campeão:</span> personagem escolhido por cada jogador.</p>
                            <p><span className="font-semibold text-slate-100">Rota:</span> caminho principal do mapa por onde o time avança.</p>
                            <p><span className="font-semibold text-slate-100">Objetivo:</span> alvo importante como torres, dragão e barão.</p>
                            <p><span className="font-semibold text-slate-100">Draft:</span> momento de escolher e bloquear campeões antes da partida.</p>
                            <p><span className="font-semibold text-slate-100">Farm:</span> ouro e experiência obtidos ao eliminar tropas e monstros.</p>
                            <p><span className="font-semibold text-slate-100">Gank:</span> ataque surpresa para ajudar um aliado em outra rota.</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            <ScrollReveal>
                <section className="relative z-10 mt-12 px-6">
                    <div className="mx-auto w-full max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur md:p-8">
                        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                            <div className="space-y-5">
                                <ScrollReveal preset="right">
                                    <article
                                        className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5"
                                    >
                                        <h2 className="text-xl font-bold text-[#00B4D8]">Para quem é</h2>
                                        <p className="mt-2 text-sm text-slate-300 md:text-base">
                                            Feito para fãs que querem entender o jogo além do placar, jogadores que buscam evolução prática,
                                            analistas que precisam de sinais rápidos e curiosos que querem aprender eSports sem jargão.
                                        </p>
                                    </article>
                                </ScrollReveal>

                                <ScrollReveal preset="right">
                                    <article className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5">
                                        <h2 className="text-xl font-bold text-[#00B4D8]">Por que criamos</h2>
                                        <p className="mt-2 text-sm text-slate-300 md:text-base">
                                            Nossa missão é democratizar análise competitiva em LoL: transformar dados difíceis em decisões
                                            acionáveis para qualquer pessoa melhorar, acompanhar e discutir partidas com confiança.
                                        </p>
                                    </article>
                                </ScrollReveal>
                            </div>

                            <ScrollReveal preset="left" stagger={0.12}>
                                <aside className="rounded-2xl border border-slate-800 bg-black/40 p-5">
                                    <h3 className="text-lg font-bold text-slate-100">Métricas de confiança</h3>
                                    <ul className="mt-4 space-y-3 text-sm text-slate-300">

                                        <motion.li variants={itemVariants} transition={{ duration: 0.35, delay: 0.5 }} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2">
                                            <span>Partidas analisadas</span>
                                            <strong className="text-[#00B4D8]">12.4k</strong>
                                        </motion.li>

                                        <motion.li variants={itemVariants} transition={{ duration: 0.35, delay: 0.53 }} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2">
                                            <span>Atualizações de modelo</span>
                                            <strong className="text-[#00B4D8]">Semanais</strong>
                                        </motion.li>
                                        <motion.li variants={itemVariants} transition={{ duration: 0.35, delay: 0.56 }} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2">
                                            <span>Fontes de dados</span>
                                            <strong className="text-[#00B4D8]">Riot + APIs públicas</strong>
                                        </motion.li>
                                    </ul>
                                </aside>
                            </ScrollReveal>
                        </div>

                        <ScrollReveal preset="up" stagger={0.12}>
                            <div className="mt-6 grid gap-4 md:grid-cols-3">

                                <motion.blockquote variants={upItemVariants} className="rounded-xl border border-slate-800 bg-slate-800/60 p-4 text-sm text-slate-200">
                                    “Finalmente consigo explicar o jogo para meus amigos sem travar em termos técnicos.”
                                    <footer className="mt-2 text-xs text-slate-400">— Lara, fã casual</footer>
                                </motion.blockquote>


                                <motion.blockquote variants={upItemVariants} className="rounded-xl border border-slate-800 bg-slate-800/60 p-4 text-sm text-slate-200">
                                    “O resumo pós-jogo me mostrou erros de rotação que eu nunca tinha percebido.”
                                    <footer className="mt-2 text-xs text-slate-400">— Vini, jogador ranked</footer>
                                </motion.blockquote>


                                <motion.blockquote variants={upItemVariants} className="rounded-xl border border-slate-800 bg-slate-800/60 p-4 text-sm text-slate-200">
                                    “Os indicadores são rápidos e confiáveis para preparar comentários antes das séries.”
                                    <footer className="mt-2 text-xs text-slate-400">— Caio, analista iniciante</footer>
                                </motion.blockquote>

                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </ScrollReveal>

            <ScrollReveal>
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
            </ScrollReveal>

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

            {isLearnMoreOpen && (
                <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 px-4">
                    <div className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-950 p-6 shadow-2xl">
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="text-xl font-bold text-[#00B4D8]">Guia estendido para iniciantes</h3>
                            <button
                                type="button"
                                onClick={() => setIsLearnMoreOpen(false)}
                                className="rounded-lg border border-slate-600 px-3 py-1 text-sm hover:bg-slate-800"
                            >
                                Fechar
                            </button>
                        </div>
                        <div className="mt-4 space-y-4 text-sm text-slate-300">
                            <p>
                                Em LoL, o objetivo final é destruir o Nexus inimigo. Para isso, os times avançam pelo mapa, conquistam visão, lutam por objetivos e protegem sua própria base.
                            </p>
                            <p>
                                Em competições, quase tudo é planejado: escolhas no draft, movimentação pelo mapa, tempos de luta e controle de recursos. Pequenas decisões podem decidir o resultado.
                            </p>
                            <p>
                                As estatísticas existem para transformar a partida em aprendizado. Elas ajudam a responder perguntas como: “onde perdemos vantagem?”, “quem cresceu mais rápido?” e “em que minuto o jogo virou?”.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

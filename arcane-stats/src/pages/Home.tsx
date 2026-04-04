import { motion } from "framer-motion"
import DarkVeil from "../components/DarkVeilBackground"
import ScrollStack, { ScrollStackItem } from "../components/ScrollStack"

export default function Home() {
    return (
        <motion.div className="relative overflow-hidden p-6 flex flex-col gap-8 bg-transparent min-h-screen">
            <DarkVeil />
            <motion.div
                initial={{ opacity: 0, x: -100}}
                animate={{ opacity: 1, x: 0, transition: {duration: 0.8}}}
                className="flex justify-center mt-10 relative z-10"
            >
                <h1 className="space-grotesk-title text-5xl uppercase">Bem vindo ao arcane stats</h1>
            </motion.div>

            <div className="relative flex justify-center w-full">
                <div className="w-full max-w-4xl h-[62vh] rounded-3xl overflow-hidden shadow-2xl">
                    <ScrollStack className="h-full">
                        <ScrollStackItem itemClassName="bg-slate-900 text-white">
                            <div className="space-y-3">
                                <h2 className="text-white text-2xl font-bold">O que é Arcane Stats</h2>
                                <p className="text-slate-300">Uma dashboard de análise de partidas para ajudar jogadores a entender desempenho e prioridades.</p>
                                <p className="text-slate-300">Aqui você vê indicadores de macro, builds recomendadas e insights rápidos para jogar melhor.</p>
                            </div>
                        </ScrollStackItem>
                        <ScrollStackItem itemClassName="bg-slate-900 text-white">
                            <div className="space-y-3">
                                <h2 className="text-white text-2xl font-bold">Como usar</h2>
                                <p className="text-slate-300">Navegue entre os painéis para comparar métricas de times, campeões e partidas.</p>
                                <p className="text-slate-300">Use os filtros para ajustar o foco por posição, nível e estilo de gameplay.</p>
                            </div>
                        </ScrollStackItem>
                        <ScrollStackItem itemClassName="bg-slate-900 text-white">
                            <div className="space-y-3">
                                <h2 className="text-white text-2xl font-bold">O que você ganha</h2>
                                <p className="text-slate-300">Decisões mais rápidas na partida com dados de objetivos, rotações e sinergias.</p>
                                <p className="text-slate-300">Melhore sua consistência na lane e no macro com recomendações de estratégia ao vivo.</p>
                            </div>
                        </ScrollStackItem>
                        <ScrollStackItem itemClassName="bg-slate-900 text-white">
                            <div className="space-y-3">
                                <h2 className="text-white text-2xl font-bold">Próximos passos</h2>
                                <p className="text-slate-300">Vá para 'Partidas' para ver análises de jogos recentes.</p>
                                <p className="text-slate-300">No menu 'Jogadores', compare estatísticas de campeões e builds ideais.</p>
                            </div>
                        </ScrollStackItem>
                        <ScrollStackItem itemClassName="bg-slate-900 text-white">
                            <div className="space-y-3">
                                <h2 className="text-white text-2xl font-bold">Pronto para melhorar</h2>
                                <p className="text-slate-300">A cada partida, use o Arcane Stats como sua segunda tela de estratégia.</p>
                                <p className="text-slate-300">Seu progresso é o resultado de dados + execução. Comece agora.</p>
                            </div>
                        </ScrollStackItem>
                    </ScrollStack>
                </div>
            </div>
        </motion.div>
    )
}
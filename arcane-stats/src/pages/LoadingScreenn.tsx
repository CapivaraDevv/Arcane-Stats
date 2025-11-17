import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
    onLoadingComplete?: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            // Aguarda a animação de saída terminar (1s) antes de chamar o callback
            setTimeout(() => {
                onLoadingComplete?.();
            }, 400);
        }, 3500)
        return () => clearTimeout(timer)
    }, [onLoadingComplete]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1 } }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-[#0B132B]"
                >
                    {/* Background animado sutil */}
                    

                    {/* Logo animado */}
                    <motion.div
                        initial={{ scale: 0, rotate: -30, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative z-10"
                    >
                        <img 
                            src="/LogoBranco.png" 
                            alt="Logo Oficial Branca" 
                            className="w-48 h-auto bg-white rounded-lg"
                        />
                    </motion.div>

                    {/* Barra de progresso simulada */}
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.8, delay: 0.4 }}
                        className="mt-6 h-1 bg-gradient-to-r from-[#0077B6] via-[#00B4D8] to-[#0077B6] rounded-full w-full max-w-xs relative z-10 overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                                x: ['-100%', '100%'],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="mt-4 text-sm tracking-wider text-black uppercase sora-text relative z-10"
                    >
                        Carregando...
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
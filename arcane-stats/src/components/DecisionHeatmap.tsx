import { memo } from 'react';
import { motion } from 'framer-motion';

type HeatPoint = {
    x: number;
    y: number;
    intensity: number;
};

type Props = {
    data: HeatPoint[];
};

const DecisionHeatMap = memo(function DecisionHeatMap({ data }: Props) {
    return (
        <div className='relative w-full h-[400px] rounded-lg overflow-hidden'>

            {/* Mapa */}
            <img src="/SummonersRiftMap.jpg" width={800} height={800} className='absolute inset-0 w-full h-full object-cover opacity-80' />

            {data.map((point, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className='absolute rounded-full blur-xl'
                    style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        width: `${40 + point.intensity * 30}px`,
                        height: `${40 + point.intensity * 30}px`,
                        background: `rgba(255,0,0,${0.2 + point.intensity * 0.25})`,
                    }}
                />
            ))}
        </div>
    )
});

export default DecisionHeatMap;
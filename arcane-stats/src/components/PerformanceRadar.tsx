import { memo } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type RadarData = {
  subject: string;
  value: number;
  fullMark: number;
};

interface PerformanceRadarProps {
  data: RadarData[];
}

const PerformanceRadar = memo(function PerformanceRadar({ data }: PerformanceRadarProps) {
  return (
    <div className="w-full h-[267px] bg-[#05080fb3] rounded-3xl p-2">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.20)" />

          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#FFFF", fontSize: 11 }}
          />

          <Radar
            name="Performance"
            dataKey="value"
            stroke="#00B4D8"
            fillOpacity={0.4}
            activeDot={{
              r: 6,
              fill: "#00B4D8",
              stroke: "#0f172a",
              strokeWidth: 2,
            }}
          />

          <Tooltip
            cursor={{ stroke: "#00B4D8", strokeWidth: 2 }}
            contentStyle={{
              background: "#05080fb3",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
});

export default PerformanceRadar;

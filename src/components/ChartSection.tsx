'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { ClimateData } from '@/lib/api'

interface ChartSectionProps {
    data: ClimateData[]
    title: string
    indicatorCode: string
    color: string
}

export default function ChartSection({ data, title, indicatorCode }: ChartSectionProps) {
    const chartData = data
        .filter((d) => d.indicator_code === indicatorCode)
        .sort((a, b) => a.year - b.year)

    const pivotedData: any[] = []
    const years = Array.from(new Set(chartData.map((d) => d.year))).sort()

    years.forEach((year) => {
        const point: any = { year }
        chartData
            .filter((d) => d.year === year)
            .forEach((d) => {
                point[d.country_code] = d.value
                point['unit'] = d.unit
            })
        pivotedData.push(point)
    })

    const countries = Array.from(new Set(chartData.map((d) => d.country_code)))

    // Modern Monochrome Palette - Distinct but harmonious
    const getColor = (index: number) => {
        const palette = [
            '#fafafa', // White
            '#a1a1aa', // Zinc 400
            '#52525b', // Zinc 600
            '#d4d4d8', // Zinc 300
            '#71717a', // Zinc 500
            '#3f3f46', // Zinc 700
        ]
        return palette[index % palette.length]
    }

    return (
        <div className="glass-card p-8 w-full h-[450px]">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white/90 uppercase tracking-wide">{title}</h3>
                <div className="flex gap-2">
                    {/* Placeholder for future controls */}
                </div>
            </div>

            <div className="w-full h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pivotedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#27272a"
                            vertical={false}
                            opacity={0.5}
                        />
                        <XAxis
                            dataKey="year"
                            stroke="#71717a"
                            tick={{ fontSize: 12, fill: '#71717a' }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#71717a"
                            tick={{ fontSize: 12, fill: '#71717a' }}
                            axisLine={false}
                            tickLine={false}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(9, 9, 11, 0.8)',
                                backdropFilter: 'blur(8px)',
                                borderColor: 'rgba(255, 255, 255, 0.1)',
                                color: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
                            }}
                            itemStyle={{ color: '#e4e4e7', fontSize: '13px' }}
                            labelStyle={{ color: '#a1a1aa', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                            cursor={{ stroke: '#52525b', strokeWidth: 1, strokeDasharray: '4 4' }}
                            wrapperStyle={{ outline: 'none' }}
                        />
                        <Legend
                            iconType="circle"
                            wrapperStyle={{ paddingTop: '20px' }}
                            formatter={(value) => <span className="text-zinc-400 text-sm ml-1">{value}</span>}
                        />
                        {countries.map((code, index) => (
                            <Line
                                key={code}
                                type="monotone" // Smoother lines
                                dataKey={code}
                                name={code}
                                stroke={getColor(index)}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
                                animationDuration={1000}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

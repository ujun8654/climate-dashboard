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
import { useState } from 'react'
import { Info } from 'lucide-react'

interface ChartSectionProps {
    data: ClimateData[]
    title: string
    description?: string
    indicatorCode: string
    color: string
}

export default function ChartSection({ data, title, description, indicatorCode, color }: ChartSectionProps) {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)

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

    if (chartData.length === 0) return null;

    return (
        <div className="glass-card p-6 md:p-8 w-full h-[520px] flex flex-col relative overflow-hidden transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white/90 uppercase tracking-wide">{title}</h3>
                        {description && (
                            <button
                                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                                className="text-zinc-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                                aria-label="Toggle description"
                            >
                                <Info size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Collapsible Description Panel */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out bg-zinc-800/50 rounded-lg border border-white/5 mb-4 ${isDescriptionOpen ? 'max-h-40 opacity-100 p-4' : 'max-h-0 opacity-0 p-0'}`}
            >
                <p className="text-sm text-zinc-300 leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="flex-1 min-h-0">
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
                                backgroundColor: 'rgba(9, 9, 11, 0.9)',
                                backdropFilter: 'blur(12px)',
                                borderColor: 'rgba(255, 255, 255, 0.1)',
                                color: '#fff',
                                borderRadius: '12px',
                                boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.5)',
                                padding: '12px',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                            itemStyle={{ color: '#e4e4e7', fontSize: '13px', padding: '2px 0' }}
                            labelStyle={{ color: '#a1a1aa', fontSize: '11px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}
                            cursor={{ stroke: '#52525b', strokeWidth: 1, strokeDasharray: '4 4' }}
                            wrapperStyle={{ outline: 'none' }}
                        />
                        <Legend
                            iconType="circle"
                            wrapperStyle={{ paddingTop: '20px' }}
                            formatter={(value) => <span className="text-zinc-400 text-sm ml-1 hover:text-white transition-colors cursor-default">{value}</span>}
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
                                activeDot={{ r: 6, strokeWidth: 0, fill: '#fff', stroke: color || getColor(index) }}
                                animationDuration={1500}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {!isDescriptionOpen && description && (
                <div className="absolute bottom-6 right-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Hover for details</span>
                </div>
            )}
        </div>
    )
}

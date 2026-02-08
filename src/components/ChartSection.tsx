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

    // Monochrome Palette: Shades of white/grey
    const getColor = (index: number) => {
        const shades = ['#fafafa', '#a1a1aa', '#52525b', '#e4e4e7', '#71717a', '#27272a']
        return shades[index % shades.length]
    }

    return (
        <div className="glass-card p-6 w-full h-[400px]">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">{title}</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pivotedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis
                        dataKey="year"
                        stroke="#52525b"
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        stroke="#52525b"
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Legend iconType="rect" />
                    {countries.map((code, index) => (
                        <Line
                            key={code}
                            type="linear" // Sharp lines for modern feel
                            dataKey={code}
                            name={code}
                            stroke={getColor(index)}
                            strokeWidth={2}
                            dot={false} // Remove dots for cleaner look
                            activeDot={{ r: 4, strokeWidth: 0 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

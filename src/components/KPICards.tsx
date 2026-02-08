'use client'

import { ClimateData } from '@/lib/api'

interface KPICardsProps {
    data: ClimateData[]
}

export default function KPICards({ data }: KPICardsProps) {
    // 1. Total Population (Sum of latest year per country)
    const latestYear = Math.max(...data.map(d => d.year)) || 2023

    // Helper to get latest sum for an indicator
    const getLatestSum = (code: string) => {
        return data
            .filter(d => d.indicator_code === code && d.year === latestYear) // Approximate latest
            .reduce((acc, curr) => acc + curr.value, 0)
    }

    // Helper to get latest average for an indicator
    const getLatestAvg = (code: string) => {
        const filtered = data.filter(d => d.indicator_code === code)
        // Group by country, get max year
        const latestByCountry = new Map();
        filtered.forEach(d => {
            if (!latestByCountry.has(d.country_code) || latestByCountry.get(d.country_code).year < d.year) {
                latestByCountry.set(d.country_code, d)
            }
        })
        const latestValues = Array.from(latestByCountry.values()) as ClimateData[]
        return latestValues.reduce((acc, curr) => acc + curr.value, 0) / (latestValues.length || 1)
    }

    const totalPop = getLatestSum('SP.POP.TOTL')
    const avgGDP = getLatestAvg('NY.GDP.PCAP.CD')
    const avgForest = getLatestAvg('AG.LND.FRST.ZS')
    const avgRenewable = getLatestAvg('EG.FEC.RNEW.ZS')

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6 flex flex-col justify-between h-36 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium z-10 transition-colors group-hover:text-white">총 인구 (Sample)</p>
                <div className="z-10">
                    <h3 className="text-3xl font-bold text-white tracking-tight tabular-nums">
                        {(totalPop / 1000000).toLocaleString(undefined, { maximumFractionDigits: 1 })}
                        <span className="text-sm font-normal text-zinc-500 ml-2 group-hover:text-zinc-400 transition-colors">M</span>
                    </h3>
                </div>
            </div>

            <div className="glass-card p-6 flex flex-col justify-between h-36 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium z-10 transition-colors group-hover:text-white">평균 1인당 GDP</p>
                <div className="z-10">
                    <h3 className="text-3xl font-bold text-white tracking-tight tabular-nums">
                        {avgGDP.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        <span className="text-sm font-normal text-zinc-500 ml-2 group-hover:text-zinc-400 transition-colors">$</span>
                    </h3>
                </div>
            </div>

            <div className="glass-card p-6 flex flex-col justify-between h-36 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium z-10 transition-colors group-hover:text-white">평균 산림 면적</p>
                <div className="z-10">
                    <h3 className="text-3xl font-bold text-white tracking-tight tabular-nums">
                        {avgForest.toFixed(1)}
                        <span className="text-sm font-normal text-zinc-500 ml-2 group-hover:text-zinc-400 transition-colors">%</span>
                    </h3>
                    <div className="w-full bg-zinc-800/50 h-1 mt-4 rounded-full overflow-hidden">
                        <div
                            className="bg-green-500/80 h-full transition-all duration-1000 ease-out group-hover:shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                            style={{ width: `${Math.min(avgForest || 0, 100)}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 flex flex-col justify-between h-36 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium z-10 transition-colors group-hover:text-white">재생 에너지 비중</p>
                <div className="z-10">
                    <h3 className="text-3xl font-bold text-white tracking-tight tabular-nums">
                        {avgRenewable ? avgRenewable.toFixed(1) : '-'}
                        <span className="text-sm font-normal text-zinc-500 ml-2 group-hover:text-zinc-400 transition-colors">%</span>
                    </h3>
                    <div className="w-full bg-zinc-800/50 h-1 mt-4 rounded-full overflow-hidden">
                        <div
                            className="bg-white h-full transition-all duration-1000 ease-out group-hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            style={{ width: `${Math.min(avgRenewable || 0, 100)}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

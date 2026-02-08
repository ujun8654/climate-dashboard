'use client'

import { ClimateData } from '@/lib/api'

interface KPICardsProps {
    data: ClimateData[]
}

export default function KPICards({ data }: KPICardsProps) {
    const totalConsumption = data
        .filter(d => d.indicator_code === 'EG.USE.ELEC.KH.PC')
        .reduce((acc, curr) => acc + curr.value, 0)

    const avgRenewable = data
        .filter(d => d.indicator_code === 'EG.FEC.RNEW.ZS')
        .reduce((acc, curr, _, arr) => acc + curr.value / arr.length, 0)

    const totalMethane = data
        .filter(d => d.indicator_code === 'EN.ATM.METH.KT.CE')
        .reduce((acc, curr) => acc + curr.value, 0)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6 flex flex-col justify-between h-36 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium z-10">평균 전력 소비량</p>
                <div className="z-10">
                    <h3 className="text-3xl font-bold text-white tracking-tight tabular-nums">
                        {totalConsumption ? (totalConsumption / (data.length || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}
                        <span className="text-sm font-normal text-zinc-500 ml-2">kWh</span>
                    </h3>
                </div>
            </div>

            <div className="glass-card p-6 flex flex-col justify-between h-36 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium z-10">재생 에너지 비중</p>
                <div className="z-10">
                    <h3 className="text-3xl font-bold text-white tracking-tight tabular-nums">
                        {avgRenewable ? avgRenewable.toFixed(1) : '-'}
                        <span className="text-sm font-normal text-zinc-500 ml-2">%</span>
                    </h3>
                    <div className="w-full bg-zinc-800 h-1 mt-4 rounded-full overflow-hidden">
                        <div
                            className="bg-white h-full transition-all duration-1000 ease-out"
                            style={{ width: `${Math.min(avgRenewable || 0, 100)}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 flex flex-col justify-between h-36 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium z-10">총 메탄 배출량</p>
                <div className="z-10">
                    <h3 className="text-3xl font-bold text-white tracking-tight tabular-nums">
                        {totalMethane ? (totalMethane / 1000).toFixed(1) : '-'}
                        <span className="text-sm font-normal text-zinc-500 ml-2">Mt</span>
                    </h3>
                </div>
            </div>

            <div className="glass-card p-6 flex flex-col justify-between h-36 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium z-10">데이터 포인트</p>
                <div className="z-10">
                    <h3 className="text-3xl font-bold text-white tracking-tight tabular-nums">
                        {data.length.toLocaleString()}
                    </h3>
                </div>
            </div>
        </div>
    )
}

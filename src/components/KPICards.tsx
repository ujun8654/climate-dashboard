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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="glass-card p-6 flex flex-col justify-between h-32">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">평균 전력 소비량</p>
                <div>
                    <h3 className="text-3xl font-bold text-white tracking-tight">
                        {totalConsumption ? (totalConsumption / (data.length || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}
                        <span className="text-sm font-normal text-zinc-500 ml-1">kWh</span>
                    </h3>
                </div>
            </div>

            <div className="glass-card p-6 flex flex-col justify-between h-32">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">재생 에너지 비중</p>
                <div>
                    <h3 className="text-3xl font-bold text-white tracking-tight">
                        {avgRenewable ? avgRenewable.toFixed(1) : '-'}
                        <span className="text-sm font-normal text-zinc-500 ml-1">%</span>
                    </h3>
                </div>
            </div>

            <div className="glass-card p-6 flex flex-col justify-between h-32">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">총 메탄 배출량</p>
                <div>
                    <h3 className="text-3xl font-bold text-white tracking-tight">
                        {totalMethane ? (totalMethane / 1000).toFixed(1) : '-'}
                        <span className="text-sm font-normal text-zinc-500 ml-1">Mt</span>
                    </h3>
                </div>
            </div>

            <div className="glass-card p-6 flex flex-col justify-between h-32">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">데이터 포인트</p>
                <div>
                    <h3 className="text-3xl font-bold text-white tracking-tight">
                        {data.length.toLocaleString()}
                    </h3>
                </div>
            </div>
        </div>
    )
}

'use client'

import { ClimateData } from '@/lib/api'

interface DataTableProps {
    data: ClimateData[]
}

export default function DataTable({ data }: DataTableProps) {
    const displayData = data.slice(0, 50)

    return (
        <div className="glass-card overflow-hidden mt-12">
            <div className="p-6 border-b border-zinc-800">
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">최신 데이터 (Recent Data)</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-zinc-400">
                    <thead className="text-xs text-zinc-500 uppercase bg-zinc-900/50 border-b border-zinc-800">
                        <tr>
                            <th className="px-6 py-3 font-medium">연도 (Year)</th>
                            <th className="px-6 py-3 font-medium">국가 (Country)</th>
                            <th className="px-6 py-3 font-medium">지표 (Indicator)</th>
                            <th className="px-6 py-3 text-right font-medium">값 (Value)</th>
                            <th className="px-6 py-3 font-medium">단위 (Unit)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayData.map((row) => (
                            <tr key={row.record_id} className="border-b border-zinc-800/50 hover:bg-zinc-900/80 transition-colors">
                                <td className="px-6 py-4 font-mono text-zinc-300">{row.year}</td>
                                <td className="px-6 py-4 font-medium text-white">{row.country_name}</td>
                                <td className="px-6 py-4">{row.indicator_name}</td>
                                <td className="px-6 py-4 text-right font-mono text-white">
                                    {row.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </td>
                                <td className="px-6 py-4 text-xs uppercase">{row.unit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

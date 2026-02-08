'use client'

interface FilterBarProps {
    countries: { country_code: string; country_name: string }[]
    selectedCountry: string
    onCountryChange: (code: string) => void
    years: number[]
    selectedYear: number | null
    onYearChange: (year: number) => void
}

export default function FilterBar({
    countries,
    selectedCountry,
    onCountryChange,
}: FilterBarProps) {
    return (
        <div className="glass-card mb-8 p-4 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto relative">
                <label className="text-zinc-400 text-xs font-bold uppercase tracking-widest whitespace-nowrap">국가 선택</label>
                <div className="relative w-full md:w-64 group">
                    <select
                        value={selectedCountry}
                        onChange={(e) => onCountryChange(e.target.value)}
                        className="appearance-none bg-zinc-900/80 border border-zinc-700 text-white text-sm rounded-lg focus:ring-2 focus:ring-white/20 focus:border-white block w-full p-2.5 pr-8 transition-all hover:border-zinc-500 cursor-pointer"
                    >
                        <option value="">전체 국가 (All Countries)</option>
                        {countries.map((c) => (
                            <option key={c.country_code} value={c.country_code}>
                                {c.country_name}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400 group-hover:text-white transition-colors">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="text-xs text-zinc-500 font-medium">
                Showing data for <span className="text-zinc-300">{selectedCountry || 'All Countries'}</span>
            </div>
        </div>
    )
}

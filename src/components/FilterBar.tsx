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
        <div className="border-b border-zinc-800 pb-6 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <label className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">국가 선택 (Country)</label>
                <select
                    value={selectedCountry}
                    onChange={(e) => onCountryChange(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-none focus:ring-1 focus:ring-white focus:border-white block w-full md:w-64 p-2.5"
                >
                    <option value="">전체 국가 (ALL)</option>
                    {countries.map((c) => (
                        <option key={c.country_code} value={c.country_code}>
                            {c.country_name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

import { supabase } from './supabase'

export interface ClimateData {
    record_id: string
    source: string
    indicator_code: string
    indicator_name: string
    country_code: string
    country_name: string
    year: number
    value: number
    unit: string
    collected_at: string
    ingested_at: string
}

export async function getUniqueCountries() {
    if (!supabase) return []

    const { data, error } = await supabase
        .from('climate_data')
        .select('country_code, country_name')
        .order('country_name')

    if (error) {
        console.error('Error fetching countries:', error)
        return []
    }

    // Deduplicate manually since .distinct() might not be straightforward with select
    const uniqueCountries = new Map()
    data.forEach((item) => {
        if (!uniqueCountries.has(item.country_code)) {
            uniqueCountries.set(item.country_code, item)
        }
    })

    return Array.from(uniqueCountries.values())
}

export async function getUniqueIndicators() {
    if (!supabase) return []

    const { data, error } = await supabase
        .from('climate_data')
        .select('indicator_code, indicator_name, unit')
        .order('indicator_name')

    if (error) {
        console.error('Error fetching indicators:', error)
        return []
    }

    const uniqueIndicators = new Map()
    data.forEach((item) => {
        if (!uniqueIndicators.has(item.indicator_code)) {
            uniqueIndicators.set(item.indicator_code, item)
        }
    })

    return Array.from(uniqueIndicators.values())
}

export async function getClimateData(countryCode?: string, indicatorCode?: string) {
    if (!supabase) return []

    let query = supabase
        .from('climate_data')
        .select('*')
        .order('year', { ascending: true })

    if (countryCode) {
        query = query.eq('country_code', countryCode)
    }

    if (indicatorCode) {
        query = query.eq('indicator_code', indicatorCode)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching climate data:', error)
        return []
    }

    return data as ClimateData[]
}

export async function getLatestDataByCountry() {
    // This is a bit complex without custom SQL functions, 
    // so we might just fetch all and process client-side for now 
    // or use a more specific query if performance allows.
    // For smaller datasets, fetching all is fine.

    // We'll fetch the latest year for each country per indicator
    // But for KPI cards, let's just cheat and get the last 5 years
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;

    if (!supabase) return []

    const { data, error } = await supabase
        .from('climate_data')
        .select('*')
        .gte('year', startYear)

    if (error) {
        console.error('Error fetching latest data:', error)
        return []
    }
    return data as ClimateData[]
}

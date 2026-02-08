import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let client: SupabaseClient | null = null

if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
  client = createClient(supabaseUrl, supabaseAnonKey)
} else {
  console.warn('Supabase credentials missing or invalid. Using mock/null client.')
}

export const supabase = client

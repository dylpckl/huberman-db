import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gzwxpgxpdftmgeidqtdu.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

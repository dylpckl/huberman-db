import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://gzwxpgxpdftmgeidqtdu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6d3hwZ3hwZGZ0bWdlaWRxdGR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA3MTk0MzEsImV4cCI6MTk5NjI5NTQzMX0.bZfZ88oqZ3dxZHrYmsPm7U4-1MJfP-3umRbivEgnEXc')
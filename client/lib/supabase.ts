import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mrjzcmjljpbaksmhutqr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yanpjbWpsanBiYWtzbWh1dHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NTg0MzcsImV4cCI6MjA5MTEzNDQzN30.LjF--Fr7G_i72gRKTrBJuOgETXLhQn8wVDWHAI1WUaE'

export const supabase = createClient(supabaseUrl, supabaseKey)
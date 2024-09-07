import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oyxmdzxqqifzaqklmkpg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95eG1kenhxcWlmemFxa2xta3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU3MjMwODMsImV4cCI6MjA0MTI5OTA4M30.gpCwhaUmAOScABVIQuRpHVR2SlK_7GIm-TtViiKTLgk'
export const supabase = createClient(supabaseUrl, supabaseKey)

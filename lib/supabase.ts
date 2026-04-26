import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://asaldwdkpbolzbybwvcv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzYWxkd2RrcGJvbHpieWJ3dmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNTAwODQsImV4cCI6MjA5MjYyNjA4NH0.Tr-MfpzkghJgG-177wa-go1w78DyyJY3AJLQ3dRwDeU'

export const supabase = createClient(supabaseUrl, supabaseKey)
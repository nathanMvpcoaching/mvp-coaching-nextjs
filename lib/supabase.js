import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jorkmmqeaegolhgikmqt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvcmttbXFlYWVnb2xoZ2lrbXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MzQ2NDIsImV4cCI6MjA5NDAxMDY0Mn0.WW8uGOVXF8Q5dLb0C60Gk_cA7DEtbV4vSpGX8fESTug'

export const supabase = createClient(supabaseUrl, supabaseKey)
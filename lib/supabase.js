import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jorkmmqeaegolhgikmqt.supabase.co'
const supabaseKey = 'sb_publishable_ueJZhOyIBIMU5Pw3A8DFIQ_EHSsG8mg'

export const supabase = createClient(supabaseUrl, supabaseKey)
import { createClient } from  '@supabase/supabase-js'

const  SUPABSE_URL = 'https://sxkcwshulbsvwnlvjgfw.supabase.co'
const  SUPABASE_PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzg3NzEzMSwiZXhwIjoxOTUzNDUzMTMxfQ.GHOELGasMrXrPyf-8ATREq9aR64tAb0J06Nz_SIOQAs'

const supabase = createClient(SUPABSE_URL, SUPABASE_PUBLIC_KEY)

export default supabase
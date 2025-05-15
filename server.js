import express from 'express'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Set up middleware
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3002

// init SupaBase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)
// Set location for static files
app.use(express.static('public'))

// Call to fetch exercises from DB
app.get('/exercises', async (req, res) => {

// todo: parse data from db

    let query = supabase
      .from('exercises')
      .select('name')

// todo: build rest of query
    const {data, error} = await query
    if (error) {
        console.error("Supabse error:", error)
        return res.status(500).json({ error: error.message })
    }
    console.log(data)

    res.json(data)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

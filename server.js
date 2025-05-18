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

    const{level = [], equipment = [], primaryMuscles = [], category = []} = req.query
    
    const levels = Array.isArray(level ? level : [level])
    const equips = Array.isArray(equipment ? equipment : [equipment])
    const muscles = Array.isArray(primaryMuscles ? primaryMuscles : [primaryMuscles])
    const cats = Array.isArray(category ? category : [category])

    // select name from exercises
    let query = supabase.from('exercises')
    .select('id, name, level, equipment, primaryMuscles, category') // selecting the ID to store it in the anchor tag

    //"where level in (<levels>)"
    //select name from exercises where level in ('Beginner', 'Intermediate')
    // If not none and not all levels selected, then "where level in (<levels>)"
    if (levels.length > 0 && levels.length < 3) {
        query = query.in('level', levels)
    }

    const wantsBodyOnly = equips.includes('Body Only')
    const wantsEquipReq = equips.includes('Equipment Required')
    if (wantsBodyOnly && !wantsEquipReq) {
        query = query.eq('equipment', 'Body Only')
    } else if (wantsEquipReq && !wantsBodyOnly) {
        query = query.neq('equipment', 'Body Only')
    }
    // If not none and not all muscles selected, then "where primaryMuscles in (<muscles>)"
    if (muscles.length > 0 && muscles.length < 17 ) {
        query = query.in('primaryMuscles', muscles)
    }
    // If not none and not all categories selected, then "where category in (<categories>)"
    if (cats.length > 0 && cats.length < 3) {
        query = query.in('category', cats)
    }

    // Execute query and await result
    const {data, error} = await query
    if (error) {
        console.error("Supabase error:", error)
        return res.status(500).json({ error: error.message })
    }
    // console.log(data)

    res.json(data)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

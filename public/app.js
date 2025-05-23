// Manually configure from to fetch data and format results as HTML
document.getElementById('filterForm').addEventListener('submit', async e => {
    e.preventDefault()
    const form = e.target
    const params = new URLSearchParams()

    new FormData(form).forEach((value, key) => {
        params.append(key, value)
    })

    //console.log(params.toString())

    try {
        const res = await fetch('/exercises?' + params.toString())
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const exercises = await res.json() // format response as JSON

        // Set up list elements inside ul tag
        const ul = document.getElementById('results')
        if (exercises.length === 0) {
            ul.innerHTML = '<li>No exercises found.</li>'
        } else {
            ul.innerHTML = exercises.map(exercise => {
                return `
                <li>
                <a href="exercise.html?id=${encodeURIComponent(exercise.id)}" target="_blank">
                <strong>${exercise.level}</strong><br/>
                </a>
                <strong>${exercise.name}<strong/><br/>
                Level: ${exercise.level},
                Equipment: ${exercise.equipment ? exercise.equipment : 'None'},
                Primary Muscle: ${exercise.primaryMuscles},
                Category: ${exercise.category}
                </li>`
            }).join('')
        }
         
        // console.log(exercises.level)

    } catch (err) {
        console.error('Error fetching exercises:', err)
        document.getElementById('results').innerHTML =
            '<li style="color:red">Failed to load exercises.</li>'
    }
})
// Manually configure from to fetch data and format results as HTML
document.getElementById('filterForm').addEventListener('submit', async e => {
    e.preventDefault()
    const form = e.target
    const params = new URLSearchParams()

    new FormData(form).forEach((value, key) => {
        params.append(key, value)
    })

    try {
        const res = await fetch('/exercises?' + params.toString())
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const exercises = await res.json() // format response as JSON

        // Set up list elements inside ul tag
        const container = document.getElementById('results')
        if (exercises.length === 0) {
            container.innerHTML = '<p>No exercises found.</p>'
        } else {
            container.innerHTML = exercises.map(exercise => `
                <div class="col-mb-4">
                <div class="card h-100">
                <div class="card-body d-flex flex-column">
                <a href="exercise.html?id=${encodeURIComponent(exercise.id)}" target="_blank"
                class="text-decoration-none mb-3">
                <h5 class="card-title">${exercise.name}</h5>
                <strong>${exercise.level}</strong><br/>
                </a>

                <!-- Wrap all the details here and push them down -->
                <div class="mt-auto">
                <p class="card-text mb-1"><strong>Level:</strong> ${exercise.level}</p>
                <p class="card-text mb-1"><strong>Equipment:</strong> ${exercise.equipment}</p>
                <p class="card-text mb-1"><strong>Primary Muscle:</strong> ${exercise.primaryMuscles}</p>
                <p class="card-text"><strong>Category:</strong> ${exercise.category}</p>
                </div>
                </div>
                </div>
                </div>
            `).join('')
        }
    } catch (err) {
        console.error('Error fetching exercises:', err)
        document.getElementById('results').innerHTML =
            '<p class="text-danger">Failed to load exercises.</p>'
    }
})
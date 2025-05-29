
// Call this anonymous function immediately upon page load
(async() => {
    // Get the encoded ID value from the clicked link
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    const container = document.getElementById('details')

    if(!id) {
        container.querySelector('.card-body').textContent = 'No exercise specified'
        return
    }
    // Try to get the exercise details from the server
    try {
        const res = await fetch(`/exercises/${encodeURIComponent(id)}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const ex = await res.json()

        // Secondary muscles are delimited with | symbols, replace with comma and space
        const secondaryBadges = ex.secondaryMuscles  
        .split('|')
        .map(muscle => `<spam class="badge bg-secondary me-1">${muscle}</spam>`)
        .join('') 

        // Same with exercise steps
        // Instructions as a Bootstrap numbered list
        const steps = ex.instructions.split('|') 
        .map(step => `<li class="list-group-item>${step}</li>`)
        .join('')

        // Image URLs 
        const base = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/'
        const imgs = [ex.image0, ex.image1]
        .filter(Boolean)
        .map(src => `
            <div class="col">
              <img src="${base + src}"
                alt=${ex.name}"
                class="img-fluid rounded shadow-sm">
            </div>
        `).join('')

        // List other details 
        container.innerHTML = `
        <div class="card-body">
          <h2 class="card-title mb-3">${ex.name}</h2>
          
          <div class="row mb-4">
          <div class="col-6 test-start">
            <p><strong>Force:</strong>${ex.force}</p>
            <p><strong>Level:</strong> ${ex.level}</p>
            <p><strong>Mechanic:</strong> ${ex.mechanic}</p>
            <p><strong>Equipment:</strong> ${ex.equipment}</p>
          </div>
          <div class="col-6 test-start">
            <p><strong>Primary Muscle:</strong> 
            <spam class="badge bg-primary">${ex.primaryMuscles}</spam>
            </p>
            <p><strong>Secondary Muscles:</strong> ${secondaryBadges}</p>
            <p><strong>Category:</strong> 
            <spam class="badge bg-info text-dark">${ex.category}</spam>
            </p>
          </div>
        </div>

        <h5>Instructions</h5>
        <!-- Put exercise steps in an ordered list (with numbers) -->
        <ol class="list-group list-group-numbered mb-4">
            ${steps}
        </ol>

        <h5>Images</h5>
          <div class="row g-3">
            ${imgs}
          </div>
        </div>
        `
    } catch (err) {
    console.error(err)
    container.querySelector('.card-body').textContent =
      'Failed to load exercise details.'
  }
})()
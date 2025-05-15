// Manually configure from to fetch data and format results as HTML
document.getElementById('filterForm').addEventListener('submit', async e => {
    e.preventDefault()

    try {
        const res = await fetch('/exercises')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const exercises = await res.json()
        console.log(exercises)
    } catch (err) {
        console.error('Error fetching exercises:', err)
    }
})
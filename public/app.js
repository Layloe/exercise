// Manually configure from to fetch data and format results as HTML
document.getElementById('filterForm').addEventListener('submit', async e => {
    e.preventDefault()
    const form = e.target
    const params = new URLSearchParams()

    new FormData(form).forEach((value, key) => {
        params.append( key, value)
    })

    //console.log(params.toString())

    try {
        const res = await fetch('/exercises?' + params.toString())
        console.log('/exercises?' + params.toString())
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const exercises = await res.json()
        // console.log(exercises)
    } catch (err) {
        console.error('Error fetching exercises:', err)
    }
})
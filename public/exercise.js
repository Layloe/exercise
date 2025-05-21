
(async() => {

    const params = new URLSearchParams(window.location.search)

    const id = params.get('id')

    const container =document.getElementById('details')

    if(!id) {
        container.textContent = 'No exercise specified'
        return
    }

    try {
        const res = await fetch(`/exercises/${encodeURIComponent(id)}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
    }
})()
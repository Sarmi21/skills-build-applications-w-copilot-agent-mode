import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  }

  return 'http://localhost:8000/api/leaderboard/'
}

const extractData = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items
  }

  if (payload?.data && Array.isArray(payload.data.items)) {
    return payload.data.items
  }

  return []
}

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(getApiBaseUrl())

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setEntries(extractData(payload))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h4 mb-1">Leaderboard</h2>
            <p className="text-muted mb-0">A live ranking of the strongest performers.</p>
          </div>
          <a className="btn btn-outline-primary btn-sm" href={getApiBaseUrl()} target="_blank" rel="noreferrer">
            Open JSON
          </a>
        </div>

        {loading ? (
          <div className="text-muted">Loading leaderboard…</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="list-group">
            {entries.map((entry) => {
              const userName = entry.userId?.name || entry.userName || 'Unknown user'

              return (
                <div key={entry._id || entry.id || `${entry.rank}-${userName}`} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="h6 mb-1">#{entry.rank ?? '—'} · {userName}</h3>
                    <p className="mb-0 text-muted">Score: {entry.score ?? '—'}</p>
                  </div>
                  <span className="badge text-bg-primary">{entry.score ?? '—'}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default Leaderboard

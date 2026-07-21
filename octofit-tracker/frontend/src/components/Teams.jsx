import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/teams/`
  }

  return 'http://localhost:8000/api/teams/'
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

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(getApiBaseUrl())

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setTeams(extractData(payload))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h4 mb-1">Teams</h2>
            <p className="text-muted mb-0">Collaborative groups building momentum together.</p>
          </div>
          <a className="btn btn-outline-primary btn-sm" href={getApiBaseUrl()} target="_blank" rel="noreferrer">
            Open JSON
          </a>
        </div>

        {loading ? (
          <div className="text-muted">Loading teams…</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {teams.map((team) => (
              <div className="col" key={team._id || team.id || team.name}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 fw-bold mb-2">{team.name}</h3>
                  <p className="mb-1"><strong>Sport:</strong> {team.sport}</p>
                  <p className="mb-1"><strong>Goal:</strong> {team.goal}</p>
                  <p className="mb-0"><strong>Members:</strong> {Array.isArray(team.members) ? team.members.join(', ') : '—'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Teams

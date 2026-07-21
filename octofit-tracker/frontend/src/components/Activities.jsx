import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/activities/`
  }

  return 'http://localhost:8000/api/activities/'
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

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(getApiBaseUrl())

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setActivities(extractData(payload))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h4 mb-1">Activities</h2>
            <p className="text-muted mb-0">Recent fitness sessions logged by the community.</p>
          </div>
          <a className="btn btn-outline-primary btn-sm" href={getApiBaseUrl()} target="_blank" rel="noreferrer">
            Open JSON
          </a>
        </div>

        {loading ? (
          <div className="text-muted">Loading activities…</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row row-cols-1 g-3">
            {activities.map((activity) => {
              const userName = activity.userId?.name || activity.userName || 'Unknown user'

              return (
                <div className="col" key={activity._id || activity.id || `${activity.type}-${activity.date}`}>
                  <div className="border rounded p-3 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h3 className="h6 fw-bold mb-0">{activity.type}</h3>
                      <span className="badge text-bg-primary">{activity.durationMinutes ?? '—'} min</span>
                    </div>
                    <p className="mb-1"><strong>User:</strong> {userName}</p>
                    <p className="mb-1"><strong>Distance:</strong> {activity.distanceKm ?? 0} km</p>
                    <p className="mb-0"><strong>Date:</strong> {activity.date ? new Date(activity.date).toLocaleDateString() : '—'}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default Activities

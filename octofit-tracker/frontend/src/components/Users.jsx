import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/users/`
  }

  return 'http://localhost:8000/api/users/'
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

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(getApiBaseUrl())

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setUsers(extractData(payload))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h4 mb-1">Users</h2>
            <p className="text-muted mb-0">Athletes and members tracked by the platform.</p>
          </div>
          <a className="btn btn-outline-primary btn-sm" href={getApiBaseUrl()} target="_blank" rel="noreferrer">
            Open JSON
          </a>
        </div>

        {loading ? (
          <div className="text-muted">Loading users…</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {users.map((user) => (
              <div className="col" key={user._id || user.id || `${user.name}-${user.email}`}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 fw-bold mb-2">{user.name}</h3>
                  <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                  <p className="mb-1"><strong>Age:</strong> {user.age ?? '—'}</p>
                  <p className="mb-0"><strong>Goal:</strong> {user.fitnessGoal ?? '—'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Users

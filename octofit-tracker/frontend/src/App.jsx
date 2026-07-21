import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <h1 className="display-4 fw-bold">OctoFit Tracker</h1>
          <p className="lead text-muted">
            A modern multi-tier fitness platform for logging activities, building
            teams, and competing on a live leaderboard.
          </p>
          <div className="d-flex gap-3 mt-4">
            <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
              Check API health
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="https://vite.dev/">
              Vite Docs
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="h4">What’s included</h2>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item">React 19 + Vite frontend</li>
                <li className="list-group-item">Express + TypeScript backend</li>
                <li className="list-group-item">MongoDB access via Mongoose</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App

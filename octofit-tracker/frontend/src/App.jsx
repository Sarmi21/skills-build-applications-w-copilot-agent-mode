import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function HomePage() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  return (
    <main className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <h1 className="display-4 fw-bold">OctoFit Tracker</h1>
          <p className="lead text-muted">
            A modern multi-tier fitness platform for logging activities, building
            teams, and competing on a live leaderboard.
          </p>
          <div className="d-flex gap-3 mt-4 flex-wrap">
            <a className="btn btn-primary btn-lg" href={codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/health` : 'http://localhost:8000/api/health'}>
              Check API health
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="https://vite.dev/">
              Vite Docs
            </a>
          </div>
          <div className="alert alert-info mt-4 mb-0">
            <strong>Note:</strong> define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use the Codespaces API URL.
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

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand fw-bold">OctoFit Tracker</span>
          <div className="navbar-nav ms-auto">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </>
  )
}

export default App

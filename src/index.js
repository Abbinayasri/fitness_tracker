import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard';
import WorkoutPlans from './WorkoutPlans';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'workoutPlans':
        return <WorkoutPlans />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">YouvsYou</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => setActivePage('dashboard')}>Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => setActivePage('workoutPlans')}>Workout Plans</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Food Control</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Activity Logs</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Render the active page */}
      <div className="container mt-4">
        {renderPage()}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

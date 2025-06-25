
import React, { useEffect, useState } from 'react';

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchActivities = () => {
    setLoading(true);
    fetch('https://animated-disco-qvgprq7vpgj26x6g-8000.app.github.dev/api/activities/')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="display-5 text-primary">OctoFit Activities</h2>
        <button className="btn btn-outline-primary" onClick={fetchActivities} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Recent Activities</h5>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>User</th>
                  <th>Type</th>
                  <th>Duration (min)</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">No activities found.</td>
                  </tr>
                ) : (
                  activities.map(activity => (
                    <tr key={activity._id}>
                      <td>{activity.user}</td>
                      <td>{activity.activity_type}</td>
                      <td>{activity.duration}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;

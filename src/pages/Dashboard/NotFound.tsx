import { Link } from 'react-router'

export const DashboardNotFound = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ margin: 0 }}>404</h1>
      <p style={{ marginTop: '0.5rem' }}>Dashboard page not found.</p>
      <Link to="/dashboard/products">Go to Products</Link>
    </div>
  )
}

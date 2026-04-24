import { BrowserRouter, Routes, Route } from 'react-router'
import { Dashboard, Home, Login } from './pages'
import {
  CategoriesList,
  Header,
  ProductsList,
  ProtectedRoute,
  UsersList,
  OrdersList,
  ReviewsList,
} from './components'
import { DashboardNotFound } from './pages/Dashboard/NotFound'
import { useSessionInit } from './hooks/useSessionInit'
import './App.css'

function AppRoutes() {
  useSessionInit()

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Guest-only routes */}
        <Route element={<ProtectedRoute requireAuth={false} />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<ProductsList />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="categories" element={<CategoriesList />} />

            <Route path="users" element={<UsersList />} />
            <Route path="orders" element={<OrdersList />} />
            <Route path="reviews" element={<ReviewsList />} />
            <Route path="*" element={<DashboardNotFound />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <div style={{ padding: '2rem' }}>
              <h1>404</h1>
              <p>Page not found</p>
            </div>
          }
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App

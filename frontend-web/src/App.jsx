import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

import Home from './pages/marketplace/Home';
import ProductList from './pages/marketplace/ProductList';
import ProductDetail from './pages/marketplace/ProductDetail';
import Cart from './pages/marketplace/Cart';
import Checkout from './pages/marketplace/Checkout';
import Login from './pages/auth/Login';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import SellerDashboard from './pages/seller/SellerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/NotFound';

function ProtectedRoute({ allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return <Outlet />;
}

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function PublicLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Navbar />}
      <main>
        <Outlet />
      </main>
      {!isLoginPage && <Footer />}
    </>
  );
}

function DashboardWithNavLayout() {
  return (
    <>
      <Navbar />
      <DashboardLayout />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Routes>
              {/* Public routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
              </Route>

              {/* Protected: Buyer */}
              <Route element={<ProtectedRoute allowedRoles={['buyer']} />}>
                <Route element={<DashboardWithNavLayout />}>
                  <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
                  <Route path="/dashboard/buyer/orders" element={<BuyerDashboard />} />
                  <Route path="/dashboard/buyer/wishlist" element={<BuyerDashboard />} />
                  <Route path="/dashboard/buyer/recommendations" element={<BuyerDashboard />} />
                </Route>
              </Route>

              {/* Protected: Seller */}
              <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
                <Route element={<DashboardWithNavLayout />}>
                  <Route path="/dashboard/seller" element={<SellerDashboard />} />
                  <Route path="/dashboard/seller/products" element={<SellerDashboard />} />
                  <Route path="/dashboard/seller/orders" element={<SellerDashboard />} />
                  <Route path="/dashboard/seller/analytics" element={<SellerDashboard />} />
                  <Route path="/dashboard/seller/pricing" element={<SellerDashboard />} />
                </Route>
              </Route>

              {/* Protected: Admin */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route element={<DashboardWithNavLayout />}>
                  <Route path="/dashboard/admin" element={<AdminDashboard />} />
                  <Route path="/dashboard/admin/moderation" element={<AdminDashboard />} />
                  <Route path="/dashboard/admin/fraud" element={<AdminDashboard />} />
                  <Route path="/dashboard/admin/users" element={<AdminDashboard />} />
                  <Route path="/dashboard/admin/analytics" element={<AdminDashboard />} />
                </Route>
              </Route>

              {/* Protected: Any authenticated user */}
              <Route element={<ProtectedRoute />}>
                <Route element={<PublicLayout />}>
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/settings" element={<BuyerDashboard />} />
                  <Route path="/orders/:id" element={<BuyerDashboard />} />
                </Route>
              </Route>

              {/* 404 */}
              <Route element={<PublicLayout />}>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

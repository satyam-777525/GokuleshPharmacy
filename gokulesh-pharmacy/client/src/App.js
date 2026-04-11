import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './ScrollToTop';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import ProductsPage from './pages/Product/ProductsPage';
import ProductDetail from './pages/Product/ProductDetail';
import CategoryPage from './pages/Product/CategoryPage';
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import PhonePeResultPage from './pages/Checkout/PhonePeResultPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProfilePage from './pages/Profile/ProfilePage';
import OrdersPage from './pages/Profile/OrdersPage';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminCategories from './pages/Admin/AdminCategories';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminUsers from './pages/Admin/AdminUsers';
import PoliciesIndexPage from './pages/Policies/PoliciesIndexPage';
import PrivacyPolicyPage from './pages/Policies/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/Policies/TermsAndConditionsPage';
import RefundPolicyPage from './pages/Policies/RefundPolicyPage';
import ShippingPolicyPage from './pages/Policies/ShippingPolicyPage';
import PaymentPolicyPage from './pages/Policies/PaymentPolicyPage';
import ContactUsPage from './pages/Policies/ContactUsPage';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen">Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen">Loading...</div>;
  return user?.role === 'admin' ? children : <Navigate to="/" replace />;
};

function AppContent() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />

      <Routes>
        {/* Admin Panel */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout>
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="users" element={<AdminUsers />} />
                </Routes>
              </AdminLayout>
            </AdminRoute>
          }
        />

        {/* Main Site */}
        <Route
          path="*"
          element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/category/:name" element={<CategoryPage />} />
                  <Route path="/products/:slug" element={<ProductDetail />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/payment/phonepe/result"
                    element={
                      <ProtectedRoute>
                        <PhonePeResultPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <ProtectedRoute>
                        <OrdersPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/policies" element={<PoliciesIndexPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
                  <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />
                  <Route path="/refund-policy" element={<RefundPolicyPage />} />
                  <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
                  <Route path="/payment-policy" element={<PaymentPolicyPage />} />
                  <Route path="/contact-us" element={<ContactUsPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

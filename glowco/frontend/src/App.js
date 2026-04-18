import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import SkinQuizPage from './pages/SkinQuizPage';
import RoutineBuilderPage from './pages/RoutineBuilderPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPanel from './pages/AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <main style={{ flex: 1 }}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/"               element={<HomePage />} />
                  <Route path="/shop"           element={<ShopPage />} />
                  <Route path="/shop/:id"       element={<ProductDetailPage />} />
                  <Route path="/blog"           element={<BlogPage />} />
                  <Route path="/about"          element={<AboutPage />} />
                  <Route path="/contact"        element={<ContactPage />} />
                  <Route path="/login"          element={<LoginPage />} />
                  <Route path="/signup"         element={<SignupPage />} />
                  <Route path="/cart"           element={<CartPage />} />

                  {/* Protected Routes (require login) */}
                  <Route path="/checkout"       element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
                  <Route path="/wishlist"       element={<PrivateRoute><WishlistPage /></PrivateRoute>} />
                  <Route path="/profile"        element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                  <Route path="/orders"         element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
                  <Route path="/quiz"           element={<SkinQuizPage />} />
                  <Route path="/routine"        element={<PrivateRoute><RoutineBuilderPage /></PrivateRoute>} />

                  {/* Admin Routes */}
                  <Route path="/admin/*"        element={<AdminRoute><AdminPanel /></AdminRoute>} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: 'var(--card)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  fontSize: '14px',
                },
                success: { iconTheme: { primary: '#52b788', secondary: '#fff' } },
              }}
            />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

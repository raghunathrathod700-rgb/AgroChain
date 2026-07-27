import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X, Leaf, User, LogOut, MessageCircle, Wallet, Truck, Package, Phone, Shield } from "lucide-react";
import {
  clearAuthSession,
  isAdmin,
  isAuthenticated,
  subscribeAuthChanged,
} from "@/lib/agrochain-auth";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => isAuthenticated());
  const [showAdmin, setShowAdmin] = useState(() => isAdmin());

  useEffect(() => {
    const sync = () => {
      setIsLoggedIn(isAuthenticated());
      setShowAdmin(isAdmin());
    };
    return subscribeAuthChanged(sync);
  }, []);

  const handleLogout = () => {
    clearAuthSession();
    setIsOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 border-b-4 border-green-700 sticky top-0 z-50 shadow-2xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group py-4">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white p-2.5 rounded-xl shadow-lg group-hover:shadow-2xl transition-all transform group-hover:scale-110 group-hover:rotate-6">
                  <Leaf className="h-7 w-7 text-green-600" />
                </div>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold tracking-tight text-white group-hover:text-yellow-200 transition-colors">Agro</span>
                <span className="text-2xl font-bold tracking-tight text-yellow-300 group-hover:text-white transition-colors">Chain</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 ${
                  isActive(link.path)
                    ? "bg-white text-green-600 shadow-lg scale-105"
                    : "text-white hover:bg-white/20 hover:text-yellow-200"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Quick Action Icons */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-2 mr-3">
              <Link
                to="/orders"
                className="p-2.5 text-white hover:text-yellow-200 hover:bg-white/20 rounded-lg transition-all transform hover:scale-110"
                title="Orders"
              >
                <Package className="h-5 w-5" />
              </Link>
              <Link
                to="/messages"
                className="relative p-2.5 text-white hover:text-yellow-200 hover:bg-white/20 rounded-lg transition-all transform hover:scale-110"
                title="Messages"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  3
                </span>
              </Link>
              <Link
                to="/wallet"
                className="p-2.5 text-white hover:text-yellow-200 hover:bg-white/20 rounded-lg transition-all transform hover:scale-110"
                title="Wallet"
              >
                <Wallet className="h-5 w-5" />
              </Link>
              <Link
                to="/vehicle-tracking"
                className="p-2.5 text-white hover:text-yellow-200 hover:bg-white/20 rounded-lg transition-all transform hover:scale-110"
                title="Track Vehicles"
              >
                <Truck className="h-5 w-5" />
              </Link>
              <a
                href="tel:+918458902317"
                className="p-2.5 text-white hover:text-yellow-200 hover:bg-white/20 rounded-lg transition-all transform hover:scale-110"
                title="Helpline: 8458902317"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          )}

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                {showAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 px-5 py-2.5 text-sm font-semibold text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-all transform hover:scale-105"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 px-5 py-2.5 text-sm font-semibold text-white hover:text-yellow-200 hover:bg-white/20 rounded-lg transition-all transform hover:scale-105"
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-sm font-semibold text-white hover:text-yellow-200 hover:bg-white/20 rounded-lg transition-all transform hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-semibold text-green-600 bg-white hover:bg-yellow-100 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-200 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 border-t border-white/20 animate-slideDown">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-white text-green-600 shadow-md"
                    : "text-white hover:bg-white/20 hover:text-yellow-200"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20 hover:text-yellow-200 transition-all"
                  >
                    Dashboard
                  </Link>
                  {showAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-yellow-200 hover:bg-white/20 transition-all"
                    >
                      <Shield className="h-5 w-5" />
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to="/orders"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20 hover:text-yellow-200 transition-all"
                  >
                    <Package className="h-5 w-5" />
                    Orders Management
                  </Link>
                  <Link
                    to="/messages"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20 hover:text-yellow-200 transition-all"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Messages
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5 animate-pulse">3</span>
                  </Link>
                  <Link
                    to="/wallet"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20 hover:text-yellow-200 transition-all"
                  >
                    <Wallet className="h-5 w-5" />
                    Wallet
                  </Link>
                  <Link
                    to="/vehicle-tracking"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20 hover:text-yellow-200 transition-all"
                  >
                    <Truck className="h-5 w-5" />
                    Vehicle Tracking
                  </Link>
                  <a
                    href="tel:+918458902317"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-yellow-200 hover:bg-white/20 border-t border-white/20 transition-all"
                  >
                    <Phone className="h-5 w-5" />
                    Call Helpline: 8458902317
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700 text-white transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20 hover:text-yellow-200 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium bg-white text-green-600 hover:bg-yellow-100 shadow-md transition-all"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
import { useState } from "react";
import { Package, TrendingUp, Users, ShoppingCart, AlertCircle, CheckCircle, MessageCircle, Wallet, Truck } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { MarketDataDashboard } from "@/app/components/MarketDataDashboard";
import { Link } from "react-router";

const salesData = [
  { month: "Jan", sales: 45000 },
  { month: "Feb", sales: 52000 },
  { month: "Mar", sales: 48000 },
  { month: "Apr", sales: 61000 },
  { month: "May", sales: 55000 },
  { month: "Jun", sales: 67000 },
];

const inventoryData = [
  { name: "Mango", value: 400 },
  { name: "Apple", value: 300 },
  { name: "Banana", value: 200 },
  { name: "Orange", value: 150 },
];

const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac"];

export function DashboardPage() {
  const [userRole] = useState<"Farmer" | "Buyer" | "Distributor">("Farmer");

  const stats = [
    {
      label: userRole === "Farmer" ? "Total Listings" : "Total Orders",
      value: userRole === "Farmer" ? "24" : "18",
      change: "+12%",
      icon: Package,
      color: "bg-blue-500",
    },
    {
      label: "Revenue (₹)",
      value: "₹4.5L",
      change: "+23%",
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      label: userRole === "Farmer" ? "Active Buyers" : "Active Suppliers",
      value: "156",
      change: "+8%",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      label: "Pending Orders",
      value: "7",
      change: "-5%",
      icon: ShoppingCart,
      color: "bg-orange-500",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "success",
      message: "Order #1024 delivered successfully",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "pending",
      message: "New order from Mumbai Traders - 50 Qtl Mango",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "success",
      message: "Payment received ₹45,000",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "pending",
      message: "Quality verification pending for Order #1022",
      time: "1 day ago",
    },
  ];

  const myListings = [
    { name: "Alphonso Mango", quantity: "80 Qtl", price: "₹15,000/Qtl", status: "Active" },
    { name: "Red Apple", quantity: "50 Qtl", price: "₹18,000/Qtl", status: "Active" },
    { name: "Cavendish Banana", quantity: "200 Qtl", price: "₹4,500/Qtl", status: "Low Stock" },
    { name: "Nagpur Orange", quantity: "120 Qtl", price: "₹9,000/Qtl", status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole} Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's your business overview
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/messages"
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 text-white"
          >
            <div className="flex items-center justify-between mb-3">
              <MessageCircle className="h-8 w-8" />
              <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">3 New</span>
            </div>
            <h3 className="text-xl font-bold mb-1">Messages</h3>
            <p className="text-blue-100 text-sm">Chat with farmers & buyers</p>
          </Link>

          <Link
            to="/wallet"
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 text-white"
          >
            <div className="flex items-center justify-between mb-3">
              <Wallet className="h-8 w-8" />
              <span className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-semibold">₹45K</span>
            </div>
            <h3 className="text-xl font-bold mb-1">Wallet</h3>
            <p className="text-green-100 text-sm">Manage payments & balance</p>
          </Link>

          <Link
            to="/vehicle-tracking"
            className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 text-white"
          >
            <div className="flex items-center justify-between mb-3">
              <Truck className="h-8 w-8" />
              <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">4 Active</span>
            </div>
            <h3 className="text-xl font-bold mb-1">Track Vehicles</h3>
            <p className="text-orange-100 text-sm">Monitor shipments in real-time</p>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Revenue Trend (₹ INR)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value}`} />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#16a34a"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Inventory Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Inventory Distribution (Qtl)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={inventoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {inventoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Listings / Orders */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {userRole === "Farmer" ? "My Listings" : "Recent Orders"}
            </h2>
            <div className="space-y-4">
              {myListings.map((listing, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-gray-900">
                      {listing.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {listing.quantity} • {listing.price}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      listing.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {listing.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div
                    className={`mt-1 ${
                      activity.type === "success"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {activity.type === "success" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Data Dashboard */}
        <div className="mt-8">
          <MarketDataDashboard />
        </div>
      </div>
    </div>
  );
}
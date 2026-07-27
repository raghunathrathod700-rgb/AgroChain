import { useCallback, useEffect, useState } from "react";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Shield,
  Search,
  Download,
  Ban,
  CheckCircle,
  BarChart3,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  ActivityLog,
  AdminOrder,
  AdminUser,
  blockAdminUser,
  fetchAdminActivity,
  fetchAdminOrders,
  fetchAdminUsers,
  orderStatusLabel,
  roleLabel,
  unblockAdminUser,
} from "@/lib/agrochain-admin";

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "transactions">("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<"All" | "Farmer" | "Buyer">("All");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionUserId, setActionUserId] = useState<number | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [userRows, orderRows, activityRows] = await Promise.all([
        fetchAdminUsers(),
        fetchAdminOrders(),
        fetchAdminActivity(),
      ]);
      setUsers(userRows.filter((u) => !u.roles.includes("ROLE_ADMIN")));
      setOrders(orderRows);
      setActivity(activityRows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleToggleBlock = async (user: AdminUser) => {
    setActionUserId(user.id);
    try {
      const updated = user.blocked
        ? await unblockAdminUser(user.id)
        : await blockAdminUser(user.id);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed");
    } finally {
      setActionUserId(null);
    }
  };

  const filteredUsers = users.filter((user) => {
    const name = `${user.firstName} ${user.lastName}`;
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone ?? "").includes(searchTerm);
    const label = roleLabel(user.roles);
    const matchesRole =
      filterRole === "All" ||
      (filterRole === "Farmer" && label === "Farmer") ||
      (filterRole === "Buyer" && label === "Buyer");
    return matchesSearch && matchesRole;
  });

  const totalRevenue = orders
    .filter((t) => t.status === "DELIVERED")
    .reduce((sum, t) => sum + Number(t.totalPrice), 0);

  const activeUsers = users.filter((u) => !u.blocked && u.enabled).length;
  const pendingTransactions = orders.filter((t) => t.status === "PENDING").length;
  const totalTransactions = orders.length;
  const farmers = users.filter((u) => roleLabel(u.roles) === "Farmer").length;
  const buyers = users.filter((u) => roleLabel(u.roles) === "Buyer").length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
        <div className="flex items-center gap-3 text-green-700">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="text-lg font-medium">Loading admin data…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-green-100">Live data from local database</p>
            </div>
            <Shield className="h-16 w-16 text-green-200" />
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
            <button
              onClick={() => void loadData()}
              className="ml-auto text-sm font-medium underline"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 border-b">
            {(["overview", "users", "transactions"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-medium transition-colors ${
                  activeTab === tab
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  {tab === "overview" && <BarChart3 className="h-5 w-5" />}
                  {tab === "users" && <Users className="h-5 w-5" />}
                  {tab === "transactions" && <ShoppingCart className="h-5 w-5" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === "users" && ` (${users.length})`}
                  {tab === "transactions" && ` (${orders.length})`}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon={DollarSign} color="green" label="Total Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} />
              <StatCard icon={Users} color="blue" label="Active Users" value={String(activeUsers)} />
              <StatCard icon={ShoppingCart} color="purple" label="Total Transactions" value={String(totalTransactions)} />
              <StatCard icon={Package} color="orange" label="Pending Orders" value={String(pendingTransactions)} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {activity.length === 0 ? (
                    <p className="text-gray-500 text-sm">No activity logged yet.</p>
                  ) : (
                    activity.slice(0, 5).map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">{item.action}</p>
                          <p className="text-sm text-gray-600 truncate">{item.detail}</p>
                        </div>
                        <span className="text-xs text-gray-500 shrink-0">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Platform Stats</h3>
                <div className="space-y-4">
                  <PlatformStat icon={Users} label="Total Farmers" value={farmers} color="green" />
                  <PlatformStat icon={ShoppingCart} label="Total Buyers" value={buyers} color="blue" />
                  <PlatformStat icon={Package} label="Products Listed" value={new Set(orders.map((o) => o.productId)).size} color="purple" />
                  <PlatformStat icon={ShoppingCart} label="Orders in DB" value={orders.length} color="orange" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value as "All" | "Farmer" | "Buyer")}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="All">All Roles</option>
                  <option value="Farmer">Farmers</option>
                  <option value="Buyer">Buyers</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => {
                      const name = `${user.firstName} ${user.lastName}`;
                      const label = roleLabel(user.roles);
                      return (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{name}</div>
                            <div className="text-sm text-gray-500">ID: {user.id}</div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="text-gray-900">{user.email}</div>
                            <div className="text-gray-500">{user.phone ?? "—"}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              label === "Farmer" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                            }`}>
                              {label}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              !user.blocked ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}>
                              {!user.blocked ? "Active" : "Suspended"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              disabled={actionUserId === user.id}
                              onClick={() => void handleToggleBlock(user)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title={user.blocked ? "Unblock user" : "Block user"}
                            >
                              {actionUserId === user.id ? (
                                <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                              ) : (
                                <Ban className={`h-4 w-4 ${user.blocked ? "text-green-600" : "text-red-600"}`} />
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Buyer</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Farmer</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Qty</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(order.orderedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{order.buyerDisplayName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{order.farmerName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{order.productName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{order.quantity}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          ₹{Number(order.totalPrice).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "DELIVERED" ? "bg-green-100 text-green-700"
                              : order.status === "PENDING" ? "bg-yellow-100 text-yellow-700"
                              : order.status === "SHIPPED" ? "bg-blue-100 text-blue-700"
                              : order.status === "REJECTED" ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}>
                            {orderStatusLabel(order.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  color,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  color: "green" | "blue" | "purple" | "orange";
  label: string;
  value: string;
}) {
  const colors = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className={`inline-flex p-3 rounded-lg mb-4 ${colors[color]}`}>
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{label}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function PlatformStat({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: "green" | "blue" | "purple" | "orange";
}) {
  const textColors = {
    green: "text-green-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
  };
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${textColors[color]}`} />
        <span className="font-medium text-gray-900">{label}</span>
      </div>
      <span className={`text-xl font-bold ${textColors[color]}`}>{value}</span>
    </div>
  );
}

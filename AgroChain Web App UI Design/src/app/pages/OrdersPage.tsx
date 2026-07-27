import { useState } from "react";
import { Search, Package, TrendingUp, TrendingDown, IndianRupee, Phone, MessageCircle, Filter, Calendar, MapPin, CheckCircle, Clock, Truck, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { wholesalers } from "@/app/data/wholesalers";
import { fruits } from "@/app/data/fruits";
import { useNavigate } from "react-router";

interface Order {
  id: string;
  orderId: string;
  wholesalerId: string;
  wholesalerName: string;
  fruitName: string;
  quantity: number;
  unit: string;
  ratePerUnit: number;
  totalAmount: number;
  orderDate: string;
  deliveryDate: string;
  status: "Pending" | "Processing" | "In Transit" | "Delivered" | "Cancelled";
  location: string;
  paymentStatus: "Advance Paid" | "Partially Paid" | "Paid" | "Pending";
}

// Generate mock orders data
const generateOrders = (): Order[] => {
  const statuses: Order["status"][] = ["Pending", "Processing", "In Transit", "Delivered", "Cancelled"];
  const paymentStatuses: Order["paymentStatus"][] = ["Advance Paid", "Partially Paid", "Paid", "Pending"];
  
  const orders: Order[] = [];
  let orderCount = 1000;
  
  wholesalers.forEach((wholesaler, index) => {
    const numOrders = Math.floor(Math.random() * 8) + 3; // 3-10 orders per wholesaler
    
    for (let i = 0; i < numOrders; i++) {
      const fruit = fruits[Math.floor(Math.random() * fruits.length)];
      const quantity = Math.floor(Math.random() * 50) + 10;
      const ratePerUnit = fruit.pricePerQuintal;
      const totalAmount = quantity * ratePerUnit;
      
      const orderDate = new Date();
      orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 30));
      
      const deliveryDate = new Date(orderDate);
      deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 10) + 3);
      
      orders.push({
        id: `ORD-${orderCount}`,
        orderId: `AGR${orderCount}`,
        wholesalerId: wholesaler.id,
        wholesalerName: wholesaler.name,
        fruitName: fruit.name,
        quantity,
        unit: "Qtl",
        ratePerUnit,
        totalAmount,
        orderDate: orderDate.toISOString().split('T')[0],
        deliveryDate: deliveryDate.toISOString().split('T')[0],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        location: `${wholesaler.location.city}, ${wholesaler.location.state}`,
        paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)]
      });
      
      orderCount++;
    }
  });
  
  return orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
};

export function OrdersPage() {
  const [orders] = useState<Order[]>(generateOrders());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");

  // Calculate statistics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => {
    if (order.status !== "Cancelled") {
      return sum + order.totalAmount;
    }
    return sum;
  }, 0);
  
  const pendingOrders = orders.filter(o => o.status === "Pending" || o.status === "Processing").length;
  const deliveredOrders = orders.filter(o => o.status === "Delivered").length;

  // Wholesaler statistics
  const wholesalerStats = wholesalers.map(wholesaler => {
    const wholesalerOrders = orders.filter(o => o.wholesalerId === wholesaler.id);
    const totalOrders = wholesalerOrders.length;
    const totalValue = wholesalerOrders.reduce((sum, order) => {
      if (order.status !== "Cancelled") {
        return sum + order.totalAmount;
      }
      return sum;
    }, 0);
    const avgOrderValue = totalOrders > 0 ? totalValue / totalOrders : 0;
    
    return {
      ...wholesaler,
      totalOrders,
      totalValue,
      avgOrderValue,
      pendingOrders: wholesalerOrders.filter(o => o.status === "Pending" || o.status === "Processing").length
    };
  }).sort((a, b) => b.totalOrders - a.totalOrders);

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.wholesalerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.fruitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
        case "amount":
          return b.totalAmount - a.totalAmount;
        case "wholesaler":
          return a.wholesalerName.localeCompare(b.wholesalerName);
        default:
          return 0;
      }
    });

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Processing": return "bg-blue-100 text-blue-800 border-blue-300";
      case "In Transit": return "bg-purple-100 text-purple-800 border-purple-300";
      case "Delivered": return "bg-green-100 text-green-800 border-green-300";
      case "Cancelled": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getPaymentStatusColor = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-800";
      case "Advance Paid": return "bg-blue-100 text-blue-800";
      case "Partially Paid": return "bg-yellow-100 text-yellow-800";
      case "Pending": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Orders Management</h1>
              <p className="text-green-50 text-lg">Track all wholesaler orders and rates in one place</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="tel:+918458902317"
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all"
              >
                <Phone className="h-5 w-5" />
                <span className="font-semibold">Helpline: 8458902317</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-green-200 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900">{totalOrders}</div>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    All time orders
                  </p>
                </div>
                <Package className="h-12 w-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    ₹{(totalRevenue / 10000000).toFixed(2)}Cr
                  </div>
                  <p className="text-xs text-blue-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Total business value
                  </p>
                </div>
                <IndianRupee className="h-12 w-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900">{pendingOrders}</div>
                  <p className="text-xs text-yellow-600 mt-1 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Awaiting processing
                  </p>
                </div>
                <Clock className="h-12 w-12 text-yellow-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Delivered Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900">{deliveredOrders}</div>
                  <p className="text-xs text-emerald-600 mt-1 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Successfully completed
                  </p>
                </div>
                <CheckCircle className="h-12 w-12 text-emerald-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wholesaler Statistics */}
        <Card className="mb-8 border-2 border-green-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Wholesaler Order Statistics</CardTitle>
            <CardDescription>Overview of orders by each wholesaler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">Wholesaler</TableHead>
                    <TableHead className="font-bold">Location</TableHead>
                    <TableHead className="font-bold text-center">Total Orders</TableHead>
                    <TableHead className="font-bold text-center">Pending</TableHead>
                    <TableHead className="font-bold text-right">Total Value</TableHead>
                    <TableHead className="font-bold text-right">Avg Order Value</TableHead>
                    <TableHead className="font-bold text-center">Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wholesalerStats.map((wholesaler) => (
                    <TableRow key={wholesaler.id} className="hover:bg-green-50">
                      <TableCell className="font-semibold">
                        <div>
                          <div className="text-gray-900">{wholesaler.name}</div>
                          <div className="text-xs text-gray-500">{wholesaler.companyName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {wholesaler.location.city}, {wholesaler.location.state}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          {wholesaler.totalOrders}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {wholesaler.pendingOrders > 0 ? (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                            {wholesaler.pendingOrders}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-gray-900">
                        ₹{(wholesaler.totalValue / 100000).toFixed(2)}L
                      </TableCell>
                      <TableCell className="text-right text-gray-600">
                        ₹{(wholesaler.avgOrderValue / 1000).toFixed(0)}K
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button 
                            onClick={() => navigate('/messages')}
                            className="p-1.5 hover:bg-green-100 rounded-lg transition-colors"
                            title="Private Chat"
                          >
                            <MessageCircle className="h-4 w-4 text-green-600" />
                          </button>
                          <button 
                            onClick={() => {
                              alert('Connecting call to ' + wholesaler.name + '...');
                            }}
                            className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Call"
                          >
                            <Phone className="h-4 w-4 text-blue-600" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <Card className="border-2 border-green-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">All Orders</CardTitle>
            <CardDescription>Complete list of all orders with details and rates</CardDescription>
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by wholesaler, fruit, or order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-green-300 focus:border-green-500"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 border-green-300">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48 border-green-300">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Newest)</SelectItem>
                  <SelectItem value="amount">Amount (Highest)</SelectItem>
                  <SelectItem value="wholesaler">Wholesaler (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">Order ID</TableHead>
                    <TableHead className="font-bold">Wholesaler</TableHead>
                    <TableHead className="font-bold">Fruit</TableHead>
                    <TableHead className="font-bold text-right">Quantity</TableHead>
                    <TableHead className="font-bold text-right">Rate/Qtl</TableHead>
                    <TableHead className="font-bold text-right">Total Amount</TableHead>
                    <TableHead className="font-bold">Order Date</TableHead>
                    <TableHead className="font-bold">Delivery Date</TableHead>
                    <TableHead className="font-bold text-center">Status</TableHead>
                    <TableHead className="font-bold text-center">Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-green-50">
                      <TableCell className="font-mono text-sm font-semibold text-green-700">
                        {order.orderId}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold text-gray-900">{order.wholesalerName}</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {order.location}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">{order.fruitName}</TableCell>
                      <TableCell className="text-right font-semibold">
                        {order.quantity} {order.unit}
                      </TableCell>
                      <TableCell className="text-right text-gray-700">
                        ₹{order.ratePerUnit.toLocaleString('en-IN')}
                      </TableCell>
                      <TableCell className="text-right font-bold text-green-700">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {order.orderDate}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        <div className="flex items-center">
                          <Truck className="h-3 w-3 mr-1" />
                          {order.deliveryDate}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${getStatusColor(order.status)} border`}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredOrders.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p className="text-lg">No orders found matching your criteria</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Helpline Card for Mobile */}
        <Card className="md:hidden mt-8 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Need Help?</h3>
              <a
                href="tel:+918458902317"
                className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all font-semibold"
              >
                <Phone className="h-5 w-5" />
                <span>Call Helpline: 8458902317</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
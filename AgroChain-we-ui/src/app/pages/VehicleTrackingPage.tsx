import { useState } from "react";
import { Truck, MapPin, Clock, Package, Phone, User, Navigation, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

interface Vehicle {
  id: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  currentLocation: string;
  destination: string;
  status: "in-transit" | "loading" | "delivered" | "delayed";
  progress: number;
  orderId: string;
  product: string;
  quantity: string;
  estimatedTime: string;
  lastUpdate: string;
  route: string[];
}

export function VehicleTrackingPage() {
  const [vehicles] = useState<Vehicle[]>([
    {
      id: "VH-001",
      vehicleNumber: "MH 02 AB 1234",
      driverName: "Ramesh Yadav",
      driverPhone: "+91 98765 43210",
      currentLocation: "Nashik, Maharashtra",
      destination: "Delhi Market, Delhi",
      status: "in-transit",
      progress: 65,
      orderId: "MO-2345",
      product: "Alphonso Mangoes",
      quantity: "50 Quintals",
      estimatedTime: "4 hours",
      lastUpdate: "2 mins ago",
      route: ["Mumbai", "Nashik", "Indore", "Jaipur", "Delhi"]
    },
    {
      id: "VH-002",
      vehicleNumber: "GJ 01 CD 5678",
      driverName: "Suresh Patel",
      driverPhone: "+91 98765 43211",
      currentLocation: "Anand, Gujarat",
      destination: "Mumbai Market, Mumbai",
      status: "loading",
      progress: 20,
      orderId: "AP-1234",
      product: "Fresh Apples",
      quantity: "30 Quintals",
      estimatedTime: "Loading in progress",
      lastUpdate: "5 mins ago",
      route: ["Anand", "Vadodara", "Surat", "Mumbai"]
    },
    {
      id: "VH-003",
      vehicleNumber: "KA 03 EF 9012",
      driverName: "Vinod Kumar",
      driverPhone: "+91 98765 43212",
      currentLocation: "Delivered",
      destination: "Bangalore Market, Karnataka",
      status: "delivered",
      progress: 100,
      orderId: "OR-5678",
      product: "Nagpur Oranges",
      quantity: "40 Quintals",
      estimatedTime: "Delivered",
      lastUpdate: "1 hour ago",
      route: ["Nagpur", "Hyderabad", "Bangalore"]
    },
    {
      id: "VH-004",
      vehicleNumber: "UP 16 GH 3456",
      driverName: "Rajesh Singh",
      driverPhone: "+91 98765 43213",
      currentLocation: "Agra, Uttar Pradesh",
      destination: "Kolkata Market, West Bengal",
      status: "delayed",
      progress: 45,
      orderId: "BA-9012",
      product: "Cavendish Bananas",
      quantity: "60 Quintals",
      estimatedTime: "8 hours (Delayed)",
      lastUpdate: "30 mins ago",
      route: ["Agra", "Kanpur", "Lucknow", "Patna", "Kolkata"]
    }
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(vehicles[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-transit":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "loading":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-300";
      case "delayed":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 className="h-4 w-4" />;
      case "delayed":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Truck className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Vehicle Tracking System
          </h1>
          <p className="text-gray-600">Real-time tracking of your shipments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">In Transit</p>
                  <p className="text-3xl font-bold">
                    {vehicles.filter(v => v.status === "in-transit").length}
                  </p>
                </div>
                <Truck className="h-10 w-10 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm mb-1">Loading</p>
                  <p className="text-3xl font-bold">
                    {vehicles.filter(v => v.status === "loading").length}
                  </p>
                </div>
                <Package className="h-10 w-10 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm mb-1">Delivered</p>
                  <p className="text-3xl font-bold">
                    {vehicles.filter(v => v.status === "delivered").length}
                  </p>
                </div>
                <CheckCircle2 className="h-10 w-10 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm mb-1">Delayed</p>
                  <p className="text-3xl font-bold">
                    {vehicles.filter(v => v.status === "delayed").length}
                  </p>
                </div>
                <AlertCircle className="h-10 w-10 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Vehicle List */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-green-700">Active Vehicles</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      onClick={() => setSelectedVehicle(vehicle)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedVehicle?.id === vehicle.id
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{vehicle.vehicleNumber}</p>
                          <p className="text-sm text-gray-600">{vehicle.product}</p>
                        </div>
                        <Badge className={getStatusColor(vehicle.status)}>
                          {vehicle.status}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            vehicle.status === "delivered"
                              ? "bg-green-600"
                              : vehicle.status === "delayed"
                              ? "bg-red-600"
                              : "bg-blue-600"
                          }`}
                          style={{ width: `${vehicle.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{vehicle.progress}% Complete</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vehicle Details */}
          <div className="lg:col-span-2">
            {selectedVehicle && (
              <div className="space-y-6">
                {/* Map Placeholder */}
                <Card className="shadow-lg border-green-200">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-green-100 via-blue-100 to-emerald-100 h-80 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <line x1="10" y1="80" x2="30" y2="60" stroke="#059669" strokeWidth="2" />
                          <line x1="30" y1="60" x2="50" y2="50" stroke="#059669" strokeWidth="2" />
                          <line x1="50" y1="50" x2="70" y2="30" stroke="#059669" strokeWidth="2" />
                          <line x1="70" y1="30" x2="90" y2="20" stroke="#059669" strokeWidth="2" />
                        </svg>
                      </div>
                      <div className="text-center z-10">
                        <Navigation className="h-16 w-16 text-green-600 mx-auto mb-4 animate-pulse" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Tracking</h3>
                        <p className="text-gray-600">Tracking {selectedVehicle.vehicleNumber}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Last updated: {selectedVehicle.lastUpdate}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Vehicle Info */}
                <Card className="shadow-lg border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-700 flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        {selectedVehicle.vehicleNumber}
                      </CardTitle>
                      <Badge className={`${getStatusColor(selectedVehicle.status)} flex items-center gap-1`}>
                        {getStatusIcon(selectedVehicle.status)}
                        {selectedVehicle.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Tabs defaultValue="details">
                      <TabsList className="mb-4">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="route">Route</TabsTrigger>
                        <TabsTrigger value="driver">Driver</TabsTrigger>
                      </TabsList>

                      <TabsContent value="details" className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 bg-green-50 rounded-lg">
                            <div className="flex items-start gap-3">
                              <Package className="h-5 w-5 text-green-600 mt-1" />
                              <div>
                                <p className="text-sm text-gray-600">Order ID</p>
                                <p className="font-semibold text-gray-900">{selectedVehicle.orderId}</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-green-50 rounded-lg">
                            <div className="flex items-start gap-3">
                              <Package className="h-5 w-5 text-green-600 mt-1" />
                              <div>
                                <p className="text-sm text-gray-600">Product</p>
                                <p className="font-semibold text-gray-900">{selectedVehicle.product}</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-start gap-3">
                              <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                              <div>
                                <p className="text-sm text-gray-600">Current Location</p>
                                <p className="font-semibold text-gray-900">{selectedVehicle.currentLocation}</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-start gap-3">
                              <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                              <div>
                                <p className="text-sm text-gray-600">Destination</p>
                                <p className="font-semibold text-gray-900">{selectedVehicle.destination}</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-yellow-50 rounded-lg">
                            <div className="flex items-start gap-3">
                              <Clock className="h-5 w-5 text-yellow-600 mt-1" />
                              <div>
                                <p className="text-sm text-gray-600">Estimated Time</p>
                                <p className="font-semibold text-gray-900">{selectedVehicle.estimatedTime}</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-yellow-50 rounded-lg">
                            <div className="flex items-start gap-3">
                              <Package className="h-5 w-5 text-yellow-600 mt-1" />
                              <div>
                                <p className="text-sm text-gray-600">Quantity</p>
                                <p className="font-semibold text-gray-900">{selectedVehicle.quantity}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6">
                          <p className="text-sm text-gray-600 mb-3">Progress</p>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                              className={`h-4 rounded-full flex items-center justify-end pr-2 text-xs text-white font-semibold ${
                                selectedVehicle.status === "delivered"
                                  ? "bg-green-600"
                                  : selectedVehicle.status === "delayed"
                                  ? "bg-red-600"
                                  : "bg-blue-600"
                              }`}
                              style={{ width: `${selectedVehicle.progress}%` }}
                            >
                              {selectedVehicle.progress}%
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="route" className="space-y-3">
                        <p className="text-sm text-gray-600 mb-4">Delivery Route</p>
                        {selectedVehicle.route.map((location, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  index < selectedVehicle.route.length * (selectedVehicle.progress / 100)
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                              >
                                {index + 1}
                              </div>
                              {index < selectedVehicle.route.length - 1 && (
                                <div className="w-0.5 h-12 bg-gray-300"></div>
                              )}
                            </div>
                            <div className="flex-1 p-3 bg-white border border-gray-200 rounded-lg">
                              <p className="font-semibold text-gray-900">{location}</p>
                            </div>
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="driver" className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                            <User className="h-8 w-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-lg">{selectedVehicle.driverName}</h4>
                            <p className="text-sm text-gray-600">Driver</p>
                          </div>
                        </div>
                        <div className="p-4 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3 mb-4">
                            <Phone className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="text-sm text-gray-600">Phone Number</p>
                              <p className="font-semibold text-gray-900">{selectedVehicle.driverPhone}</p>
                            </div>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                            <Phone className="h-4 w-4 mr-2" />
                            Call Driver
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

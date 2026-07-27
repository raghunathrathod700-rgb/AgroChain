import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Truck, MapPin, Clock, RefreshCw, Database } from "lucide-react";

interface FruitRate {
  name: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  unit: string;
  quality: string;
  lastUpdated: string;
}

interface Vehicle {
  id: string;
  driver: string;
  from: string;
  to: string;
  cargo: string;
  quantity: string;
  status: "In Transit" | "Delivered" | "Loading" | "Delayed";
  currentLocation: string;
  eta: string;
  lastUpdate: string;
}

// Simulate dynamic market rates
const generateDynamicRates = (): FruitRate[] => {
  const baseRates = [
    { name: "Apple", base: 8500, unit: "Qtl" },
    { name: "Mango", base: 6500, unit: "Qtl" },
    { name: "Orange", base: 4500, unit: "Qtl" },
    { name: "Banana", base: 3500, unit: "Qtl" },
    { name: "Grapes", base: 7500, unit: "Qtl" },
    { name: "Watermelon", base: 2500, unit: "Qtl" },
    { name: "Pomegranate", base: 9500, unit: "Qtl" },
    { name: "Papaya", base: 3000, unit: "Qtl" },
  ];

  return baseRates.map(fruit => {
    const variation = (Math.random() - 0.5) * 1000; // ±500 variation
    const currentPrice = Math.round(fruit.base + variation);
    const previousPrice = Math.round(fruit.base);
    const change = ((currentPrice - previousPrice) / previousPrice) * 100;

    return {
      name: fruit.name,
      currentPrice,
      previousPrice,
      change: parseFloat(change.toFixed(2)),
      unit: fruit.unit,
      quality: "Grade A",
      lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
  });
};

const vehicleData: Vehicle[] = [
  {
    id: "MH12AB1234",
    driver: "Rajesh Kumar",
    from: "Nashik, Maharashtra",
    to: "Mumbai, Maharashtra",
    cargo: "Grapes",
    quantity: "12 Tons",
    status: "In Transit",
    currentLocation: "Thane",
    eta: "2 hours",
    lastUpdate: "15 mins ago"
  },
  {
    id: "GJ01CD5678",
    driver: "Amit Patel",
    from: "Ahmedabad, Gujarat",
    to: "Delhi",
    cargo: "Mangoes",
    quantity: "8 Tons",
    status: "Loading",
    currentLocation: "Ahmedabad",
    eta: "12 hours",
    lastUpdate: "5 mins ago"
  },
  {
    id: "KA05EF9012",
    driver: "Suresh Reddy",
    from: "Bangalore, Karnataka",
    to: "Chennai, Tamil Nadu",
    cargo: "Bananas",
    quantity: "15 Tons",
    status: "Delivered",
    currentLocation: "Chennai",
    eta: "Delivered",
    lastUpdate: "30 mins ago"
  },
  {
    id: "UP16GH3456",
    driver: "Vikram Singh",
    from: "Lucknow, Uttar Pradesh",
    to: "Kolkata, West Bengal",
    cargo: "Apples",
    quantity: "10 Tons",
    status: "In Transit",
    currentLocation: "Patna",
    eta: "8 hours",
    lastUpdate: "1 hour ago"
  },
];

export function MarketDataDashboard() {
  const [fruitRates, setFruitRates] = useState<FruitRate[]>([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    // Initial load
    setFruitRates(generateDynamicRates());

    // Auto-refresh every 30 seconds if enabled
    if (autoRefresh) {
      const interval = setInterval(() => {
        setFruitRates(generateDynamicRates());
        setLastRefresh(new Date());
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleManualRefresh = () => {
    setFruitRates(generateDynamicRates());
    setLastRefresh(new Date());
  };

  const getStatusColor = (status: Vehicle["status"]) => {
    switch (status) {
      case "In Transit":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Loading":
        return "bg-yellow-100 text-yellow-700";
      case "Delayed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-xl">
            <Database className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Live Market Data</h2>
            <p className="text-sm text-gray-600">
              Last updated: {lastRefresh.toLocaleTimeString('en-IN')}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded text-green-600 focus:ring-green-500"
            />
            <span>Auto-refresh</span>
          </label>
          <button
            onClick={handleManualRefresh}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Daily Fruit Rates */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white">Today's Fruit Rates</h3>
          <p className="text-green-100 text-sm">Updated every 30 seconds based on market demand</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fruit Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Previous Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quality
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fruitRates.map((fruit, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{fruit.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-bold text-green-600">
                      ₹{fruit.currentPrice.toLocaleString('en-IN')}
                      <span className="text-xs text-gray-500 ml-1">/{fruit.unit}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    ₹{fruit.previousPrice.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center ${fruit.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {fruit.change >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span className="font-semibold">{Math.abs(fruit.change)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {fruit.quality}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {fruit.lastUpdated}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vehicle Tracker */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Truck className="h-6 w-6 mr-2" />
            Live Vehicle Tracker
          </h3>
          <p className="text-blue-100 text-sm">Real-time tracking of fruit transportation vehicles</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {vehicleData.map((vehicle) => (
              <div
                key={vehicle.id}
                className="border-2 border-gray-200 rounded-lg p-5 hover:border-green-500 transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{vehicle.id}</div>
                    <div className="text-sm text-gray-600">{vehicle.driver}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-semibold text-gray-700">Route</div>
                      <div className="text-gray-600">{vehicle.from} → {vehicle.to}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-semibold text-gray-700">Cargo: </span>
                      <span className="text-gray-600">{vehicle.cargo}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-gray-700">Qty: </span>
                      <span className="text-gray-600">{vehicle.quantity}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-gray-500">Current: </span>
                        <span className="font-medium text-gray-900">{vehicle.currentLocation}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">ETA: </span>
                        <span className="font-medium text-blue-600">{vehicle.eta}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Updated {vehicle.lastUpdate}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

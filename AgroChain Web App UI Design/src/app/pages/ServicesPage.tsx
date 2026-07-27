import { useState } from "react";
import { 
  Shield, 
  TrendingUp, 
  Truck, 
  CheckCircle, 
  BarChart3, 
  Globe2, 
  Award, 
  Lock,
  MapPin,
  Phone,
  Star,
  Building2,
  Calendar,
  Package,
  ShieldCheck,
  Search,
  MessageCircle
} from "lucide-react";
import { wholesalers } from "@/app/data/wholesalers";
import { useNavigate } from "react-router";

export function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");

  const services = [
    {
      icon: Shield,
      title: "Blockchain Traceability",
      description: "Every transaction is recorded on an immutable blockchain ledger, providing complete transparency from farm to buyer. Track your produce's journey with confidence.",
      features: [
        "Immutable transaction records",
        "Real-time tracking",
        "Quality certification",
        "Origin verification"
      ]
    },
    {
      icon: TrendingUp,
      title: "Transparent Pricing",
      description: "Fair market prices displayed in ₹ INR per Quintal and Ton. No hidden fees, no middlemen markups. See exactly what you're paying or earning.",
      features: [
        "Real-time market rates",
        "Historical price data",
        "Price comparison tools",
        "Fair trade guarantee"
      ]
    },
    {
      icon: Truck,
      title: "Supply Chain Management",
      description: "End-to-end logistics support connecting farmers directly to buyers. We handle the complexity so you can focus on quality.",
      features: [
        "Direct farmer-to-buyer connection",
        "Logistics coordination",
        "Cold storage facilities",
        "Export documentation support"
      ]
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "Rigorous quality checks and certifications ensure buyers receive premium produce and farmers get fair compensation for quality goods.",
      features: [
        "Multi-point quality inspection",
        "Organic certification",
        "Grade standardization",
        "Quality guarantee"
      ]
    },
    {
      icon: BarChart3,
      title: "Market Analytics",
      description: "Access real-time market insights, pricing trends, and demand forecasts to make informed trading decisions.",
      features: [
        "Price trend analysis",
        "Demand forecasting",
        "Seasonal insights",
        "Competitive intelligence"
      ]
    },
    {
      icon: Globe2,
      title: "Global Market Access",
      description: "Connect with buyers and suppliers from over 50 countries. Export your produce or source globally with ease.",
      features: [
        "International buyer network",
        "Multi-currency support",
        "Export compliance",
        "Global shipping partners"
      ]
    },
    {
      icon: Award,
      title: "Farmer Support Programs",
      description: "Training, financial assistance, and technology support to help farmers maximize their yields and market reach.",
      features: [
        "Agricultural training",
        "Technology adoption support",
        "Financial literacy programs",
        "Equipment financing"
      ]
    },
    {
      icon: Lock,
      title: "Secure Payments",
      description: "Bank-grade security for all transactions. Escrow services protect both buyers and sellers throughout the transaction.",
      features: [
        "Escrow protection",
        "Multiple payment methods",
        "Instant settlements",
        "Fraud prevention"
      ]
    }
  ];

  // Get unique states for filtering
  const states = ["All", ...new Set(wholesalers.flatMap(w => w.servingStates))].sort();

  // Filter wholesalers based on search and state
  const filteredWholesalers = wholesalers.filter(wholesaler => {
    const matchesSearch = 
      wholesaler.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wholesaler.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wholesaler.location.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wholesaler.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      wholesaler.preferredFruits.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesState = selectedState === "All" || wholesaler.servingStates.includes(selectedState);
    
    return matchesSearch && matchesState;
  });

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Comprehensive solutions for modern agriculture trading • Blockchain-powered • Farmer-focused
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Services</h2>
            <p className="text-xl text-gray-600">Everything you need for successful agriculture trading</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-green-500 hover:shadow-xl transition-all"
              >
                <div className="flex items-start mb-6">
                  <div className="bg-green-100 p-4 rounded-xl mr-4">
                    <service.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesalers Directory Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full mb-4">
              <Building2 className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-600">Verified Wholesalers Network</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Trusted <span className="text-green-600">Wholesalers</span> Directory
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with verified wholesale buyers across India. All wholesalers are KYC verified and have established trading history.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, city, fruits, or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state === "All" ? "All States" : `Serving ${state}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-700">
              Showing <span className="font-semibold text-green-600">{filteredWholesalers.length}</span> wholesalers
            </p>
          </div>

          {/* Wholesalers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredWholesalers.map((wholesaler) => (
              <div
                key={wholesaler.id}
                className="bg-gradient-to-br from-white to-green-50 border-2 border-green-100 rounded-2xl p-8 hover:shadow-2xl hover:border-green-400 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{wholesaler.name}</h3>
                      {wholesaler.verified && (
                        <ShieldCheck className="h-6 w-6 text-green-600 ml-2" />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{wholesaler.companyName}</p>
                  </div>
                  <div className="flex items-center bg-white rounded-lg px-3 py-1 shadow-sm">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{wholesaler.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({wholesaler.reviews})</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start mb-4">
                  <MapPin className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-900 font-medium">
                      {wholesaler.location.city}, {wholesaler.location.state}
                    </p>
                    <p className="text-sm text-gray-600">{wholesaler.location.country}</p>
                  </div>
                </div>

                {/* Specialization */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Specialization:</p>
                  <div className="flex flex-wrap gap-2">
                    {wholesaler.specialization.map((spec, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preferred Fruits */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Preferred Fruits:</p>
                  <div className="flex flex-wrap gap-2">
                    {wholesaler.preferredFruits.map((fruit, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white border border-green-200 text-gray-700 rounded-full text-xs"
                      >
                        {fruit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Business Info */}
                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-green-200">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-green-600 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Experience</p>
                      <p className="text-sm font-semibold">{wholesaler.yearsInBusiness} years</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Package className="h-4 w-4 text-green-600 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Trading Volume</p>
                      <p className="text-sm font-semibold">{wholesaler.tradingVolume}</p>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Certifications:</p>
                  <div className="flex flex-wrap gap-2">
                    {wholesaler.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium flex items-center"
                      >
                        <Award className="h-3 w-3 mr-1" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Serving States */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Serving States:</p>
                  <p className="text-sm text-gray-600">{wholesaler.servingStates.join(", ")}</p>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl p-4 mb-4 border border-green-200">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Contact Person:</p>
                  <div className="flex items-center text-sm mb-4">
                    <Building2 className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{wholesaler.contactPerson}</span>
                  </div>
                  
                  <p className="text-xs text-gray-500 mb-3">Contact through:</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate('/messages')}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Private Chat
                    </button>
                    <button
                      onClick={() => {
                        // Simulate call through app
                        alert('Connecting call to ' + wholesaler.name + '...');
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <Phone className="h-4 w-4" />
                      Call
                    </button>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => navigate(`/wholesalers/${wholesaler.id}`)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Wholesaler
                </button>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredWholesalers.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-2">No wholesalers found</p>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedState("All");
                }}
                className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of farmers and buyers trading on AgroChain
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Start Trading
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 rounded-lg font-medium transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
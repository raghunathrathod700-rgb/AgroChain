import { useState } from "react";
import { Search, MapPin, MessageCircle, Star, TrendingUp, Shield, Award, Phone } from "lucide-react";
import { useNavigate } from "react-router";

interface Wholesaler {
  id: number;
  name: string;
  location: string;
  state: string;
  rating: number;
  specialization: string[];
  verified: boolean;
  yearsInBusiness: number;
  monthlyVolume: string;
}

const wholesalersData: Wholesaler[] = [
  {
    id: 1,
    name: "Fresh Fruits Trading Co.",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    rating: 4.8,
    specialization: ["Apples", "Grapes", "Oranges", "Pomegranates"],
    verified: true,
    yearsInBusiness: 15,
    monthlyVolume: "500+ Tons"
  },
  {
    id: 2,
    name: "Agri Wholesale Hub",
    location: "Delhi",
    state: "Delhi",
    rating: 4.9,
    specialization: ["Mangoes", "Watermelons", "Bananas", "Papayas"],
    verified: true,
    yearsInBusiness: 20,
    monthlyVolume: "800+ Tons"
  },
  {
    id: 3,
    name: "South India Fruits Corporation",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    rating: 4.7,
    specialization: ["Coconuts", "Bananas", "Papayas", "Guavas"],
    verified: true,
    yearsInBusiness: 12,
    monthlyVolume: "400+ Tons"
  },
  {
    id: 4,
    name: "Gujarat Fruit Merchants",
    location: "Ahmedabad, Gujarat",
    state: "Gujarat",
    rating: 4.6,
    specialization: ["Mangoes", "Chikoo", "Custard Apples", "Oranges"],
    verified: true,
    yearsInBusiness: 18,
    monthlyVolume: "600+ Tons"
  },
  {
    id: 5,
    name: "Punjab Fresh Produce",
    location: "Ludhiana, Punjab",
    state: "Punjab",
    rating: 4.5,
    specialization: ["Apples", "Peaches", "Plums", "Cherries"],
    verified: true,
    yearsInBusiness: 10,
    monthlyVolume: "350+ Tons"
  },
  {
    id: 6,
    name: "West Bengal Wholesale Market",
    location: "Kolkata, West Bengal",
    state: "West Bengal",
    rating: 4.8,
    specialization: ["Lychees", "Bananas", "Mangoes", "Pineapples"],
    verified: true,
    yearsInBusiness: 14,
    monthlyVolume: "450+ Tons"
  },
  {
    id: 7,
    name: "Tamil Nadu Fruit Traders",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    rating: 4.7,
    specialization: ["Bananas", "Jackfruits", "Guavas", "Papayas"],
    verified: true,
    yearsInBusiness: 16,
    monthlyVolume: "550+ Tons"
  },
  {
    id: 8,
    name: "Madhya Pradesh Agro Hub",
    location: "Indore, Madhya Pradesh",
    state: "Madhya Pradesh",
    rating: 4.6,
    specialization: ["Oranges", "Guavas", "Pomegranates", "Custard Apples"],
    verified: true,
    yearsInBusiness: 11,
    monthlyVolume: "300+ Tons"
  }
];

export function WholesalersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("All");

  const states = ["All", ...Array.from(new Set(wholesalersData.map(w => w.state)))];

  const filteredWholesalers = wholesalersData.filter(wholesaler => {
    const matchesSearch = wholesaler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wholesaler.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wholesaler.specialization.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesState = selectedState === "All" || wholesaler.state === selectedState;
    
    return matchesSearch && matchesState;
  });

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-12 md:py-16 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-slideDown">
              Verified Wholesalers Directory
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto animate-slideUp">
              Connect with trusted wholesale fruit buyers across India. All wholesalers are verified and rated by our community.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6 md:py-8 bg-white shadow-md sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, location, or fruit type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            >
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="mt-4 text-sm text-gray-600 font-medium">
            Showing {filteredWholesalers.length} verified wholesaler{filteredWholesalers.length !== 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Wholesalers Grid */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredWholesalers.map((wholesaler, index) => (
              <div
                key={wholesaler.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1 truncate">
                        {wholesaler.name}
                      </h3>
                      <div className="flex items-center text-green-100 text-xs md:text-sm">
                        <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{wholesaler.location}</span>
                      </div>
                    </div>
                    {wholesaler.verified && (
                      <div className="bg-white rounded-full p-1 ml-2 flex-shrink-0 animate-pulse">
                        <Shield className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 font-bold text-gray-900">{wholesaler.rating}</span>
                      <span className="ml-1 text-gray-500 text-sm">/5.0</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="h-4 w-4 mr-1 text-green-600" />
                      {wholesaler.yearsInBusiness} years
                    </div>
                  </div>

                  {/* Volume */}
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-gray-700">
                      <span className="font-semibold">Monthly Volume:</span> {wholesaler.monthlyVolume}
                    </span>
                  </div>

                  {/* Specialization */}
                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-2">Specializes in:</div>
                    <div className="flex flex-wrap gap-2">
                      {wholesaler.specialization.map((fruit, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          {fruit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="border-t pt-4">
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
                </div>
              </div>
            ))}
          </div>

          {filteredWholesalers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No wholesalers found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedState("All");
                }}
                className="mt-4 text-green-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600">{wholesalersData.length}+</div>
              <div className="text-gray-600 mt-2">Verified Wholesalers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">15+</div>
              <div className="text-gray-600 mt-2">States Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">4.7</div>
              <div className="text-gray-600 mt-2">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">3500+</div>
              <div className="text-gray-600 mt-2">Tons Monthly</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
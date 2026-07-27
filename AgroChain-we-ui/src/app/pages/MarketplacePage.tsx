import { useState } from "react";
import { fruits, Fruit } from "@/app/data/fruits";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Search, Star, MapPin, ShieldCheck, TrendingUp, Mail, X, MessageCircle, Wallet, Phone } from "lucide-react";
import { DealInitiator } from "@/app/components/DealInitiator";
import { useNavigate } from "react-router";

export function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null);

  const filteredFruits = fruits.filter(fruit => {
    const matchesSearch = fruit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fruit.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Global Fruit Marketplace</h1>
          <p className="text-lg md:text-xl text-green-100 mb-6 md:mb-8">
            Browse 20+ fruit varieties from verified farmers across India • Prices in ₹ INR per Quintal/Ton
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search fruits, location, farmer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Products Grid */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {filteredFruits.length} Products Available
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Blockchain verified • Fair pricing • Direct from farmers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredFruits.map((fruit) => (
              <FruitCard key={fruit.id} fruit={fruit} onSelect={setSelectedFruit} />
            ))}
          </div>

          {filteredFruits.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No fruits found matching your criteria</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contact Modal */}
      {selectedFruit && (
        <ContactModal fruit={selectedFruit} onClose={() => setSelectedFruit(null)} />
      )}
    </div>
  );
}

function FruitCard({ fruit, onSelect }: { fruit: Fruit, onSelect: (fruit: Fruit) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={fruit.imageUrl}
          alt={fruit.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {fruit.blockchainVerified && (
          <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-full flex items-center text-xs">
            <ShieldCheck className="h-3 w-3 mr-1" />
            Verified
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{fruit.name}</h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900">{fruit.rating}</span>
            <span className="ml-1 text-sm text-gray-500">({fruit.reviews})</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-2xl font-bold text-green-600">
            ₹{fruit.pricePerQuintal.toLocaleString()}{" "}
            <span className="text-sm font-normal text-gray-500">/ Qtl</span>
          </div>
          <div className="text-sm text-gray-600">
            ₹{fruit.pricePerTon.toLocaleString()} / Ton
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-start text-sm text-gray-600">
            <TrendingUp className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
            <span>Available: {fruit.availableQuantity} {fruit.unit}</span>
          </div>
          <div className="flex items-start text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
            <span>{fruit.location}</span>
          </div>
        </div>

        <div className="border-t pt-3 mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Farmer:</span> {fruit.farmerName}
          </p>
        </div>

        <button
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg transform hover:scale-105"
          onClick={() => onSelect(fruit)}
        >
          Contact Farmer
        </button>
      </div>
    </div>
  );
}

function ContactModal({ fruit, onClose }: { fruit: Fruit, onClose: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Contact Farmer</h2>
            <p className="text-sm text-gray-600">{fruit.name} from {fruit.location}</p>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Farmer Details */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Farmer Information</h3>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 w-20">Name:</span>
              <span className="text-gray-600">{fruit.farmerName}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 text-green-600 mr-2" />
              <span className="font-medium text-gray-700 w-20">Location:</span>
              <span className="text-gray-600">{fruit.location}</span>
            </div>
            
            {/* Contact Options */}
            <div className="pt-2 border-t border-green-200">
              <p className="text-xs text-gray-500 mb-2">Contact through:</p>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/messages')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <MessageCircle className="h-4 w-4" />
                  Private Chat
                </button>
                <button
                  onClick={() => {
                    // Simulate call through app
                    alert('Connecting call to ' + fruit.farmerName + '...');
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="border-2 border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Price per Quintal:</span>
              <p className="font-bold text-green-600 text-lg">₹{fruit.pricePerQuintal.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-gray-600">Price per Ton:</span>
              <p className="font-bold text-green-600 text-lg">₹{fruit.pricePerTon.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-gray-600">Available Quantity:</span>
              <p className="font-semibold text-gray-900">{fruit.availableQuantity} {fruit.unit}</p>
            </div>
            <div>
              <span className="text-gray-600">Quality:</span>
              <p className="font-semibold text-gray-900">Grade A</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
          <DealInitiator
            productName={fruit.name}
            pricePerUnit={fruit.pricePerQuintal}
            unit="Qtl"
            sellerName={fruit.farmerName}
            sellerRole="Farmer"
          />
        </div>
      </div>
    </div>
  );
}
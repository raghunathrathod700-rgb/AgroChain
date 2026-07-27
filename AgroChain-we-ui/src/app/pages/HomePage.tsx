import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { 
  Leaf, 
  Shield, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Globe,
  Truck,
  Award,
  Star,
  Clock,
  BarChart3
} from "lucide-react";
import Slider from "react-slick";
import { fruits } from "@/app/data/fruits";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function HomePage() {
  // Slider settings for wholesale fruits carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  // Mixed fruits slider images
  const mixedFruitImages = [
    "https://images.unsplash.com/photo-1743760000723-a0ab55671dbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1peGVkJTIwZnJ1aXRzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzcyNTQzNTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1716141458506-af5fe16bda11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3NvcnRlZCUyMHRyb3BpY2FsJTIwZnJ1aXRzfGVufDF8fHx8MTc3MjU0MzUxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1731085906221-939034e41266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMG1hcmtldCUyMHZhcmlldHl8ZW58MXx8fHwxNzcyNTQzNTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1765979831355-9516e47f0aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZnJ1aXQlMjBiYXNrZXR8ZW58MXx8fHwxNzcyNTA5OTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIyYzU1ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md">
                <Leaf className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-600">India's #1 Blockchain Agriculture Platform</span>
              </div>
              <h1 className="text-6xl font-bold text-gray-900 leading-tight">
                Direct Farmer to <span className="text-green-600">Wholesalers</span> Trade Platform
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Connect farmers, buyers, and distributors worldwide. Trade premium quality fruits with 
                complete transparency, fair prices in <span className="font-semibold text-green-600">₹ INR</span>, 
                and blockchain-verified authenticity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Start Trading Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/marketplace"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-700 bg-white border-2 border-green-600 hover:bg-green-50 rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Browse Marketplace
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-1">10K+</div>
                  <div className="text-sm text-gray-600">Active Farmers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-1">5K+</div>
                  <div className="text-sm text-gray-600">Global Buyers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-1">₹50Cr+</div>
                  <div className="text-sm text-gray-600">Trade Volume</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-2xl opacity-20"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1563356553-26692f52e856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBwbGFudGF0aW9uJTIwZmFybSUyMGluZGlhfGVufDF8fHx8MTc3MDE5NjY4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Banana Plantation Farm India"
                className="relative rounded-3xl shadow-2xl w-full h-[550px] object-cover border-4 border-white"
              />
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-green-100 rounded-full p-3">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">+45%</div>
                    <div className="text-sm text-gray-600">Farmer Income</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">vs traditional markets</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wholesale Fruits Slider Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full mb-4">
              <Leaf className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-600">Premium Wholesale Selection</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Fresh <span className="text-green-600">Wholesale</span> Fruits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our vast collection of 20+ premium fruit varieties with guaranteed quality, 
              competitive wholesale prices, and blockchain verification
            </p>
          </div>

          {/* Mixed Fruits Banner Slider */}
          <div className="mb-12">
            <Slider {...sliderSettings}>
              {mixedFruitImages.map((imageUrl, index) => (
                <div key={index} className="px-3">
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src={imageUrl}
                      alt={`Mixed Fruits ${index + 1}`}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">Fresh Wholesale Fruits</h3>
                      <p className="text-sm text-green-100">Premium Quality • Blockchain Verified • Direct from Farmers</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          
          <div className="mt-12 wholesale-fruits-slider">
            <Slider {...sliderSettings}>
              {fruits.map((fruit) => (
                <div key={fruit.id} className="px-3">
                  <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-green-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
                      <ImageWithFallback
                        src={fruit.imageUrl}
                        alt={fruit.name}
                        className="w-full h-full object-cover"
                      />
                      {fruit.blockchainVerified && (
                        <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-semibold">{fruit.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({fruit.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{fruit.name}</h3>
                      <p className="text-sm text-gray-600 mb-4 flex items-center">
                        <Truck className="h-4 w-4 mr-1" />
                        {fruit.location}
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Per Quintal</span>
                          <span className="text-xl font-bold text-green-600">₹{fruit.pricePerQuintal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Available</span>
                          <span className="font-semibold text-gray-900">{fruit.availableQuantity} {fruit.unit}</span>
                        </div>
                      </div>
                      <Link
                        to="/marketplace"
                        className="block w-full text-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/marketplace"
              className="inline-flex items-center px-8 py-3 text-lg font-semibold text-green-600 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
            >
              View All 20+ Fruits in Marketplace
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose AgroChain */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-green-600">AgroChain</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              India's most trusted blockchain-powered agriculture marketplace with cutting-edge features
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-green-400">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Blockchain Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Every transaction is verified and permanently recorded on an immutable blockchain ledger for complete transparency
              </p>
            </div>
            <div className="group bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-green-400">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Fair Pricing</h3>
              <p className="text-gray-600 leading-relaxed">
                Transparent pricing in ₹ INR per Quintal/Ton with zero hidden fees and real-time market rates
              </p>
            </div>
            <div className="group bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-green-400">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Global Network</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with verified farmers and buyers across 28 Indian states and 50+ countries worldwide
              </p>
            </div>
            <div className="group bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-green-400">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600 leading-relaxed">
                Every product undergoes strict quality checks with blockchain-verified certifications and ratings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-20 bg-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-600 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Platform Impact & Statistics</h2>
            <p className="text-green-100 text-lg">Real numbers from real farmers and traders</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-3">
                <div className="text-5xl font-bold mb-2">20+</div>
                <div className="text-green-100">Fruit Categories</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-3">
                <div className="text-5xl font-bold mb-2">500+</div>
                <div className="text-green-100">Daily Listings</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-3">
                <div className="text-5xl font-bold mb-2">28</div>
                <div className="text-green-100">Indian States</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-3">
                <div className="text-5xl font-bold mb-2">50+</div>
                <div className="text-green-100">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Enterprise-Grade <span className="text-green-600">Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for scale with professional tools for modern agriculture trading
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-green-400 transition-all">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Updates</h3>
                  <p className="text-gray-600">Live price updates, instant notifications, and real-time inventory tracking</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-green-400 transition-all">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-600">Comprehensive insights, sales reports, and market trend analysis</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-green-400 transition-all">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Network</h3>
                  <p className="text-gray-600">Connect only with KYC-verified farmers, buyers, and distributors</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-green-400 transition-all">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                  <Truck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Logistics Support</h3>
                  <p className="text-gray-600">Integrated shipping partners for seamless delivery across India</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-green-400 transition-all">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Escrow Protection</h3>
                  <p className="text-gray-600">Secure payment holding until delivery confirmation for both parties</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-green-400 transition-all">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainability</h3>
                  <p className="text-gray-600">Promoting organic farming, fair trade, and eco-friendly practices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Stories from farmers and buyers who transformed their business</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-8 rounded-2xl border-2 border-green-100">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "AgroChain increased my mango sales by 60%! The blockchain verification gave buyers confidence, 
                and I get fair prices without middlemen."
              </p>
              <div className="flex items-center">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  RK
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Rajesh Kumar</div>
                  <div className="text-sm text-gray-600">Mango Farmer, Maharashtra</div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-8 rounded-2xl border-2 border-green-100">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "As a buyer, I can now source quality fruits directly from farmers at wholesale prices. 
                The platform is transparent and reliable."
              </p>
              <div className="flex items-center">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  AS
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Amit Singh</div>
                  <div className="text-sm text-gray-600">Wholesale Buyer, Delhi</div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-8 rounded-2xl border-2 border-green-100">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "The best platform for FPOs! We can now export our produce to international buyers 
                with complete documentation and blockchain records."
              </p>
              <div className="flex items-center">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  PM
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Priya Menon</div>
                  <div className="text-sm text-gray-600">FPO Head, Kerala</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Moved to End */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md mb-6">
                <Award className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-600">About AgroChain</span>
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Building the Future of <span className="text-green-600">Agriculture</span>
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  AgroChain is India's first blockchain-powered agriculture marketplace that connects farmers 
                  directly with buyers, eliminating middlemen and ensuring fair prices for all stakeholders.
                </p>
                <p className="text-lg">
                  Founded with the vision of revolutionizing Indian agriculture, we leverage cutting-edge 
                  blockchain technology to provide transparency, security, and efficiency in agricultural trade.
                </p>
                <p className="text-lg">
                  Our platform serves over 10,000 farmers and 5,000 buyers across 28 Indian states and 50+ countries, 
                  facilitating ₹50+ Crores in trade volume annually.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">Blockchain Verified</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Support Available</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzY5OTYxNTUzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Agriculture field"
                  className="rounded-2xl shadow-xl h-64 object-cover"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1595855759920-86582396756a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMG1hcmtldHxlbnwxfHx8fDE3Njk5NjE1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Fresh fruits market"
                  className="rounded-2xl shadow-xl h-64 object-cover mt-8"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1557844352-761f2565b576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBoYXBweXxlbnwxfHx8fDE3Njk5NjE1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Happy farmer"
                  className="rounded-2xl shadow-xl h-64 object-cover"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMGhhcnZlc3R8ZW58MXx8fHwxNzY5OTYxNTUzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Fruit harvest"
                  className="rounded-2xl shadow-xl h-64 object-cover mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-600 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Transform Your Agriculture Business?
          </h2>
          <p className="text-2xl text-green-100 mb-10 leading-relaxed">
            Join thousands of farmers and buyers who are already trading on India's most trusted 
            blockchain agriculture platform
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-green-600 bg-white hover:bg-gray-100 rounded-xl transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              Start Trading Today
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-green-700 hover:bg-green-800 border-2 border-white rounded-xl transition-all shadow-xl"
            >
              Browse Marketplace
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center space-x-8 text-green-100">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2" />
              <span>Free Registration</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2" />
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
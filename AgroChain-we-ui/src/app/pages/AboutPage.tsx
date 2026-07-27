import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Target, Eye, Heart, Users, Globe, Shield } from "lucide-react";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About AgroChain</h1>
            <p className="text-xl text-gray-600">
              Revolutionizing agriculture through blockchain technology, connecting farmers with global markets, 
              and ensuring fair prices for quality produce.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-green-50 p-8 rounded-2xl">
              <div className="bg-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To empower farmers across India and the world by providing them with direct access to global markets, 
                fair pricing through blockchain transparency, and the tools they need to thrive in the modern 
                agricultural economy. We believe every farmer deserves to earn a fair price for their hard work.
              </p>
            </div>

            <div className="bg-green-50 p-8 rounded-2xl">
              <div className="bg-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To become the world's most trusted agricultural marketplace, where blockchain technology ensures 
                complete transparency from farm to table. We envision a future where farmers are prosperous, 
                buyers receive quality products, and the entire agricultural supply chain operates with integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  AgroChain was founded in 2024 by a team of agricultural experts and blockchain technologists 
                  who witnessed firsthand the challenges faced by Indian farmers in accessing fair markets.
                </p>
                <p>
                  We saw how middlemen took unfair cuts, how price transparency was lacking, and how farmers 
                  struggled to reach global buyers. We knew technology could solve these problems.
                </p>
                <p>
                  By combining blockchain's immutable record-keeping with our deep understanding of agricultural 
                  markets, we created a platform that benefits everyone in the supply chain - from small farmers 
                  in rural India to international fruit importers.
                </p>
                <p>
                  Today, we serve over 10,000 farmers and 5,000 buyers across 50+ countries, facilitating 
                  transactions worth over ₹50 crores annually, all with complete transparency.
                </p>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1623211269755-569fec0536d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBhZ3JpY3VsdHVyZSUyMGZpZWxkfGVufDF8fHx8MTc2OTk2MTU1M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Indian Farmers"
                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Farmer First</h3>
              <p className="text-gray-600">
                Every decision we make prioritizes the welfare and prosperity of farmers
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparency</h3>
              <p className="text-gray-600">
                Blockchain ensures every transaction is visible, verified, and fair
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Impact</h3>
              <p className="text-gray-600">
                Connecting Indian agriculture with the world through technology
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-green-100">Making a real difference in agriculture</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-green-100">Active Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">5,000+</div>
              <div className="text-green-100">Global Buyers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">₹50Cr+</div>
              <div className="text-green-100">Transaction Value</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">28</div>
              <div className="text-green-100">Indian States</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

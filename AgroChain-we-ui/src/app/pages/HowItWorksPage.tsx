import { UserPlus, Search, ShoppingCart, Shield, TrendingUp, CheckCircle } from "lucide-react";

export function HowItWorksPage() {
  const farmerSteps = [
    {
      icon: UserPlus,
      title: "Register as a Farmer",
      description: "Create your account and verify your farming credentials. It takes just 5 minutes to get started."
    },
    {
      icon: TrendingUp,
      title: "List Your Produce",
      description: "Add your fruits with quantities in Quintal/Ton and set your prices in ₹ INR. Upload quality photos and certifications."
    },
    {
      icon: Search,
      title: "Receive Orders",
      description: "Buyers from across India and globally will discover your produce. Receive instant notifications for new orders."
    },
    {
      icon: Shield,
      title: "Blockchain Verification",
      description: "All transactions are recorded on blockchain for complete transparency. Quality is verified by our experts."
    },
    {
      icon: ShoppingCart,
      title: "Ship & Deliver",
      description: "We coordinate logistics and provide cold storage support. Your produce reaches buyers fresh and on time."
    },
    {
      icon: CheckCircle,
      title: "Receive Payment",
      description: "Get paid directly to your bank account. Fair prices, no middlemen, complete transparency."
    }
  ];

  const buyerSteps = [
    {
      icon: UserPlus,
      title: "Create Buyer Account",
      description: "Sign up as a buyer or distributor. Complete your business verification to start purchasing."
    },
    {
      icon: Search,
      title: "Browse Marketplace",
      description: "Search through 20+ fruit varieties from verified farmers. Filter by price, location, and quality ratings."
    },
    {
      icon: Shield,
      title: "Verify Quality",
      description: "Check blockchain-verified quality certificates, farmer ratings, and real product photos."
    },
    {
      icon: ShoppingCart,
      title: "Place Order",
      description: "Select quantity in Qtl/Ton, confirm pricing in ₹ INR, and place your order securely."
    },
    {
      icon: TrendingUp,
      title: "Track Shipment",
      description: "Real-time tracking from farm to your warehouse. Get updates at every stage of delivery."
    },
    {
      icon: CheckCircle,
      title: "Receive & Rate",
      description: "Receive fresh produce with quality guarantee. Rate your experience to help other buyers."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">How AgroChain Works</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Simple, transparent, and secure process for both farmers and buyers
          </p>
        </div>
      </div>

      {/* For Farmers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">For Farmers</h2>
            <p className="text-xl text-gray-600">
              Sell your produce directly to buyers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {farmerSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 hover:shadow-lg transition-all h-full">
                  <div className="flex items-start mb-4">
                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                      <step.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Buyers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">For Buyers</h2>
            <p className="text-xl text-gray-600">
              Source quality fruits directly from verified farmers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {buyerSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 hover:shadow-lg transition-all h-full">
                  <div className="flex items-start mb-4">
                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                      <step.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AgroChain?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-green-50 rounded-xl">
              <div className="text-5xl font-bold text-green-600 mb-2">0%</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Commission</div>
              <p className="text-gray-600">No middleman fees. Farmers keep what they earn.</p>
            </div>

            <div className="text-center p-8 bg-green-50 rounded-xl">
              <div className="text-5xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Transparency</div>
              <p className="text-gray-600">Every transaction verified on blockchain.</p>
            </div>

            <div className="text-center p-8 bg-green-50 rounded-xl">
              <div className="text-5xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Support</div>
              <p className="text-gray-600">Round-the-clock assistance for all users.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join the revolution in agricultural trading
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-4 bg-white hover:bg-gray-100 text-green-600 rounded-lg font-medium transition-colors"
          >
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  );
}

import { Calendar, User, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Blockchain in Agriculture: A Complete Guide",
      excerpt: "Learn how blockchain technology is transforming the agricultural supply chain and ensuring transparency in fruit trading.",
      author: "Dr. Rajesh Kumar",
      date: "February 1, 2026",
      category: "Blockchain",
      imageUrl: "https://images.unsplash.com/photo-1631864031821-320cf314b3ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwdGVjaG5vbG9neSUyMG5ldHdvcmt8ZW58MXx8fHwxNzY5OTUyOTkwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      title: "Mango Export Season 2026: Price Trends and Market Analysis",
      excerpt: "Comprehensive analysis of Indian mango exports, pricing trends in ₹ INR per quintal, and global demand forecasts.",
      author: "Priya Sharma",
      date: "January 28, 2026",
      category: "Market Analysis",
      imageUrl: "https://images.unsplash.com/photo-1591793654079-f2a25f4635ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHBob25zbyUyMG1hbmdvJTIwZnJlc2h8ZW58MXx8fHwxNzcwMDQ3NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      title: "How Indian Farmers Are Increasing Yields with Technology",
      excerpt: "Success stories of farmers using AgroChain's platform to access better markets and improve their livelihoods.",
      author: "Amit Patel",
      date: "January 25, 2026",
      category: "Success Stories",
      imageUrl: "https://images.unsplash.com/photo-1623211269755-569fec0536d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBhZ3JpY3VsdHVyZSUyMGZpZWxkfGVufDF8fHx8MTc2OTk2MTU1M3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 4,
      title: "The Future of Fruit Exports: Quintal to Global Markets",
      excerpt: "Exploring how standardized measurements and blockchain verification are opening international markets for Indian farmers.",
      author: "Sarah Johnson",
      date: "January 22, 2026",
      category: "Export",
      imageUrl: "https://images.unsplash.com/photo-1719778613148-6cffb3c59153?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMHN1cHBseSUyMGNoYWluJTIwbG9naXN0aWNzfGVufDF8fHx8MTc3MDA0NzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 5,
      title: "Organic Farming: Premium Prices and Growing Demand",
      excerpt: "Why organic certification through blockchain is helping farmers earn 30% more for their produce.",
      author: "Dr. Meena Singh",
      date: "January 20, 2026",
      category: "Organic Farming",
      imageUrl: "https://images.unsplash.com/photo-1758184468790-f2b89a28a21d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMG1hcmtldCUyMGRpc3BsYXl8ZW58MXx8fHwxNzcwMDQ3NjU2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 6,
      title: "Understanding Fair Trade Pricing in Indian Agriculture",
      excerpt: "A deep dive into how AgroChain ensures farmers receive fair compensation for their hard work.",
      author: "Vikram Reddy",
      date: "January 18, 2026",
      category: "Fair Trade",
      imageUrl: "https://images.unsplash.com/photo-1623815242959-fb20354f9b8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHJlZCUyMGFwcGxlc3xlbnwxfHx8fDE3Njk5NzYxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Knowledge Center</h1>
          <p className="text-xl text-green-100">
            Insights on agriculture, blockchain, markets, and success stories
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-[400px]">
                <ImageWithFallback
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="text-sm font-medium text-green-600 mb-3">
                  FEATURED • {featuredPost.category}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <User className="h-4 w-4 mr-2" />
                  <span className="mr-4">{featuredPost.author}</span>
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{featuredPost.date}</span>
                </div>
                <button className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                  Read Full Article
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts Grid */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
              >
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-medium text-green-600 mb-2">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{post.date}</span>
                  </div>
                  <button className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest insights on agriculture, blockchain, and market trends
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

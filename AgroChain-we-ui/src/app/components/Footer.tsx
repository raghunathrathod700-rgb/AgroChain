import { Link } from "react-router";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Headphones } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AgroChain</span>
            </div>
            <p className="text-sm mb-4">
              Connecting farmers and buyers worldwide through blockchain-powered transparency and fair trade.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-green-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/agro_chain_01" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-green-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/marketplace" className="hover:text-green-500 transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-green-500 transition-colors">
                  Orders Management
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-green-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-green-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-green-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-green-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="hover:text-green-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a 
                  href="tel:+918458902317" 
                  className="hover:text-green-500 transition-colors flex items-center"
                >
                  <Headphones className="h-4 w-4 mr-2" />
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Burhanpur, Madhya Pradesh, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-green-500 flex-shrink-0" />
                <a href="tel:+919171819711" className="hover:text-green-500 transition-colors">
                  +91 91718 19711
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-green-500 flex-shrink-0" />
                <a href="tel:+918458902317" className="hover:text-green-500 transition-colors font-semibold">
                  Helpline: 8458902317
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-green-500 flex-shrink-0" />
                <a href="mailto:support@agrochain.com" className="hover:text-green-500 transition-colors">
                  support@agrochain.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2026 AgroChain. All rights reserved. Powered by Blockchain Technology.</p>
        </div>
      </div>
    </footer>
  );
}
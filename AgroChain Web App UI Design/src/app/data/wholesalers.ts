export interface Wholesaler {
  id: string;
  name: string;
  companyName: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  specialization: string[];
  yearsInBusiness: number;
  tradingVolume: string;
  rating: number;
  reviews: number;
  contactPerson: string;
  verified: boolean;
  certifications: string[];
  servingStates: string[];
  preferredFruits: string[];
}

export const wholesalers: Wholesaler[] = [
  {
    id: "1",
    name: "Fresh Fruits Hub",
    companyName: "Fresh Fruits Hub Pvt Ltd",
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India"
    },
    specialization: ["Tropical Fruits", "Seasonal Fruits"],
    yearsInBusiness: 15,
    tradingVolume: "₹25 Cr/year",
    rating: 4.8,
    reviews: 342,
    contactPerson: "Ramesh Patel",
    verified: true,
    certifications: ["FSSAI", "ISO 9001", "Export License"],
    servingStates: ["Maharashtra", "Gujarat", "Rajasthan", "Madhya Pradesh"],
    preferredFruits: ["Mango", "Banana", "Papaya", "Pomegranate"]
  },
  {
    id: "2",
    name: "Delhi Fruit Market",
    companyName: "Delhi Fruit Market & Distributors",
    location: {
      city: "New Delhi",
      state: "Delhi",
      country: "India"
    },
    specialization: ["Temperate Fruits", "Imported Fruits"],
    yearsInBusiness: 20,
    tradingVolume: "₹35 Cr/year",
    rating: 4.9,
    reviews: 456,
    contactPerson: "Suresh Sharma",
    verified: true,
    certifications: ["FSSAI", "APEDA", "Export License", "Organic Certification"],
    servingStates: ["Delhi", "Haryana", "Punjab", "Uttar Pradesh", "Uttarakhand"],
    preferredFruits: ["Apple", "Pear", "Peach", "Plum", "Kiwi"]
  },
  {
    id: "3",
    name: "South India Wholesale",
    companyName: "South India Wholesale Fruits Corporation",
    location: {
      city: "Bengaluru",
      state: "Karnataka",
      country: "India"
    },
    specialization: ["Tropical Fruits", "Organic Fruits"],
    yearsInBusiness: 12,
    tradingVolume: "₹18 Cr/year",
    rating: 4.7,
    reviews: 289,
    contactPerson: "Venkat Rao",
    verified: true,
    certifications: ["FSSAI", "Organic Certification", "ISO 22000"],
    servingStates: ["Karnataka", "Tamil Nadu", "Kerala", "Andhra Pradesh", "Telangana"],
    preferredFruits: ["Banana", "Coconut", "Mango", "Guava", "Papaya"]
  },
  {
    id: "4",
    name: "Punjab Agro Traders",
    companyName: "Punjab Agro Traders & Exporters",
    location: {
      city: "Ludhiana",
      state: "Punjab",
      country: "India"
    },
    specialization: ["Fresh Fruits", "Export Quality"],
    yearsInBusiness: 18,
    tradingVolume: "₹28 Cr/year",
    rating: 4.6,
    reviews: 312,
    contactPerson: "Harpreet Singh",
    verified: true,
    certifications: ["FSSAI", "APEDA", "Export License"],
    servingStates: ["Punjab", "Haryana", "Himachal Pradesh", "Jammu & Kashmir"],
    preferredFruits: ["Apple", "Pear", "Peach", "Grapes", "Citrus Fruits"]
  },
  {
    id: "5",
    name: "Maharashtra Mandi",
    companyName: "Maharashtra Mandi Wholesale Pvt Ltd",
    location: {
      city: "Nashik",
      state: "Maharashtra",
      country: "India"
    },
    specialization: ["Grapes", "Pomegranate", "Seasonal Fruits"],
    yearsInBusiness: 25,
    tradingVolume: "₹40 Cr/year",
    rating: 4.9,
    reviews: 523,
    contactPerson: "Vijay Kulkarni",
    verified: true,
    certifications: ["FSSAI", "ISO 9001", "Export License", "GI Tag Certified"],
    servingStates: ["Maharashtra", "Gujarat", "Goa", "Karnataka"],
    preferredFruits: ["Grapes", "Pomegranate", "Mango", "Orange"]
  },
  {
    id: "6",
    name: "Bengal Fruit Corporation",
    companyName: "Bengal Fruit Corporation Ltd",
    location: {
      city: "Kolkata",
      state: "West Bengal",
      country: "India"
    },
    specialization: ["Tropical Fruits", "Regional Fruits"],
    yearsInBusiness: 10,
    tradingVolume: "₹15 Cr/year",
    rating: 4.5,
    reviews: 198,
    contactPerson: "Amit Banerjee",
    verified: true,
    certifications: ["FSSAI", "ISO 22000"],
    servingStates: ["West Bengal", "Bihar", "Odisha", "Jharkhand"],
    preferredFruits: ["Mango", "Litchi", "Guava", "Banana"]
  },
  {
    id: "7",
    name: "Rajasthan Fruit Hub",
    companyName: "Rajasthan Fruit Hub & Distributors",
    location: {
      city: "Jaipur",
      state: "Rajasthan",
      country: "India"
    },
    specialization: ["Melons", "Dry Climate Fruits"],
    yearsInBusiness: 14,
    tradingVolume: "₹20 Cr/year",
    rating: 4.6,
    reviews: 267,
    contactPerson: "Dinesh Agarwal",
    verified: true,
    certifications: ["FSSAI", "ISO 9001"],
    servingStates: ["Rajasthan", "Gujarat", "Madhya Pradesh", "Haryana"],
    preferredFruits: ["Watermelon", "Muskmelon", "Pomegranate", "Guava"]
  },
  {
    id: "8",
    name: "Chennai Fresh Mart",
    companyName: "Chennai Fresh Mart Wholesale Pvt Ltd",
    location: {
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India"
    },
    specialization: ["Tropical Fruits", "Export Quality"],
    yearsInBusiness: 16,
    tradingVolume: "₹22 Cr/year",
    rating: 4.8,
    reviews: 378,
    contactPerson: "Muthu Kumar",
    verified: true,
    certifications: ["FSSAI", "APEDA", "Export License", "Organic Certification"],
    servingStates: ["Tamil Nadu", "Kerala", "Andhra Pradesh", "Puducherry"],
    preferredFruits: ["Banana", "Mango", "Papaya", "Pineapple", "Coconut"]
  },
  {
    id: "9",
    name: "Hyderabad Wholesale Market",
    companyName: "Hyderabad Wholesale Fruit Market Ltd",
    location: {
      city: "Hyderabad",
      state: "Telangana",
      country: "India"
    },
    specialization: ["All Fruits", "Bulk Trading"],
    yearsInBusiness: 22,
    tradingVolume: "₹32 Cr/year",
    rating: 4.7,
    reviews: 412,
    contactPerson: "Rajesh Reddy",
    verified: true,
    certifications: ["FSSAI", "ISO 9001", "Export License"],
    servingStates: ["Telangana", "Andhra Pradesh", "Karnataka", "Maharashtra"],
    preferredFruits: ["Mango", "Guava", "Pomegranate", "Watermelon", "Grapes"]
  },
  {
    id: "10",
    name: "Kerala Tropical Fruits",
    companyName: "Kerala Tropical Fruits Exporters",
    location: {
      city: "Kochi",
      state: "Kerala",
      country: "India"
    },
    specialization: ["Tropical Fruits", "Export Business"],
    yearsInBusiness: 13,
    tradingVolume: "₹19 Cr/year",
    rating: 4.8,
    reviews: 295,
    contactPerson: "Arjun Menon",
    verified: true,
    certifications: ["FSSAI", "APEDA", "Export License", "Organic Certification"],
    servingStates: ["Kerala", "Tamil Nadu", "Karnataka"],
    preferredFruits: ["Pineapple", "Banana", "Coconut", "Papaya", "Mango"]
  },
  {
    id: "11",
    name: "Gujarat Fresh Produce",
    companyName: "Gujarat Fresh Produce Wholesalers",
    location: {
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India"
    },
    specialization: ["Fresh Fruits", "Quality Assurance"],
    yearsInBusiness: 17,
    tradingVolume: "₹24 Cr/year",
    rating: 4.7,
    reviews: 334,
    contactPerson: "Mahesh Desai",
    verified: true,
    certifications: ["FSSAI", "ISO 9001", "ISO 22000"],
    servingStates: ["Gujarat", "Maharashtra", "Rajasthan", "Madhya Pradesh"],
    preferredFruits: ["Papaya", "Chikoo", "Mango", "Pomegranate"]
  },
  {
    id: "12",
    name: "UP Fruit Distributors",
    companyName: "Uttar Pradesh Fruit Distributors Ltd",
    location: {
      city: "Lucknow",
      state: "Uttar Pradesh",
      country: "India"
    },
    specialization: ["Regional Fruits", "Bulk Supply"],
    yearsInBusiness: 11,
    tradingVolume: "₹16 Cr/year",
    rating: 4.5,
    reviews: 223,
    contactPerson: "Sanjay Verma",
    verified: true,
    certifications: ["FSSAI", "ISO 9001"],
    servingStates: ["Uttar Pradesh", "Bihar", "Madhya Pradesh", "Delhi"],
    preferredFruits: ["Guava", "Mango", "Banana", "Litchi"]
  }
];
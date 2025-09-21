const mongoose = require('mongoose');
const Tanker = require('./models/Tanker');
require('dotenv').config();

const sampleTankers = [
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'AquaPure Suppliers',
    phone: '+91 9876543210',
    capacity: 5000,
    pricePerLiter: 2.5,
<<<<<<< HEAD
    location: 'Dombivli',
    rating: 4.5,
    totalRatings: 120,
    vehicleNumber: 'MH-01-AB-1234',
    waterQuality: 'potable',
    serviceAreas: ['Hebbal', 'Yelahanka', 'RT Nagar', 'Sahakar Nagar'],
    operatingHours: { start: '06:00', end: '22:00' },
    deliveryTime: '2-3 hours',
    minimumOrder: 1000,
    description: 'Premium quality drinking water with 24/7 service availability',
    features: ['GPS Tracking', 'Quality Certified', 'Same Day Delivery', 'Emergency Service'],
    certifications: ['ISI Mark', 'BIS Certified', 'FSSAI Licensed'],
    emergencyService: true,
    coordinates: { lat: 13.0358, lng: 77.5970 },
    totalDeliveries: 1250,
    lastActive: new Date()
=======
    location: 'Bangalore North',
    rating: 4.5,
    totalRatings: 120,
    vehicleNumber: 'KA-01-AB-1234',
    waterQuality: 'potable'
>>>>>>> ed770eda8e413498622a03ad7f35a8320540f6fd
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Crystal Water Services',
    phone: '+91 9876543211',
    capacity: 10000,
    pricePerLiter: 2.2,
<<<<<<< HEAD
    location: 'Kalyan',
    rating: 4.2,
    totalRatings: 85,
    vehicleNumber: 'MH-01-CD-5678',
    waterQuality: 'potable',
    serviceAreas: ['Jayanagar', 'BTM Layout', 'Koramangala', 'HSR Layout'],
    operatingHours: { start: '07:00', end: '21:00' },
    deliveryTime: '3-4 hours',
    minimumOrder: 2000,
    description: 'Reliable water supply with competitive pricing for bulk orders',
    features: ['Bulk Discounts', 'Regular Supply', 'Quality Testing'],
    certifications: ['BIS Certified', 'Pollution Control Board Approved'],
    emergencyService: false,
    coordinates: { lat: 12.9352, lng: 77.6245 },
    totalDeliveries: 890,
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000)
=======
    location: 'Bangalore South',
    rating: 4.2,
    totalRatings: 85,
    vehicleNumber: 'KA-01-CD-5678',
    waterQuality: 'potable'
>>>>>>> ed770eda8e413498622a03ad7f35a8320540f6fd
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Blue Drop Tankers',
    phone: '+91 9876543212',
    capacity: 8000,
    pricePerLiter: 1.8,
<<<<<<< HEAD
    location: 'Koper',
    rating: 4.0,
    totalRatings: 95,
    vehicleNumber: 'MH-01-EF-9012',
    waterQuality: 'non-potable',
    serviceAreas: ['Whitefield', 'Marathahalli', 'Brookefield', 'KR Puram'],
    operatingHours: { start: '08:00', end: '20:00' },
    deliveryTime: '4-6 hours',
    minimumOrder: 3000,
    description: 'Cost-effective non-potable water for construction and industrial use',
    features: ['Industrial Grade', 'Large Capacity', 'Flexible Timing'],
    certifications: ['Pollution Control Board Approved'],
    emergencyService: false,
    coordinates: { lat: 12.9698, lng: 77.7500 },
    totalDeliveries: 650,
    lastActive: new Date(Date.now() - 5 * 60 * 60 * 1000)
=======
    location: 'Bangalore East',
    rating: 4.0,
    totalRatings: 95,
    vehicleNumber: 'KA-01-EF-9012',
    waterQuality: 'non-potable'
>>>>>>> ed770eda8e413498622a03ad7f35a8320540f6fd
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Fresh Water Co.',
    phone: '+91 9876543213',
    capacity: 12000,
    pricePerLiter: 3.0,
<<<<<<< HEAD
    location: 'Dombivli',
    rating: 4.8,
    totalRatings: 200,
    vehicleNumber: 'MH-01-GH-3456',
    waterQuality: 'potable',
    serviceAreas: ['Rajajinagar', 'Malleshwaram', 'Basaveshwaranagar', 'Vijayanagar'],
    operatingHours: { start: '05:00', end: '23:00' },
    deliveryTime: '1-2 hours',
    minimumOrder: 500,
    description: 'Premium water supplier with fastest delivery and highest quality standards',
    features: ['Express Delivery', 'Premium Quality', '24/7 Support', 'Real-time Tracking'],
    certifications: ['ISI Mark', 'BIS Certified', 'FSSAI Licensed', 'ISO 9001'],
    emergencyService: true,
    coordinates: { lat: 12.9716, lng: 77.5946 },
    totalDeliveries: 2100,
    lastActive: new Date()
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Aqua Express',
    phone: '+91 9876543214',
    capacity: 6000,
    pricePerLiter: 2.3,
    location: 'Karjat',
    rating: 4.3,
    totalRatings: 156,
    vehicleNumber: 'MH-01-IJ-7890',
    waterQuality: 'potable',
    serviceAreas: ['Electronic City', 'Bommanahalli', 'Begur', 'Hulimavu'],
    operatingHours: { start: '06:30', end: '21:30' },
    deliveryTime: '2-4 hours',
    minimumOrder: 1500,
    description: 'Specialized in IT corridor water supply with tech-enabled tracking',
    features: ['App-based Booking', 'Digital Payments', 'SMS Updates'],
    certifications: ['BIS Certified', 'FSSAI Licensed'],
    emergencyService: true,
    coordinates: { lat: 12.8456, lng: 77.6603 },
    totalDeliveries: 980,
    lastActive: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Metro Water Solutions',
    phone: '+91 9876543215',
    capacity: 15000,
    pricePerLiter: 2.0,
    location: 'Mulund',
    rating: 4.1,
    totalRatings: 78,
    vehicleNumber: 'MH-01-KL-2468',
    waterQuality: 'potable',
    serviceAreas: ['Yeshwanthpur', 'Peenya', 'Jalahalli', 'Mathikere'],
    operatingHours: { start: '07:00', end: '22:00' },
    deliveryTime: '3-5 hours',
    minimumOrder: 2500,
    description: 'Large capacity tankers for residential societies and commercial complexes',
    features: ['Society Discounts', 'Scheduled Delivery', 'Bulk Orders'],
    certifications: ['BIS Certified', 'Municipal Approved'],
    emergencyService: false,
    coordinates: { lat: 13.0280, lng: 77.5520 },
    totalDeliveries: 420,
    lastActive: new Date(Date.now() - 3 * 60 * 60 * 1000)
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Pure Drop Services',
    phone: '+91 9876543216',
    capacity: 4000,
    pricePerLiter: 2.8,
    location: 'Thane',
    rating: 4.6,
    totalRatings: 134,
    vehicleNumber: 'MH-01-MN-1357',
    waterQuality: 'potable',
    serviceAreas: ['Indiranagar', 'Domlur', 'Old Airport Road', 'HAL'],
    operatingHours: { start: '06:00', end: '20:00' },
    deliveryTime: '1-3 hours',
    minimumOrder: 1000,
    description: 'Premium filtered water with advanced purification technology',
    features: ['UV Treated', 'RO Filtered', 'Lab Tested', 'Quick Service'],
    certifications: ['ISI Mark', 'BIS Certified', 'FSSAI Licensed', 'Lab Certified'],
    emergencyService: true,
    coordinates: { lat: 12.9719, lng: 77.6412 },
    totalDeliveries: 1560,
    lastActive: new Date(Date.now() - 15 * 60 * 1000)
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Hydro Supply Co.',
    phone: '+91 9876543217',
    capacity: 9000,
    pricePerLiter: 1.9,
    location: 'Diva',
    rating: 3.9,
    totalRatings: 67,
    vehicleNumber: 'MH-01-OP-9753',
    waterQuality: 'non-potable',
    serviceAreas: ['Banashankari', 'Girinagar', 'Uttarahalli', 'Kengeri'],
    operatingHours: { start: '08:00', end: '19:00' },
    deliveryTime: '4-6 hours',
    minimumOrder: 4000,
    description: 'Affordable water supply for construction and gardening purposes',
    features: ['Construction Grade', 'Gardening Use', 'Bulk Supply'],
    certifications: ['Municipal Approved'],
    emergencyService: false,
    coordinates: { lat: 12.9279, lng: 77.5619 },
    totalDeliveries: 340,
    lastActive: new Date(Date.now() - 6 * 60 * 60 * 1000)
  }
];
=======
    location: 'Bangalore West',
    rating: 4.8,
    totalRatings: 200,
    vehicleNumber: 'KA-01-GH-3456',
    waterQuality: 'potable'
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Rapid Water Delivery',
    phone: '+91 9876543220',
    capacity: 4000,
    pricePerLiter: 3.2,
    location: 'HSR Layout',
    rating: 4.9,
    totalRatings: 250,
    vehicleNumber: 'KA-01-UV-1111',
    waterQuality: 'potable'
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Metro Water Services',
    phone: '+91 9876543221',
    capacity: 16000,
    pricePerLiter: 1.5,
    location: 'Electronic City',
    rating: 3.8,
    totalRatings: 65,
    vehicleNumber: 'KA-01-WX-2222',
    waterQuality: 'non-potable'
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Premium Aqua',
    phone: '+91 9876543222',
    capacity: 3500,
    pricePerLiter: 4.0,
    location: 'Koramangala',
    rating: 4.8,
    totalRatings: 300,
    vehicleNumber: 'KA-01-YZ-3333',
    waterQuality: 'potable'
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Bulk Water Solutions',
    phone: '+91 9876543223',
    capacity: 20000,
    pricePerLiter: 1.2,
    location: 'Whitefield',
    rating: 4.0,
    totalRatings: 180,
    vehicleNumber: 'KA-01-AA-4444',
    waterQuality: 'non-potable'
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Pure Springs Water',
    phone: '+91 9876543214',
    capacity: 15000,
    pricePerLiter: 2.8,
    location: 'Bangalore Central',
    rating: 4.6,
    totalRatings: 150,
    vehicleNumber: 'KA-01-IJ-7890',
    waterQuality: 'potable'
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Aqua Life Services',
    phone: '+91 9876543215',
    capacity: 7000,
    pricePerLiter: 2.2,
    location: 'Bangalore North East',
    rating: 4.3,
    totalRatings: 110,
    vehicleNumber: 'KA-01-KL-1122',
    waterQuality: 'potable'
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'WaterWays Tankers',
    phone: '+91 9876543216',
    capacity: 9000,
    pricePerLiter: 1.9,
    location: 'Bangalore South West',
    rating: 3.9,
    totalRatings: 75,
    vehicleNumber: 'KA-01-MN-3344',
    waterQuality: 'non-potable'
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'H2O Solutions',
    phone: '+91 9876543217',
    capacity: 11000,
    pricePerLiter: 2.7,
    location: 'Bangalore South East',
    rating: 4.4,
    totalRatings: 180,
    vehicleNumber: 'KA-01-OP-5566',
    waterQuality: 'potable'
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Water Express',
    phone: '+91 9876543218',
    capacity: 6000,
    pricePerLiter: 2.3,
    location: 'Bangalore North West',
    rating: 4.1,
    totalRatings: 90,
    vehicleNumber: 'KA-01-QR-7788',
    waterQuality: 'potable'
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'City Water Supply',
    phone: '+91 9876543219',
    capacity: 13000,
    pricePerLiter: 2.6,
    location: 'Bangalore Outer Ring Road',
    rating: 4.7,
    totalRatings: 160,
    vehicleNumber: 'KA-01-ST-9900',
    waterQuality: 'potable'
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Eco Water Systems',
    phone: '+91 9876543224',
    capacity: 7500,
    pricePerLiter: 2.4,
    location: 'Indiranagar',
    rating: 4.2,
    totalRatings: 140,
    vehicleNumber: 'KA-01-BB-5555',
    waterQuality: 'potable'
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Swift Aqua Transport',
    phone: '+91 9876543225',
    capacity: 14000,
    pricePerLiter: 1.7,
    location: 'Marathahalli',
    rating: 3.9,
    totalRatings: 95,
    vehicleNumber: 'KA-01-CC-6666',
    waterQuality: 'non-potable'
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Golden Drop Water',
    phone: '+91 9876543226',
    capacity: 5500,
    pricePerLiter: 3.5,
    location: 'Jayanagar',
    rating: 4.6,
    totalRatings: 220,
    vehicleNumber: 'KA-01-DD-7777',
    waterQuality: 'potable'
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Industrial Water Co.',
    phone: '+91 9876543227',
    capacity: 25000,
    pricePerLiter: 1.0,
    location: 'Peenya Industrial Area',
    rating: 3.7,
    totalRatings: 80,
    vehicleNumber: 'KA-01-EE-8888',
    waterQuality: 'non-potable'
  },
  {
    supplierId: new mongoose.Types.ObjectId(),
    supplierName: 'Crystal Clear Waters',
    phone: '+91 9876543228',
    capacity: 8500,
    pricePerLiter: 2.9,
    location: 'Rajajinagar',
    rating: 4.5,
    totalRatings: 190,
    vehicleNumber: 'KA-01-FF-9999',
    waterQuality: 'potable'
  }
]; 
>>>>>>> ed770eda8e413498622a03ad7f35a8320540f6fd

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartwater');
    
    // Clear existing tankers
    await Tanker.deleteMany({});
    
    // Insert sample tankers
    await Tanker.insertMany(sampleTankers);
    
<<<<<<< HEAD
    console.log(`Database seeded successfully with ${sampleTankers.length} tankers!`);
    console.log('Tanker suppliers added:');
    sampleTankers.forEach(tanker => {
      console.log(`- ${tanker.supplierName} (${tanker.capacity}L, ₹${tanker.pricePerLiter}/L)`);
    });
=======
    console.log('Database seeded successfully!');
>>>>>>> ed770eda8e413498622a03ad7f35a8320540f6fd
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
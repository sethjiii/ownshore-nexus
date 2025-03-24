import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Heart, Share2, MapPin, ArrowRight, Calendar, Phone, 
  DollarSign, BarChart3, Home, User, Clock, FileText, TrendingUp 
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const propertyData = {
  id: "1",
  title: "Luxury Apartment in South Delhi",
  description: "This premium apartment is located in one of the most sought-after neighborhoods in South Delhi. It offers modern amenities, spacious rooms, and is close to major business centers, shopping malls, and educational institutions.",
  location: "Green Park, Delhi",
  price: 15000000,
  yield: 14.5,
  minInvestment: 25000,
  images: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2232&q=80",
  ],
  type: "Residential",
  area: 1250,
  investors: 127,
  funded: 78,
  bedrooms: 3,
  bathrooms: 2,
  amenities: ["Swimming Pool", "Gym", "24/7 Security", "Power Backup", "Parking", "Club House"],
  return: {
    rental: 8.5,
    appreciation: 6.0,
    total: 14.5,
  },
  financials: {
    propertyPrice: 15000000,
    stampDuty: 750000,
    registrationFee: 150000,
    legalFee: 100000,
    totalInvestment: 16000000,
    expectedRentalYield: 8.5,
    expectedAppreciation: 6.0,
    projectedReturn: 14.5,
  },
  documents: ["Property Title Deed", "NOC from Builder", "Approved Building Plan", "Tax Payment Receipts"],
  fundingGoal: 16000000,
  fundingRaised: 12500000,
  vendorInfo: {
    name: "Delhi Premium Properties Ltd",
    phone: "+91 98765 43210",
    email: "info@delhipremiumproperties.com",
  },
  legalInfo: "The property is freehold with clear title. All necessary approvals from local authorities have been obtained. The property is free from all encumbrances and legal disputes.",
  riskFactors: [
    "Market fluctuations may affect property value",
    "Rental income is subject to market demand",
    "Regulatory changes may impact investment returns",
  ],
  offeringDetails: {
    minInvestment: 25000,
    maxInvestment: 1000000,
    investmentTerm: 5,
    exitOptions: ["Secondary Market Sale", "Property Sale after 5 Years"],
  },
};

const PropertyDetail = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isInvestDialogOpen, setIsInvestDialogOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(propertyData.minInvestment);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const shareProperty = () => {
    // Share functionality would go here
  };

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= propertyData.minInvestment && value <= propertyData.offeringDetails.maxInvestment) {
      setInvestmentAmount(value);
    }
  };

  const expectedReturns = (investmentAmount * propertyData.yield) / 100;

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Property Header */}
      <div className="pt-24 pb-6 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                  {propertyData.type}
                </Badge>
                <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-0">
                  {propertyData.yield}% Yield
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{propertyData.title}</h1>
              <div className="mt-2 flex items-center text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{propertyData.location}</span>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="text-right">
                <p className="text-sm text-gray-500">Property Value</p>
                <p className="text-2xl font-bold text-gray-900">₹{propertyData.price.toLocaleString()}</p>
              </div>
              <div className="mt-4 flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFavorite}
                  className="flex items-center gap-1"
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={shareProperty}
                  className="flex items-center gap-1"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Gallery */}
      <div className="bg-gray-50 border-y border-gray-200 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <img
                  src={propertyData.images[activeImageIndex]}
                  alt={propertyData.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {propertyData.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className={`relative h-[190px] rounded-lg overflow-hidden cursor-pointer transition-opacity ${
                    index === activeImageIndex ? 'ring-2 ring-primary' : 'opacity-80 hover:opacity-100'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Property view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 3 && propertyData.images.length > 4 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <span className="text-white font-medium">+{propertyData.images.length - 4} more</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Content Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="legal">Legal</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Property Description</h3>
                    <p className="mt-2 text-gray-600">{propertyData.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Property Details</h3>
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="flex flex-col rounded-md bg-gray-50 p-3">
                        <span className="text-sm text-gray-500">Area</span>
                        <div className="flex items-center mt-1">
                          <Home className="h-4 w-4 text-primary mr-1" />
                          <span className="font-medium">{propertyData.area} sq.ft</span>
                        </div>
                      </div>
                      <div className="flex flex-col rounded-md bg-gray-50 p-3">
                        <span className="text-sm text-gray-500">Bedrooms</span>
                        <div className="flex items-center mt-1">
                          <User className="h-4 w-4 text-primary mr-1" />
                          <span className="font-medium">{propertyData.bedrooms}</span>
                        </div>
                      </div>
                      <div className="flex flex-col rounded-md bg-gray-50 p-3">
                        <span className="text-sm text-gray-500">Bathrooms</span>
                        <div className="flex items-center mt-1">
                          <User className="h-4 w-4 text-primary mr-1" />
                          <span className="font-medium">{propertyData.bathrooms}</span>
                        </div>
                      </div>
                      <div className="flex flex-col rounded-md bg-gray-50 p-3">
                        <span className="text-sm text-gray-500">Type</span>
                        <div className="flex items-center mt-1">
                          <Home className="h-4 w-4 text-primary mr-1" />
                          <span className="font-medium">{propertyData.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Amenities</h3>
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
                      {propertyData.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Location</h3>
                    <div className="mt-4 h-[300px] rounded-lg overflow-hidden bg-gray-200">
                      {/* Map would go here */}
                      <div className="h-full w-full flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-gray-400" />
                        <span className="ml-2 text-gray-500">Map view would be displayed here</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="financials" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Investment Returns</h3>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="rounded-md bg-gray-50 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Rental Yield</p>
                            <p className="text-xl font-semibold text-gray-900">{propertyData.return.rental}%</p>
                          </div>
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <DollarSign className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md bg-gray-50 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Appreciation</p>
                            <p className="text-xl font-semibold text-gray-900">{propertyData.return.appreciation}%</p>
                          </div>
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md bg-primary/10 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Total Returns</p>
                            <p className="text-xl font-semibold text-primary">{propertyData.return.total}%</p>
                          </div>
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <BarChart3 className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Financial Breakdown</h3>
                    <div className="mt-4 rounded-lg border border-gray-200 overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Property Price</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{propertyData.financials.propertyPrice.toLocaleString()}</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Stamp Duty</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{propertyData.financials.stampDuty.toLocaleString()}</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Registration Fee</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{propertyData.financials.registrationFee.toLocaleString()}</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Legal Fee</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{propertyData.financials.legalFee.toLocaleString()}</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total Investment</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{propertyData.financials.totalInvestment.toLocaleString()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Investment Projections</h3>
                    <div className="mt-4 space-y-4">
                      <div className="h-[250px] rounded-lg bg-gray-50 p-4 flex items-center justify-center">
                        <span className="text-gray-500">Return projection chart would be displayed here</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        * These projections are based on historical data and market analysis. Actual returns may vary.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="documents" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Property Documents</h3>
                    <p className="mt-2 text-gray-600">
                      All property documents have been verified by our legal team. You can view or download them below.
                    </p>
                    <div className="mt-4 space-y-3">
                      {propertyData.documents.map((document, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-md border border-gray-200 bg-white">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="text-gray-700">{document}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-primary">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="legal" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Legal Information</h3>
                    <p className="mt-2 text-gray-600">
                      {propertyData.legalInfo}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Risk Factors</h3>
                    <div className="mt-4 space-y-3">
                      {propertyData.riskFactors.map((risk, index) => (
                        <div key={index} className="flex items-start p-3 rounded-md bg-gray-50">
                          <div className="h-5 w-5 text-red-500 mr-3">•</div>
                          <span className="text-gray-700">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Offering Details</h3>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="flex flex-col rounded-md bg-gray-50 p-3">
                        <span className="text-sm text-gray-500">Minimum Investment</span>
                        <span className="font-medium">₹{propertyData.offeringDetails.minInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col rounded-md bg-gray-50 p-3">
                        <span className="text-sm text-gray-500">Maximum Investment</span>
                        <span className="font-medium">₹{propertyData.offeringDetails.maxInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col rounded-md bg-gray-50 p-3">
                        <span className="text-sm text-gray-500">Investment Term</span>
                        <span className="font-medium">{propertyData.offeringDetails.investmentTerm} years</span>
                      </div>
                      <div className="flex flex-col rounded-md bg-gray-50 p-3">
                        <span className="text-sm text-gray-500">Exit Options</span>
                        <span className="font-medium">{propertyData.offeringDetails.exitOptions.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column: Investment Card */}
          <div>
            <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Investment Summary</h3>
              </div>
              
              {/* Funding Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{propertyData.investors} investors</span>
                  <span className="font-medium">{Math.round((propertyData.fundingRaised / propertyData.fundingGoal) * 100)}% funded</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div 
                    className="h-full rounded-full bg-primary transition-all duration-300" 
                    style={{ width: `${Math.round((propertyData.fundingRaised / propertyData.fundingGoal) * 100)}%` }}
                  ></div>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-gray-500">₹{(propertyData.fundingRaised / 10000000).toFixed(1)}Cr raised</span>
                  <span className="text-gray-500">₹{(propertyData.fundingGoal / 10000000).toFixed(1)}Cr goal</span>
                </div>
              </div>
              
              {/* Investment Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-700">Property Value</span>
                  <span className="font-medium">₹{propertyData.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Min Investment</span>
                  <span className="font-medium">₹{propertyData.minInvestment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Expected Yield</span>
                  <span className="font-medium text-primary">{propertyData.yield}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Investment Term</span>
                  <span className="font-medium">{propertyData.offeringDetails.investmentTerm} years</span>
                </div>
              </div>
              
              {/* Contact & Invest Buttons */}
              <div className="space-y-3">
                <Button className="w-full" onClick={() => setIsInvestDialogOpen(true)}>
                  Invest Now
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Vendor
                </Button>
                <p className="text-xs text-center text-gray-500 mt-4">
                  Closing in <span className="font-medium text-primary">12 days</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Investment Dialog */}
      <Dialog open={isInvestDialogOpen} onOpenChange={setIsInvestDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Invest in {propertyData.title}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="mb-4">
              <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Investment Amount (₹)
              </label>
              <input
                type="number"
                id="investmentAmount"
                value={investmentAmount}
                onChange={handleInvestmentChange}
                min={propertyData.minInvestment}
                max={propertyData.offeringDetails.maxInvestment}
                step={1000}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
              <div className="mt-2 text-xs text-gray-500">
                Min: ₹{propertyData.minInvestment.toLocaleString()} | Max: ₹{propertyData.offeringDetails.maxInvestment.toLocaleString()}
              </div>
            </div>
            
            <div className="mt-6 rounded-md bg-gray-50 p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Investment Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Investment Amount</span>
                  <span className="font-medium">₹{investmentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ownership Percentage</span>
                  <span className="font-medium">
                    {((investmentAmount / propertyData.price) * 100).toFixed(4)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-200 pt-2 mt-2">
                  <span className="text-gray-600">Expected Annual Returns</span>
                  <span className="font-medium text-primary">₹{expectedReturns.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-4">
                By proceeding, you agree to our Terms of Service and Privacy Policy.
              </p>
              
              <div className="space-y-3">
                <Button className="w-full">
                  Proceed to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setIsInvestDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;

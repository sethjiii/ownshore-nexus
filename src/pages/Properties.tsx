import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

// Sample property data
const sampleProperties = [
  {
    id: "1",
    title: "Luxury Apartment in South Delhi",
    location: "Green Park, Delhi",
    price: 15000000,
    yield: 14.5,
    minInvestment: 25000,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80",
    type: "Residential",
    area: 1250,
    investors: 127,
    funded: 78,
  },
  {
    id: "2",
    title: "Commercial Space in Cyber City",
    location: "Gurugram, Haryana",
    price: 27500000,
    yield: 16.2,
    minInvestment: 50000,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80",
    type: "Commercial",
    area: 2100,
    investors: 89,
    funded: 62,
  },
  {
    id: "3",
    title: "Premium Villa in Koramangala",
    location: "Bengaluru, Karnataka",
    price: 35000000,
    yield: 12.8,
    minInvestment: 100000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    type: "Residential",
    area: 3500,
    investors: 215,
    funded: 91,
  },
  {
    id: "4",
    title: "Retail Space in Phoenix Mall",
    location: "Mumbai, Maharashtra",
    price: 18900000,
    yield: 15.6,
    minInvestment: 40000,
    image: "https://images.unsplash.com/photo-1565402170291-8491f14678db?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    type: "Commercial",
    area: 1800,
    investors: 156,
    funded: 84,
  },
  {
    id: "5",
    title: "Vacation Home in Shimla",
    location: "Shimla, Himachal Pradesh",
    price: 12500000,
    yield: 13.2,
    minInvestment: 20000,
    image: "https://images.unsplash.com/photo-1559767949-0faa5c7e9992?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    type: "Vacation",
    area: 1650,
    investors: 98,
    funded: 45,
  },
  {
    id: "6",
    title: "Office Space in HiTech City",
    location: "Hyderabad, Telangana",
    price: 22800000,
    yield: 14.8,
    minInvestment: 35000,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    type: "Commercial",
    area: 2350,
    investors: 132,
    funded: 71,
  },
  {
    id: "7",
    title: "Luxury Apartment in Bandra",
    location: "Bandra, Mumbai",
    price: 45000000,
    yield: 11.5,
    minInvestment: 100000,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    type: "Residential",
    area: 1850,
    investors: 210,
    funded: 95,
  },
  {
    id: "8",
    title: "Warehouse in Industrial Area",
    location: "Bhiwandi, Maharashtra",
    price: 32000000,
    yield: 17.2,
    minInvestment: 75000,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    type: "Commercial",
    area: 8500,
    investors: 65,
    funded: 58,
  },
  {
    id: "9",
    title: "Beach House in Goa",
    location: "Anjuna, Goa",
    price: 28000000,
    yield: 14.3,
    minInvestment: 50000,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    type: "Vacation",
    area: 2200,
    investors: 143,
    funded: 73,
  },
];

const Properties = () => {
  const location = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [priceRange, setPriceRange] = useState([10000000, 50000000]);
  const [yieldRange, setYieldRange] = useState([10, 20]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [filteredProperties, setFilteredProperties] = useState(sampleProperties);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Parse query parameters on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type');
    
    if (typeParam) {
      setSelectedTypes([typeParam]);
      setActiveFilters([`Type: ${typeParam}`]);
    }
  }, [location.search]);

  // Apply filters
  useEffect(() => {
    let result = sampleProperties;
    
    // Search filter
    if (searchValue) {
      result = result.filter(
        property => 
          property.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          property.location.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    
    // Price range filter
    result = result.filter(
      property => property.price >= priceRange[0] && property.price <= priceRange[1]
    );
    
    // Yield range filter
    result = result.filter(
      property => property.yield >= yieldRange[0] && property.yield <= yieldRange[1]
    );
    
    // Property type filter
    if (selectedTypes.length > 0) {
      result = result.filter(
        property => selectedTypes.includes(property.type)
      );
    }
    
    setFilteredProperties(result);
    
    // Update active filters
    const newActiveFilters = [];
    if (priceRange[0] !== 10000000 || priceRange[1] !== 50000000) {
      newActiveFilters.push(`Price: ₹${(priceRange[0]/1000000).toFixed(1)}M - ₹${(priceRange[1]/1000000).toFixed(1)}M`);
    }
    if (yieldRange[0] !== 10 || yieldRange[1] !== 20) {
      newActiveFilters.push(`Yield: ${yieldRange[0]}% - ${yieldRange[1]}%`);
    }
    if (selectedTypes.length > 0) {
      newActiveFilters.push(`Type: ${selectedTypes.join(', ')}`);
    }
    setActiveFilters(newActiveFilters);
    
  }, [searchValue, priceRange, yieldRange, selectedTypes]);

  const togglePropertyType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const clearAllFilters = () => {
    setSearchValue('');
    setPriceRange([10000000, 50000000]);
    setYieldRange([10, 20]);
    setSelectedTypes([]);
    setActiveFilters([]);
  };

  const removeFilter = (filter: string) => {
    if (filter.startsWith('Type:')) {
      const type = filter.replace('Type: ', '');
      setSelectedTypes(prev => prev.filter(t => t !== type));
    } else if (filter.startsWith('Price:')) {
      setPriceRange([10000000, 50000000]);
    } else if (filter.startsWith('Yield:')) {
      setYieldRange([10, 20]);
    }
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Page header */}
      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
          <p className="mt-2 text-gray-600">
            Discover and invest in premium properties across India
          </p>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by location or property name..."
                className="pl-10"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            
            {/* Filter button */}
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
          
          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <button
                    onClick={() => removeFilter(filter)}
                    className="ml-1 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <button
                onClick={clearAllFilters}
                className="ml-2 text-sm text-primary hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
          
          {/* Expanded filter panel */}
          {isFilterOpen && (
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm animate-scale-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price range */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      defaultValue={priceRange}
                      min={10000000}
                      max={50000000}
                      step={1000000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹{(priceRange[0]/1000000).toFixed(1)}M</span>
                      <span>₹{(priceRange[1]/1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                </div>
                
                {/* Yield range */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Yield Range</h3>
                  <div className="space-y-4">
                    <Slider
                      defaultValue={yieldRange}
                      min={10}
                      max={20}
                      step={0.5}
                      value={yieldRange}
                      onValueChange={setYieldRange}
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{yieldRange[0]}%</span>
                      <span>{yieldRange[1]}%</span>
                    </div>
                  </div>
                </div>
                
                {/* Property type */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Property Type</h3>
                  <div className="space-y-2">
                    {['Residential', 'Commercial', 'Vacation'].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Switch
                          id={`filter-${type}`}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={() => togglePropertyType(type)}
                        />
                        <Label htmlFor={`filter-${type}`}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="mr-2"
                >
                  Reset Filters
                </Button>
                <Button
                  size="sm"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Properties grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing <span className="font-medium">{filteredProperties.length}</span> properties
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="rounded-md border-gray-300 text-sm focus:border-primary focus:ring-primary">
              <option>Latest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Yield: High to Low</option>
            </select>
          </div>
        </div>
        
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                className="animate-fade-in"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto mb-4 h-16 w-16 text-gray-400">
              <MapPin className="h-full w-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
            <p className="mt-1 text-gray-600">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              onClick={clearAllFilters}
              variant="outline"
              className="mt-4"
            >
              Clear filters
            </Button>
          </div>
        )}
        
        {/* Pagination */}
        {filteredProperties.length > 0 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-primary text-white">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </nav>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Properties;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  yield: number;
  minInvestment: number;
  image: string;
  type: string;
  area: number;
  investors?: number;
  funded?: number;
  className?: string;
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  yield: yieldPercentage,
  minInvestment,
  image,
  type,
  area,
  investors = 0,
  funded = 0,
  className = '',
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const shareProperty = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Share functionality would go here
  };

  return (
    <Link to={`/property/${id}`} className={`group block ${className}`}>
      <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
        {/* Property Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Actions */}
          <div className="absolute top-3 right-3 flex space-x-2">
            <button 
              onClick={toggleFavorite} 
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
              aria-label="Add to favorites"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
            <button 
              onClick={shareProperty} 
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
              aria-label="Share property"
            >
              <Share2 className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          
          {/* Property Type Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-white/90 text-xs font-medium">
              {type}
            </Badge>
          </div>
        </div>
        
        {/* Property Info */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">{title}</h3>
              <div className="mt-1 flex items-center text-xs text-gray-500">
                <MapPin className="mr-1 h-3 w-3" />
                <span>{location}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">₹{price.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Total Value</p>
            </div>
          </div>
          
          {/* Property Details */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-md bg-gray-50 px-2 py-1.5">
              <p className="text-xs font-medium text-gray-900">{yieldPercentage}%</p>
              <p className="text-xs text-gray-500">Yield</p>
            </div>
            <div className="rounded-md bg-gray-50 px-2 py-1.5">
              <p className="text-xs font-medium text-gray-900">₹{minInvestment.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Min Invest</p>
            </div>
            <div className="rounded-md bg-gray-50 px-2 py-1.5">
              <p className="text-xs font-medium text-gray-900">{area} sq.ft</p>
              <p className="text-xs text-gray-500">Area</p>
            </div>
          </div>
          
          {/* Funding Progress (if applicable) */}
          {(investors > 0 || funded > 0) && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{investors} investors</span>
                <span className="font-medium">{funded}% funded</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div 
                  className="h-full rounded-full bg-primary transition-all duration-300" 
                  style={{ width: `${funded}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;

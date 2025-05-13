import {Card, CardContent, CardActions, Button, Typography, Rating} from '@mui/material'; 

/**
 * Props for the CompanyCard component.
 */
interface CompanyCardProps {
  logo: string;        
  name: string;        
  subtitle: string;   
  completeIn: string;  
  price: string;      
  rating?: number;     
  reviews: number;     
}

/**
 * CompanyCard renders a material-styled card displaying:
 * - Logo
 * - Name & subtitle
 * - Star rating + review count
 * - Completion time
 * - Price
 * - Action buttons
 */
export default function CompanyCard({
  logo,
  name,
  subtitle,
  completeIn,
  price,
  rating,
  reviews
}: CompanyCardProps) {
  return (
    <Card className="w-72 rounded-xl overflow-hidden shadow-sm">
      {/* Display the company logo */}
      <img
        src={logo}
        alt={`${name} logo`}
        className="h-32 w-full object-contain bg-white"
      />

      <CardContent className="p-4">
        {/* Company name */}
        <Typography variant="h6" className="font-semibold mb-1">
          {name}
        </Typography>

        {/* Subtitle / description */}
        <Typography variant="body2" className="text-gray-600 mb-2">
          {subtitle}
        </Typography>

        {/* Star rating + review count */}
        <div className="flex items-center mb-2">
          {/* If rating is undefined, show 0 stars */}
          <Rating
            value={rating ?? 0}
            precision={0.1}
            size="small"
            readOnly
          />
          <span className="ml-2 text-sm text-gray-500">
            {/* Safely format rating or show 'N/A' */}
            {rating != null ? rating.toFixed(1) : 'N/A'} ({reviews})
          </span>
        </div>

        {/* Completion time info */}
        <Typography
          variant="caption"
          className="text-gray-500 block mb-1"
        >
          Complete in {completeIn}
        </Typography>

        {/* Price display */}
        <Typography variant="h6" className="font-bold">
          {price}
        </Typography>
      </CardContent>

      <CardActions className="justify-between p-4">
        {/* Message button */}
        <Button size="small" variant="outlined">
          Message
        </Button>
        {/* Incorporate button */}
        <Button size="small" variant="contained" color="primary">
          Incorporate
        </Button>
      </CardActions>
    </Card>
  );
}

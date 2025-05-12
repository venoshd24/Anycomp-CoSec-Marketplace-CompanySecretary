// components/CompanyCard.tsx
import { Card, CardContent, CardActions, Button, Typography, Rating } from '@mui/material';

interface CompanyCardProps {
  logo: string;
  name: string;
  subtitle: string;
  completeIn: string;
  price: string;
  rating?: number;  // ← make optional
  reviews: number;
}

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
      <img src={logo} alt={name} className="h-32 w-full object-contain bg-white" />
      <CardContent className="p-4">
        <Typography variant="h6" className="font-semibold mb-1">{name}</Typography>
        <Typography variant="body2" className="text-gray-600 mb-2">{subtitle}</Typography>
        <div className="flex items-center mb-2">
          <Rating value={rating ?? 0} precision={0.1} size="small" readOnly />
          <span className="ml-2 text-sm text-gray-500">
            {rating != null ? rating.toFixed(1) : 'N/A'} ({reviews})
          </span>
        </div>
        <Typography variant="caption" className="text-gray-500 block mb-1">
          Complete in {completeIn}
        </Typography>
        <Typography variant="h6" className="font-bold">{price}</Typography>
      </CardContent>
      <CardActions className="justify-between p-4">
        <Button size="small" variant="outlined">Message</Button>
        <Button size="small" variant="contained" color="primary">Incorporate</Button>
      </CardActions>
    </Card>
  );
}

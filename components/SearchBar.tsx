import { FC } from 'react';                             
import SearchIcon from '@mui/icons-material/Search';    
import {FormControl, InputLabel, Select, MenuItem, TextField, Button} from '@mui/material'; 
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';                         
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

/**
 * Props for the SearchBar component:
 * - companyType:          currently selected company type string
 * - region:               currently selected region string
 * - completion:           currently selected date (ISO 'YYYY-MM-DD')
 * - onCompanyTypeChange:  callback when the company type changes
 * - onRegionChange:       callback when the region changes
 * - onCompletionChange:   callback when the date picker changes
 * - onSearch:             callback when the Search button is clicked
 */
interface SearchBarProps {
  companyType: string;
  region: string;
  completion: string;
  onCompanyTypeChange: (val: string) => void;
  onRegionChange: (val: string) => void;
  onCompletionChange: (val: string) => void;
  onSearch: () => void;
}

// Static list of company type options
const companyTypes = [
  'Private Limited Company (Sdn Bhd)',
  'Public Limited Company (Berhad)',
  'Limited Liability Partnership (LLP)',
  'Sole Proprietorship',
  'Partnership',
  'Foreign Company'
];

// Static list of region options
const regions = [
  'Peninsular Malaysia (West Malaysia)',
  'East Malaysia'
];

/**
 * SearchBar renders a pill-shaped container with:
 * - A dropdown to select company type
 * - A dropdown to select region
 * - A date picker for completion date
 * - A Search button with an icon
 *
 * Each control expands to fill the available space (flex-1),
 * and the entire bar stretches to the full width of its parent (w-full).
 */
const SearchBar: FC<SearchBarProps> = ({
  companyType,
  region,
  completion,
  onCompanyTypeChange,
  onRegionChange,
  onCompletionChange,
  onSearch
}) => (
  <div className="w-full flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm space-x-4">
    {/* Company Type Selector */}
    <FormControl size="small" variant="outlined" className="flex-1">
      <InputLabel>Company Type</InputLabel>
      <Select
        value={companyType}
        label="Company Type"
        onChange={e => onCompanyTypeChange(e.target.value as string)}
      >
        {companyTypes.map(type => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {/* Region Selector */}
    <FormControl size="small" variant="outlined" className="flex-1">
      <InputLabel>Region</InputLabel>
      <Select
        value={region}
        label="Region"
        onChange={e => onRegionChange(e.target.value as string)}
      >
        {regions.map(r => (
          <MenuItem key={r} value={r}>
            {r}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {/* Date Picker for Completion Date */}
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date of completion"
        // Convert ISO string to Date object for the picker
        value={completion ? new Date(completion) : null}
        // On date change, convert back to ISO 'YYYY-MM-DD' or empty string
        onChange={date =>
          onCompletionChange(date ? date.toISOString().split('T')[0] : '')
        }
        // Render the picker input as a small-outlined TextField
        renderInput={params => (
          <TextField
            {...params}
            size="small"
            variant="outlined"
            className="flex-1"
          />
        )}
      />
    </LocalizationProvider>

    {/* Search Button */}
    <Button
      variant="contained"
      color="primary"
      className="rounded-full px-6"
      onClick={onSearch}              // Fire the search callback when clicked
      startIcon={<SearchIcon />}      // Display a search icon inside the button
    >
      Search
    </Button>
  </div>
);

export default SearchBar;

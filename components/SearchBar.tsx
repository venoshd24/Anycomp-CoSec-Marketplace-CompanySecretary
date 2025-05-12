import { FC } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button
} from '@mui/material';
import {
  LocalizationProvider,
  DatePicker
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface SearchBarProps {
  companyType: string;
  region: string;
  completion: string; // ISO date YYYY-MM-DD
  onCompanyTypeChange: (val: string) => void;
  onRegionChange: (val: string) => void;
  onCompletionChange: (val: string) => void;
  onSearch: () => void;
}

const companyTypes = [
  'Private Limited Company (Sdn Bhd)',
  'Public Limited Company (Berhad)',
  'Limited Liability Partnership (LLP)',
  'Sole Proprietorship',
  'Partnership',
  'Foreign Company'
];

const regions = [
  'Peninsular Malaysia (West Malaysia)',
  'East Malaysia'
];

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
    <FormControl size="small" variant="outlined" className="flex-1">
      <InputLabel>Company Type</InputLabel>
      <Select
        value={companyType}
        label="Company Type"
        onChange={e => onCompanyTypeChange(e.target.value as string)}
      >
        {companyTypes.map(type => (
          <MenuItem key={type} value={type}>{type}</MenuItem>
        ))}
      </Select>
    </FormControl>

    <FormControl size="small" variant="outlined" className="flex-1">
      <InputLabel>Region</InputLabel>
      <Select
        value={region}
        label="Region"
        onChange={e => onRegionChange(e.target.value as string)}
      >
        {regions.map(r => (
          <MenuItem key={r} value={r}>{r}</MenuItem>
        ))}
      </Select>
    </FormControl>

    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date of completion"
        value={completion ? new Date(completion) : null}
        onChange={date =>
          onCompletionChange(date ? date.toISOString().split('T')[0] : '')
        }
        renderInput={params => (
          <TextField {...params} size="small" variant="outlined" className="flex-1" />
        )}
      />
    </LocalizationProvider>

    <Button
      variant="contained"
      color="primary"
      className="rounded-full px-6"
      onClick={onSearch}
      startIcon={<SearchIcon />}
    >
      Search
    </Button>
  </div>
);

export default SearchBar;

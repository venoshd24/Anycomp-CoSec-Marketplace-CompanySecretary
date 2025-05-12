import { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import CompanyCard from '../components/CompanyCard';
import Pagination from '@mui/material/Pagination';

const rawData = [
  { logo: '/logos/logo_1.png', name: 'Gobiz Cosec Firm', subtitle: 'Secretarial service firm', companyType: 'Private Limited Company (Sdn Bhd)', region: 'Peninsular Malaysia (West Malaysia)', completeIn: '2–3 working days', price: 'RM1,600', rating: 4.9, reviews: 248 },
  { logo: '/logos/logo_2.png', name: 'Sarontent Net', subtitle: 'Secretarial service firm', companyType: 'Public Limited Company (Berhad)', region: 'Peninsular Malaysia (West Malaysia)', completeIn: '7–14 working days', price: 'RM1,499', rating: 3.2, reviews: 191 },
  { logo: '/logos/logo_3.png', name: 'Expert Services', subtitle: 'Secretarial service firm', companyType: 'Foreign Company', region: 'East Malaysia', completeIn: '12–14 working days', price: 'RM2,200', rating: 1.3, reviews: 48 },
  { logo: '/logos/logo_4.png', name: 'Global Advisors', subtitle: 'Consulting and secretarial firm', companyType: 'Public Limited Company (Berhad)', region: 'East Malaysia', completeIn: '10–12 working days', price: 'RM3,200', rating: 4.0, reviews: 76 },
  { logo: '/logos/logo_5.png', name: 'FinExpert', subtitle: 'Financial secretarial services', companyType: 'Private Limited Company (Sdn Bhd)', region: 'East Malaysia', completeIn: '5–7 working days', price: 'RM1,900', rating: 4.2, reviews: 89 },
  { logo: '/logos/logo_6.png', name: 'Legal Pros', subtitle: 'Legal and secretarial consulting', companyType: 'Public Limited Company (Berhad)', region: 'Peninsular Malaysia (West Malaysia)', completeIn: '8–10 working days', price: 'RM2,450', rating: 3.9, reviews: 120 },
  { logo: '/logos/logo_7.png', name: 'Startup Hub', subtitle: 'Startup incorporation specialists', companyType: 'Private Limited Company (Sdn Bhd)', region: 'Peninsular Malaysia (West Malaysia)', completeIn: '1–2 working days', price: 'RM1,350', rating: 4.8, reviews: 154 },
  { logo: '/logos/logo_8.png', name: 'Stability Ltd', subtitle: 'Corporate stability services', companyType: 'Public Limited Company (Berhad)', region: 'Peninsular Malaysia (West Malaysia)', completeIn: '7–9 working days', price: 'RM2,000', rating: 3.8, reviews: 84 },
  { logo: '/logos/logo_10.png', name: 'GreenLeaf Corp', subtitle: 'Eco-friendly secretarial services', companyType: 'Limited Liability Partnership (LLP)', region: 'Peninsular Malaysia (West Malaysia)', completeIn: '4–6 working days', price: 'RM1,700', rating: 4.7, reviews: 67 },
  { logo: '/logos/logo_11.png', name: 'Urban Legal', subtitle: 'City-based secretarial specialists', companyType: 'Sole Proprietorship', region: 'East Malaysia', completeIn: '3–5 working days', price: 'RM1,600', rating: 4.3, reviews: 102 },
  { logo: '/logos/logo_12.png', name: 'Trustworthy Services', subtitle: 'Reliable secretarial support', companyType: 'Sole Proprietorship', region: 'East Malaysia', completeIn: '5–7 working days', price: 'RM1,750', rating: 4.4, reviews: 98 }
];

export default function Home() {
  // Input states (updated on user interaction)
  const [inputCompanyType, setInputCompanyType] = useState<string>('All');
  const [inputRegion, setInputRegion] = useState<string>('All');
  const [inputCompletionDate, setInputCompletionDate] = useState<string>('');

  // Active filter states (applied on search click)
  const [companyType, setCompanyType] = useState<string>('All');
  const [regionState, setRegionState] = useState<string>('All');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [sortOption, setSortOption] = useState<'priceAsc'|'priceDesc'|'rating'|'fastest'>('priceAsc');

  // Pagination state
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Compute filtered & sorted data
  const filteredData = useMemo(() => {
    const today = new Date();
    today.setHours(0,0,0,0);

    // 1) Filter by active criteria
    let data = rawData.filter(item => {
      if (companyType !== 'All' && item.companyType !== companyType) return false;
      if (regionState  !== 'All' && item.region !== regionState ) return false;
      if (preferredDate) {
        const target = new Date(preferredDate);
        target.setHours(0,0,0,0);
        const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000*60*60*24));
        const m = item.completeIn.match(/(\d+)(?:–(\d+))?/);
        if (!m) return false;
        const low  = parseInt(m[1], 10);
        // include if company's low bound <= diffDays
        if (diffDays < low) return false;
      }
      return true;
    });

    // 2) Sort the filtered results
    const parsePrice   = (p: string) => parseFloat(p.replace(/[^0-9.]/g, ''));
    const parseDaysAvg = (s: string) => {
      const m = s.match(/(\d+)(?:–(\d+))?/);
      if (!m) return Infinity;
      const low  = +m[1], high = m[2] ? +m[2] : low;
      return (low + high) / 2;
    };

    data.sort((a, b) => {
      switch (sortOption) {
        case 'priceAsc':  return parsePrice(a.price) - parsePrice(b.price);
        case 'priceDesc': return parsePrice(b.price) - parsePrice(a.price);
        case 'rating':    return (b.rating||0) - (a.rating||0);
        case 'fastest':   return parseDaysAvg(a.completeIn) - parseDaysAvg(b.completeIn);
      }
    });

    return data;
  }, [companyType, regionState, preferredDate, sortOption]);

  // Pagination logic
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(
    () => filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [filteredData, page]
  );

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Layout>
      {/* Search Filters */}
      <div className="mt-4">
        <SearchBar
          companyType={inputCompanyType}
          region={inputRegion}
          completion={inputCompletionDate}
          onCompanyTypeChange={setInputCompanyType}
          onRegionChange={setInputRegion}
          onCompletionChange={setInputCompletionDate}
          onSearch={() => {
            setCompanyType(inputCompanyType);
            setRegionState(inputRegion);
            setPreferredDate(inputCompletionDate);
            setPage(1);
          }}
        />
      </div>

      {/* Page Title */}
      <div className="mt-6 mb-6">
        <h1 className="text-3xl font-bold">Incorporate new company</h1>
        <p className="text-gray-600">Over 350 Company Secretaries ready to assist you</p>
      </div>

      {/* Sort & Filter Controls */}
      <div className="flex items-center mb-6 justify-end space-x-4">
        <label htmlFor="sort" className="font-medium">Sort by:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={e => setSortOption(e.target.value as any)}
          className="border border-gray-300 rounded p-1"
        >
          <option value="priceAsc">Price: Low → High</option>
          <option value="priceDesc">Price: High → Low</option>
          <option value="rating">Top Ratings</option>
          <option value="fastest">Fastest Completion</option>
        </select>

        <label htmlFor="filterType" className="font-medium">Filter by Type:</label>
        <select
          id="filterType"
          value={companyType}
          onChange={e => setCompanyType(e.target.value)}
          className="border border-gray-300 rounded p-1"
        >
          <option value="All">All</option>
          <option value="Private Limited Company (Sdn Bhd)">Private Limited</option>
          <option value="Public Limited Company (Berhad)">Public Limited</option>
          <option value="Limited Liability Partnership (LLP)">LLP</option>
          <option value="Sole Proprietorship">Sole Proprietorship</option>
          <option value="Partnership">Partnership</option>
          <option value="Foreign Company">Foreign Company</option>
        </select>

      </div>

      {/* Company Cards Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {paginatedData.map((item, idx) => (
          <CompanyCard key={idx} {...item} />
        ))}
      </div>

      {/* Pagination Controls */}
      {pageCount > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
        </div>
      )}
    </Layout>
  );
}
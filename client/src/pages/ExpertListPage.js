import React, { useState, useEffect } from 'react';
import { expertAPI } from '../api/api';
import ExpertCard from '../components/ExpertCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import './ExpertListPage.css';

const ExpertListPage = () => {
  const [experts, setExperts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    category: 'all'
  });

  const fetchExperts = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Show more experts when category is selected
      const limit = filters.category !== 'all' ? 20 : 10;
      
      const params = {
        page: pagination.page,
        limit: limit,
        ...(filters.search && { search: filters.search }),
        ...(filters.category !== 'all' && { category: filters.category })
      };
      
      const response = await expertAPI.getExperts(params);
      
      if (response.data.success) {
        setExperts(response.data.data.experts);
        setCategories(response.data.data.categories);
        setPagination(response.data.data.pagination);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, [pagination.page, filters]);

  const handleExpertClick = (expertId) => {
    window.location.href = `/expert/${expertId}`;
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleSearchChange = (value) => {
    setFilters(prev => ({ ...prev, search: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleCategoryChange = (value) => {
    setFilters(prev => ({ ...prev, category: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  if (loading && experts.length === 0) {
    return <Loader size="large" text="Loading experts..." />;
  }

  return (
    <div className="expert-list-page">
      <div className="page-header">
        <h1>Find Your Expert</h1>
        <p>Connect with professionals across various fields</p>
      </div>
      
      <div className="filters-section">
        <div className="filters-row">
          <SearchBar
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search experts by name..."
          />
          
          <FilterDropdown
            categories={categories}
            value={filters.category}
            onChange={handleCategoryChange}
          />
        </div>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="experts-grid">
        {experts.map((expert) => (
          <ExpertCard
            key={expert._id}
            expert={expert}
            onClick={handleExpertClick}
          />
        ))}
      </div>
      
      {experts.length === 0 && !loading && (
        <div className="no-results">
          <h3>No experts found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
      
      {pagination.pages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pages}
          onPageChange={handlePageChange}
        />
      )}
      
      {loading && experts.length > 0 && (
        <div className="loading-overlay">
          <Loader size="small" />
        </div>
      )}
    </div>
  );
};

export default ExpertListPage;

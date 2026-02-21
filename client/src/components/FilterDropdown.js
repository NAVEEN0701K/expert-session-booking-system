import React from 'react';
import './FilterDropdown.css';

const FilterDropdown = ({ categories, value, onChange, label = 'Category' }) => {
  return (
    <div className="filter-dropdown">
      <label className="filter-label">{label}</label>
      <select
        className="filter-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;

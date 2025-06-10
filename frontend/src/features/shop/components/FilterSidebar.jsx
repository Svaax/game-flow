import React from 'react';

const FilterSidebar = ({ priceRange, selectedCategory, onCategoryChange, onPriceChange }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Filters</h2>
            <div>
                <h3 className="font-semibold mb-3 text-gray-700">Price Range</h3>
                <input
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={priceRange.selected ?? priceRange.min}
                    onChange={onPriceChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.selected ?? priceRange.min}</span>
                    <span>${priceRange.max}</span>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
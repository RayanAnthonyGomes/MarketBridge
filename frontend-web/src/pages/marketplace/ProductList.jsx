import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, List, X } from 'lucide-react';
import ProductCard from '../../components/shared/ProductCard';
import { products, categories } from '../../data/products';
import './ProductList.css';

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(true);

  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || 'popular';
  const minPrice = Number(searchParams.get('minPrice') || 0);
  const maxPrice = Number(searchParams.get('maxPrice') || 2000);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({});

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.id.localeCompare(a.id)); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, minPrice, maxPrice]);

  const hasActiveFilters = searchQuery || selectedCategory || minPrice > 0 || maxPrice < 2000;

  return (
    <div className="product-list-page page-enter">
      <div className="container">
        <div className="plp-header">
          <div>
            <h1 className="h1">
              {selectedCategory
                ? categories.find(c => c.id === selectedCategory)?.name || 'Products'
                : searchQuery
                  ? `Results for "${searchQuery}"`
                  : 'All Products'}
            </h1>
            <p className="text-secondary body-sm">{filtered.length} products found</p>
          </div>
          <div className="plp-controls">
            <button className="btn btn-ghost btn-sm hide-desktop" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal size={16} /> Filters
            </button>
            <select
              className="input"
              style={{ width: 180, height: 38, fontSize: '0.85rem' }}
              value={sortBy}
              onChange={e => updateParam('sort', e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <div className="view-toggle hide-mobile">
              <button className={`btn-icon ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                <Grid3X3 size={18} />
              </button>
              <button className={`btn-icon ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="active-filters">
            {searchQuery && (
              <span className="filter-chip">
                Search: {searchQuery}
                <button onClick={() => updateParam('search', '')}><X size={12} /></button>
              </span>
            )}
            {selectedCategory && (
              <span className="filter-chip">
                {categories.find(c => c.id === selectedCategory)?.name}
                <button onClick={() => updateParam('category', '')}><X size={12} /></button>
              </span>
            )}
            <button className="btn btn-ghost btn-sm" onClick={clearFilters}>Clear All</button>
          </div>
        )}

        <div className="plp-layout">
          {showFilters && (
            <aside className="plp-sidebar">
              <div className="filter-section">
                <h4>Categories</h4>
                <div className="filter-options">
                  <label className={`filter-option ${!selectedCategory ? 'active' : ''}`}>
                    <input type="radio" name="category" checked={!selectedCategory} onChange={() => updateParam('category', '')} />
                    <span>All Categories</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat.id} className={`filter-option ${selectedCategory === cat.id ? 'active' : ''}`}>
                      <input type="radio" name="category" checked={selectedCategory === cat.id} onChange={() => updateParam('category', cat.id)} />
                      <span>{cat.icon} {cat.name}</span>
                      <span className="filter-count">{cat.count}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="filter-section">
                <h4>Price Range</h4>
                <div className="price-range">
                  <input
                    type="number"
                    className="input"
                    placeholder="Min"
                    style={{ height: 36, fontSize: '0.85rem' }}
                    value={minPrice || ''}
                    onChange={e => updateParam('minPrice', e.target.value)}
                  />
                  <span className="text-muted">–</span>
                  <input
                    type="number"
                    className="input"
                    placeholder="Max"
                    style={{ height: 36, fontSize: '0.85rem' }}
                    value={maxPrice === 2000 ? '' : maxPrice}
                    onChange={e => updateParam('maxPrice', e.target.value || '2000')}
                  />
                </div>
              </div>
            </aside>
          )}

          <div className="plp-main">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No products found</h3>
                <p className="text-secondary">Try adjusting your filters or search query.</p>
                <button className="btn btn-primary btn-md" onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              <div className={`product-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

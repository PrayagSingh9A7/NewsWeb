function FiltersBar({
  sources,
  selectedSource,
  sortOrder,
  onSourceChange,
  onSortChange,
}) {
  return (
    <div className="filters-bar">
      <div className="filter-control">
        <label htmlFor="sourceFilter" className="form-label">
          Source
        </label>

        <select
          id="sourceFilter"
          className="form-select"
          value={selectedSource}
          onChange={(event) => onSourceChange(event.target.value)}
        >
          <option value="all">All sources</option>
          {sources.map((source) => (
            <option value={source} key={source}>
              {source}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-control">
        <label htmlFor="sortOrder" className="form-label">
          Sort
        </label>

        <select
          id="sortOrder"
          className="form-select"
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="latest">Latest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
    </div>
  );
}

export default FiltersBar;

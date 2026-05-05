import { useState } from "react";

function SearchBar({ initialValue, onSearch }) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(value);
  };

  const clearSearch = () => {
    setValue("");
    onSearch("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="input-group input-group-lg">
        <input
          className="form-control"
          type="search"
          placeholder="Search headlines..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />

        {value && (
          <button className="btn btn-outline-secondary" type="button" onClick={clearSearch}>
            Clear
          </button>
        )}

        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;

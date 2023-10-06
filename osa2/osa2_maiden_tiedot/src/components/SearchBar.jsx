const SearchBar = ({ newCountry, handleCountryChange }) => {
  return (
    <div>
      insert country:
      <input type="text" value={newCountry} onChange={handleCountryChange} />
    </div>
  );
};

export default SearchBar;

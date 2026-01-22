function Search({ onSearch }) {
  return (
    <form className="searchbar" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        id="search"
        placeholder="search free stuff"
        onChange={(e) => onSearch(e.target.value)}
      />
      <button type="submit">🔍</button>
    </form>
  );
}

export default Search;

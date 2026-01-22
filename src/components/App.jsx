import { useState, useEffect } from 'react'
import Header from "./Header";
import ListingForm from "./ListingForm";
import ListingsContainer from "./ListingsContainer";

function App() {
  // State to hold all listings fetched from the backend
  const [listings, setListings] = useState([])
  // State to hold search query
  const [search, setSearch] = useState("")

  // Fetch listings from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then(r => {
        if (!r.ok) {
          throw new Error("failed to get listings")
        }
        return r.json()
      })
      .then(data => setListings(data.listings))
      .catch(error => console.log(error.message))
  }, []);

  // Add a new listing to state after successful creation
  const addListing = (newListing) => {
    setListings(previousListings => [...previousListings, newListing])
  }

  // Update an existing listing in state (used for favorite toggling)
  const updateListing = (updatedListing) => {
    setListings(previousListings => 
      previousListings.map(listing => 
        listing.id === updatedListing.id ? updatedListing : listing
      )
    )
  }

  // Delete a listing from state by ID
  const deleteListing = (deletedListingId) => {
    setListings(previousListings => 
      previousListings.filter(listing => listing.id !== deletedListingId)
    )
  }

  // Filter listings by search query (case-insensitive match on description)
  const displayedListings = listings.filter((listing) =>
    listing.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <Header onSearch={setSearch} />
      <ListingForm addListing={addListing} />
      <ListingsContainer 
        listings={displayedListings} 
        updateListing={updateListing} 
        deleteListing={deleteListing} 
      />
    </div>
  );
}

export default App;

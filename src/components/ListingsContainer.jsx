import ListingCard from "./ListingCard";

function ListingsContainer({ listings, updateListing, deleteListing }) {
  return (
    <main>
      <ul className="cards">
        {listings.map(listing => (
          <ListingCard
            key={listing.id}
            {...listing}
            updateListing={updateListing}
            deleteListing={deleteListing}
          />
        ))}
      </ul>
    </main>
  );
}

export default ListingsContainer;

import { useEffect, useState } from 'react';
import { filterData } from '../utils/utils';
import useFetch from '../hooks/use-fetch';
import Card from './Card';

// SearchBar Component
const SearchBar = ({ searchQuery, handleSearch, handleKeyDown }) => {
    return (
        <input
            className='search-input'
            type="text"
            placeholder="Search users by ID, address, name..."
            value={searchQuery}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
        />
    );
}

// SearchUser Component
const SearchUser = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, isLoading, isError } = useFetch('https://fe-take-home-assignment.s3.us-east-2.amazonaws.com/Data.json');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [searchResults, setSearchResults] = useState([]);

    // Handle search input change
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setHighlightedIndex(-1);
        setSearchResults(() => filterData(data, e.target.value));
    };

    // Handle card click
    const handleCardClick = (index) => {
        setHighlightedIndex(index);
    };

    // Handle arrow key navigation
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown' && highlightedIndex < searchResults.length - 1) {
            setHighlightedIndex((prev) => prev + 1);
        } else if (e.key === 'ArrowUp' && highlightedIndex > 0) {
            setHighlightedIndex((prev) => prev - 1);
        }
    };

    // Scroll to highlighted card on index change
    useEffect(() => {
        const card = document.querySelector('.highlighted');
        if (card) {
            card.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [highlightedIndex]);

    // Loading and error handling
    if (isLoading) return <div>Loading...</div>
    if (isError?.status) return <div>Some Error Occured.</div>

    // Display search results
    return (
        <>
            <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} handleKeyDown={handleKeyDown} />
            <section className="card-list">
                {searchResults.length === 0 && searchQuery !== "" ? <div className='card'>No User Found</div> : searchResults.map((item, index) => (
                    <Card
                        key={item.id}
                        item={item}
                        index={index}
                        highlightedIndex={highlightedIndex}
                        handleCardClick={handleCardClick}
                        searchQuery={searchQuery}
                    />
                ))}
            </section>
        </>
    );
}

export default SearchUser;
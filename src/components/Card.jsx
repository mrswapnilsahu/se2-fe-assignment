import PropTypes from 'prop-types';
import { searchElementInArray } from '../utils/utils';

// Card component 
const Card = ({ item, index, highlightedIndex, handleCardClick, searchQuery }) => {
    const { id, name, address, items } = item;

    // Check if search query matches any item in the 'items' array
    const isSearchQueryFound = searchQuery && searchElementInArray(items, searchQuery);

    return (
        <article
            key={id}
            className={`card ${index === highlightedIndex ? 'highlighted' : ''}`}
            onClick={() => handleCardClick(index)}
        >
            <span className='user-id'>{id}</span>
            <p>{name}</p>
            <p>{address}</p>
            {/* Display a message if search query is found in items */}
            {isSearchQueryFound && (
                <ul>
                    <li className="found-text">{`${searchQuery} found in items`}</li>
                </ul>
            )}
        </article>
    );
};

// Define prop types for Card component 
Card.propTypes = {
    item: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string, address: PropTypes.string, items: PropTypes.arrayOf(PropTypes.string), }),
    index: PropTypes.number,
    highlightedIndex: PropTypes.number,
    handleCardClick: PropTypes.func,
    searchQuery: PropTypes.string,
};

export default Card;
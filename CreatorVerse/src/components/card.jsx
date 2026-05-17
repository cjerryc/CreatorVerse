// A file to represent a content creator, export as Card.
// Creates a Card component that takes in a creator object and 
// displays the creator's name, description, and a link to their content.

import { Link } from "react-router-dom";

const Card = ({ creator }) => {
  const { id, name, url, description, imageURL } = creator;

  return (
    <div className="card">
      {imageURL && (
        <img src={imageURL} alt={name} />
      )}
      <h2>{name}</h2>
      <p>{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
      <div className="card-links">
        <Link to={`/creator/${id}`}>View</Link>
        <Link to={`/creator/${id}/edit`}>Edit</Link>
      </div>
    </div>
  );
};

export default Card;
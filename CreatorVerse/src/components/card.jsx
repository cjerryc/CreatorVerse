// A file to represent a content creator, export as Card.
// Creates a Card component that takes in a creator object and 
// displays the creator's name, description, and a link to their content.

import { Link } from "react-router-dom";

const Card = ({ creator }) => {
  const { id, name, url, description, imageURL } = creator;

  return (
    <article>
      {imageURL && (
        <img src={imageURL} alt={name} />
      )}
      <h2>{name}</h2>
      <p>{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
      <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
        <Link to={`/creator/${id}`} role="button" style={{ width: "fit-content" }}>View</Link>
        <Link to={`/creator/${id}/edit`} role="button" className="secondary" style={{ width: "fit-content" }}>Edit</Link>
      </div>
    </article>
  );
};

export default Card;
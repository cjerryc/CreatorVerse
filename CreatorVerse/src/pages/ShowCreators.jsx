import { Link } from "react-router-dom";
import Card from "../components/Card";

const ShowCreators = ({ creators }) => {
  return (
    <div className="show-creators">
      <h1>Creators</h1>
      <div className="grid">
      {creators.length === 0 ? (
        <p>No creators yet. Be the first to add one!</p>
      ) : (
        creators.map((creator) => (
          <Card key={creator.id} creator={creator} />
        ))
      )}
      </div>
      <Link to="/new" role="button">
        <button>Add Creator</button>
      </Link>
    </div>
  );
};

export default ShowCreators;
import { Link } from "react-router-dom";
import Card from "../components/Card";

const ShowCreators = ({ creators }) => {
  return (
    <div className="show-creators">
      <Link to="/new">
        <button>Add Creator</button>
      </Link>
      {creators.length === 0 ? (
        <p>No creators yet. Be the first to add one!</p>
      ) : (
        creators.map((creator) => (
          <Card key={creator.id} creator={creator} />
        ))
      )}
    </div>
  );
};

export default ShowCreators;
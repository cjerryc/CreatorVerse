import Card from "../components/Card";

const ShowCreators = ({ creators }) => {
  return (
    <div className="show-creators">
      {creators.length === 0 ? (
        <p>No creators yet. Add one!</p>
      ) : (
        creators.map((creator) => (
          <Card key={creator.id} creator={creator} />
        ))
      )}
    </div>
  );
};

export default ShowCreators;
import { useEffect, useState } from "react";
import Card from "../components/Card";
import supabaseClient from "../client"; // supabase client instance to interact with the database
import { useParams, Link, useNavigate } from "react-router-dom";

const ViewCreator = () => {
  const [creator, setCreator] = useState(null); // state to hold the individual creator
  const { id } = useParams(); // get the creator ID from the URL parameters
  const navigate = useNavigate(); // back button from single creator view => main app
  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabaseClient
        .from("creators")        // table in Supabase
        .select("*")
        .eq("id", id)    // filter to just this creator (from param)
        .single();       // return object, not array

      if (error) {
        console.error(error);
      } else {
        setCreator(data); // update state with the fetched creators
      }
    };

    fetchCreator();
  }, [id]); // re-run if the id in the URL changes

  return (
    <div className="view-creator">
      <button onClick={() => navigate("/")}>← Back</button>
      {creator ? (
        <>
          <Card creator={creator} />
          <Link to={`/creator/${id}/edit`}>
            <button>Edit Creator</button>
          </Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewCreator;
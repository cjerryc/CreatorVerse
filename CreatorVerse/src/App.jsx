import { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import supabaseClient from "./client";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";
import AddCreator from "./pages/AddCreator";

const App = () => {
  const [creators, setCreators] = useState([]);

  const fetchCreators = async () => {
    const { data, error } = await supabaseClient
      .from("creators")
      .select("*");

    if (error) {
      console.error(error);
    } else {
      setCreators(data);
    }
  };
  useEffect(() => {
    fetchCreators();
  }, []);

  const routes = useRoutes([
    { path: "/",                 element: <ShowCreators creators={creators} /> },
    { path: "/creator/:id",      element: <ViewCreator /> },
    { path: "/creator/:id/edit", element: <EditCreator onSave={fetchCreators} /> },
    { path: "/new",              element: <AddCreator onSave={fetchCreators} /> },
  ]);

  return (
    <div className="container">
      {routes}
    </div>
  );
};

export default App;
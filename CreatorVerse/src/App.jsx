import { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import supabaseClient from "./client";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";
import AddCreator from "./pages/AddCreator";

const App = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
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

    fetchCreators();
  }, []);

  const routes = useRoutes([
    { path: "/",                 element: <ShowCreators creators={creators} /> },
    { path: "/creator/:id",      element: <ViewCreator /> },
    { path: "/creator/:id/edit", element: <EditCreator /> },
    { path: "/new",              element: <AddCreator /> },
  ]);

  return (
    <div className="app">
      {routes}
    </div>
  );
};

export default App;
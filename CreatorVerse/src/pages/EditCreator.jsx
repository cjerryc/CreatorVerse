import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabaseClient from "../client";

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  // fetch the existing creator to pre-fill the form with existing information
  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabaseClient
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setFormData(data); // pre-fill the form with existing values
      }
    };

    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabaseClient
      .from("creators")
      .update(formData)       // send the updated fields (NOT Insert)
      .eq("id", id);          // update the row with this id in Db

    if (error) {
      console.error(error);
    } else {
      navigate(`/creator/${id}`); // go back to this creator's page
    }
  };

  return (
    <div className="edit-creator">
      <h1>Edit Creator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="url"
          placeholder="URL"
          value={formData.url}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imageURL"
          placeholder="Image URL (optional)"
          value={formData.imageURL}
          onChange={handleChange}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCreator;
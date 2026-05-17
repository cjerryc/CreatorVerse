import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabaseClient from "../client";

const EditCreator = ({ onSave }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

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
        setFormData(data);
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
      .update(formData)
      .eq("id", id);

    if (error) {
      console.error(error);
    } else {
      await onSave();  // re-fetch the updated list in App to display changes
      navigate(`/creator/${id}`);
    }
  };

  const handleDelete = async () => {
    const { error } = await supabaseClient
      .from("creators")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
    } else {
      await onSave();   // re-fetch so deleted creator disappears from list
      navigate("/");
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
        <button type="button" onClick={handleDelete}>
          Delete Creator
        </button>
      </form>
    </div>
  );
};

export default EditCreator;
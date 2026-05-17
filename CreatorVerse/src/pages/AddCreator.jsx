import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabaseClient from "../client";

const AddCreator = ({ onSave }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabaseClient
      .from("creators")
      .insert([formData]);

    if (error) {
      console.error(error);
    } else {
      await onSave();
      navigate("/");
    }
  };

  return (
    <div className="add-creator">
      <h1>Add a Creator</h1>
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
        <button type="submit">Add Creator</button>
      </form>
    </div>
  );
};

export default AddCreator;
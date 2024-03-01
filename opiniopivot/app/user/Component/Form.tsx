"use client";
import React, { useState } from "react";

export default function Form() {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/joel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          heading,
          description,
        }),
      });

      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }

      const data = await response.json();
      setMessage(data);
      setHeading("");
      setDescription("");
      setLoading(false);
    } catch (err) {
      console.error(err);
      // Handle other errors here
    }
  };

  return (
    <form
      className="flex flex-col items-center w-full h-full"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={heading}
        className="bg-gray-100 border border-gray-300 p-2 rounded-md w-96 mb-4"
        placeholder="Heading"
        onChange={(e) => setHeading(e.target.value)}
      />
      <textarea
        value={description}
        cols={30}
        rows={10}
        className="bg-gray-100 border border-gray-300 p-2 rounded-md w-96 mb-4"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="submit"
        className="bg-black text-white p-2 font-normal rounded-md"
        value="Submit"
      />
      {loading ? <p>Loading...</p> : <p>{message}</p>}
    </form>
  );
}

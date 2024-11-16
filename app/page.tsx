"use client";

import { useState } from "react";

export default function AppPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Extract the form data
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Send the data to the API endpoint
    const res = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Handle the response
    const result = await res.json();

    setMessage(result.message);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <button type="submit">Submit</button>
      </form>
      <p aria-live="polite">{message}</p>
    </div>
  );
}

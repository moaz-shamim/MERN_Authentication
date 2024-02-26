import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MySpinner } from "../components";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
      body: JSON.stringify(formData), // Convert the data object to JSON
    })
      .then((response) => {
        if (!response.ok) {
          setError(true);
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log("Response data:", data);
        setError(false);
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="email"
          placeholder="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          id="password"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 flex justify-center"
        >
          {loading ? <MySpinner /> : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>"Don't have an account yet?"</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went Wrong!"}</p>
    </div>
  );
};

export default SignIn;

import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { signInSucess } from "../redux/slices/user/userSlice";
import {  useNavigate } from "react-router-dom";


const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      // console.log(result.user);
      // console.log(result.user.displayName);
      // console.log(result.user.email);
      // console.log(result.user.photoURL);

      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }), // Convert the data object to JSON
      })
        .then((response) => {
          return response.json(); // Parse the JSON response
        })
        .then((data) => {
          dispatch(signInSucess(data));
          navigate("/");
        });
    } catch (error) {
      console.log("Could not login with Google", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase
hover:opacity-95"
    >
      Continue with google
    </button>
  );
};

export default OAuth;

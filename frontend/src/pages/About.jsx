import React from "react";
const About = () => {
  return (
    <>
      <div class=" pb-10 flex items-center min-h-screen justify-center bg-white">
        <div class="mx-auto max-w-[43rem]">
          <div class="text-center">
            <h1 class="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">
              About
            </h1>

            <p className="mt-3 text-lg leading-relaxed text-slate-400">
              This is a MERN (MongoDB, Express, React, Node.js) stack
              application with authentication. It allows users to sign up, log
              in, and log out, and provides access to protected routes only for
              authenticated users.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-400">
              The front-end of the application is built with React and uses
              React Router for client-side routing. The back-end is built with
              Node.js and Express, and uses MongoDB as the database.
              Authentication is implemented using JSON Web Tokens (JWT).
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-400">
              This application is intended as a starting point for building
              full-stack web applications with authentication using the MERN
              stack. Feel free to use it as a template for your own projects!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

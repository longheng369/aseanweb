import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { useAuth } from "../page/login/AuthContext";

const Password = () => {
  const navigate = useNavigate()
  const secretKey = "secretKey";
  const [secret, setSecret] = useState("");
  const [err, setErr] = useState(false);
  const password = "admin123";
  const email = "Admin@gmail.com";
  const { currentUser } = useAuth();
  const handleEnter = async (e) => {
    if (secret === secretKey) {
      try {
        const credential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        localStorage.setItem("user", JSON.stringify(credential));
        window.location.reload(true);
        navigate('/dashboard');
      } catch (error) {
        console.log(error);
      }
    } else {
      setErr(true);
    }
  };

  const handleLogout = async () => {
    auth.signOut().then((val) => {
      localStorage.setItem("user", null);
    });
  };

  return (
    <div>
      {currentUser ? (
        <div>
          <button
            className="p-4 bg-blue-500 rounded-lg text-white"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
          <Link to="/dashboard" className="p-4 rounded-lg bg-green-400 ml-4">
            Dashboard
          </Link>
        </div>
      ) : (
        <div className="p-6 ">
          <div className="flex justify-center mb-4">
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              placeholder="Enter secret key"
              onChange={(e) => setSecret(e.target.value)}
            />
            <button
              className="p-3 bg-blue-500 rounded-lg text-white ml-4"
              onClick={handleEnter}
            >
              ENTER
            </button>
          </div>
          {err ? (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Error! Please Check Input Field Again!</span>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Password;

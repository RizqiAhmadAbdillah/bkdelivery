import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setToken, setUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const setInputValue = (e) =>
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  const handleLogin = (e) => {
    // e.preventDefault();
    // axios
    //   .post("http://localhost:3000/login", loginData)
    //   .then((response) => {
    //     const user = response.data;
    //     dispatch(setToken(user.accessToken));
    //     dispatch(setUser(user.user));
    //   })
    //   .catch((error) => {
    //     alert("salah");
    //     console.log(error.message);
    //   });
    navigate("/");
  };
  return (
    <div className="bg-[#FFA559]/[.2] text-gray-950 h-screen flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col p-10 gap-5 bg-white text-gray-950 rounded w-1/3"
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={loginData.email}
            onChange={setInputValue}
            className="p-3 border bg-white text-gray-950 border-gray-950/[.2] rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            alue={loginData.password}
            onChange={setInputValue}
            className="p-3 border bg-white text-gray-950 border-gray-950/[.2] rounded w-full"
          />
        </div>
        <div>
          <input
            type="submit"
            className="bg-[#FF6000] text-white font-bold py-3 w-full rounded uppercase"
          />
        </div>
      </form>
    </div>
  );
}

export default Login;

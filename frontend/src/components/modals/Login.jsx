import React, { useState } from "react";
import { ModalLayout, InputField, Button } from "../../components";
import { useMainContext } from "../../context";
import { IncorrectPasswordNotification, LoginSuccessfulNotification, ServerErrorNotification, UserNotFoundNotification } from "../notifications/notification";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setModal, setUser, setLoader, onClose } = useMainContext();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,({
        email: form.email,
        password: form.password,
      }));
      if(res.status === 200) {
        LoginSuccessfulNotification();
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data.user);
        await onClose();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        IncorrectPasswordNotification();
      } else if (error.response && error.response.status === 404) {
        UserNotFoundNotification();
      } else {
        ServerErrorNotification();
      }
      console.error("Error logging in:", error);
    }finally{
      setLoader(false);
    }
  }

  return (
    <ModalLayout>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Login to continue exploring properties
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            labelName="Email Address"
            name="email"
            value={form.email}
            method={handleChange}
            placeholder="you@example.com"
          />
          <InputField
            labelName="Password"
            type="password"
            name="password"
            value={form.password}
            method={handleChange}
            placeholder="••••••••"
          />
          <div className="flex justify-end text-sm text-orange-500 hover:underline cursor-pointer">
            Forgot Password?
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">
          New to PropertySeller?{" "}
          <button onClick={() => setModal("signup-modal")} className="text-orange-500 font-semibold hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </ModalLayout>
  );
}

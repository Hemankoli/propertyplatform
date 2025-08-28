import React, { useState } from "react";
import { ModalLayout, InputField, Button } from "../../components";
import { useMainContext } from "../../context";
import { AllFieldsRequiredNotification, PasswordsDoNotMatchNotification, PasswordTooShortNotification, RegistrationSuccessfulNotification, ServerErrorNotification, UserAlreadyRegisteredNotification } from "../notifications/notification";
import axios from "axios";

export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const { setModal, setUser, setLoader, onClose, getUser } = useMainContext();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            AllFieldsRequiredNotification();
            setLoader(false);
            return;
        }
        if (form.password !== form.confirmPassword) {
            PasswordsDoNotMatchNotification();
            setLoader(false);
            return;
        }
        if (form.password.length < 6) {
            PasswordTooShortNotification();
            setLoader(false);
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, ({
                name: form.name,
                email: form.email,
                password: form.password,
                confirmPassword: form.confirmPassword
            }));
            if (response.status === 201) {
                RegistrationSuccessfulNotification();
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                setUser(response.data.user);
                await onClose();
                await getUser();
            } else {
                UserAlreadyRegisteredNotification();
                setModal("login-modal");
            }
        } catch (error) {
            ServerErrorNotification();
            console.log(error);
        } finally{
            setLoader(false);
        }
    };

    return (
        <ModalLayout>
            <div className="overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                    Welcome 👋
                </h2>
                <p className="text-gray-500 text-center mb-6">
                    SignUp to continue exploring properties
                </p>
                <form onSubmit={handleSubmit} className="space-y-4 ">
                    <InputField
                        labelName="Name"
                        name="name"
                        value={form.name}
                        method={handleChange}
                        placeholder="John Doe"
                    />
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
                    <InputField
                        labelName="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
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
                        Sign Up
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
                    <button onClick={() => setModal("login-modal")} className="text-orange-500 font-semibold hover:underline">
                        Log In
                    </button>
                </p>
            </div>
        </ModalLayout>
    )
}
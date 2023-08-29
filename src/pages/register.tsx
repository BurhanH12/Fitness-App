import { TRPCClientError } from "@trpc/client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { CreateUserInput } from "~/schema/user";
import { api } from "~/utils/api";

const Register = () => {

  const router = useRouter();
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const [isErrors, setIsErrors] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);


  let updatedErrors = {
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  };

  const registerUser = api.user.createUser.useMutation({
    onSuccess: async (res: any) => {
      console.log(res.user, "Create User Res");
      localStorage.setItem("User", JSON.stringify(res.user));
      alert("Registered");
      await router.push("/information")
    },
    onError: (err: any) => {
      console.error('Registeration Error', err);
      if (err.message == "Must be at least 8 characters in length"){
        console.log("Goog gooo :: goo");
      }
      if (err.message == "One integer"){
        console.log("Show this error ");
      }
      if (err == "TRPCClientError: User already exists.") {
        updatedErrors.emailError = "User already exists";
        setIsErrors(updatedErrors);
      }
    }
  });

  function onSubmit(values: CreateUserInput) {
    if (values.email == "") {
      updatedErrors.emailError = "Email Required";
    }
    if (values.password == "") {
      updatedErrors.passwordError= "Password Required";
    }
    if (values.passwordConfirm == "") {
      updatedErrors.confirmPasswordError="Please Confirm your Password"
    }
    if (values.password != values.passwordConfirm) {
      updatedErrors.confirmPasswordError="Password doesnot match"
    }

    setIsErrors(updatedErrors);
    console.log(values);
    registerUser.mutate(values);
  }

  return (
    <div>
      <section
        className="gradient-form h-full bg-gray-500 bg-blend-multiply"
        style={{
          backgroundImage: 'url("/carousel2.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}
      >
        <div className="container h-full p-10">
          <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-300">
            <div className="w-full max-w-md">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="px-4 py-8 md:px-8">
                  <div className="mb-10 text-center">
                    <img className="mx-auto w-48" src="./logo.png" alt="logo" />
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="mb-4">Create an account</p>

                    {/* Email input */}
                    <div className="relative mb-4 transition-all duration-200">
                      <label className="group relative">
                        <input
                          type="email"
                          className="h-[2.5rem] w-full rounded border border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[1.6] placeholder-gray-300 placeholder-opacity-0 outline-none transition-all duration-200 focus:border-blue-500"
                          placeholder=""
                          {...register("email")}
                        />
                        <span className="input-text absolute left-[0.7rem] top-[-0.10rem] bg-white text-base text-neutral-500 transition duration-200 group-focus:bg-white group-focus:text-blue-500">
                          Email address
                        </span>
                      </label>
                      {isErrors.emailError && (
                        <p className="text-red-500">{isErrors.emailError}</p>
                      )}
                    </div>

                    {/* Password input */}
                    <div className="relative mb-4 transition-all duration-200">
                      <label className="relative ">
                        <input
                          type="password"
                          className="h-[2.5rem] w-full rounded border border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[1.6] placeholder-gray-300 placeholder-opacity-0 outline-none transition-all duration-200 focus:border-blue-500"
                          placeholder=""
                          {...register("password")}
                          onFocus={() => setIsPasswordFocused(true)}
                          onBlur={() => setIsPasswordFocused(false)}
                        />
                        <span className="input-text2 absolute left-[0.7rem] top-[-0.10rem] bg-white text-base text-neutral-500 transition duration-200">
                          Password
                        </span>
                      </label>
                      <div
                        className={`${
                          isPasswordFocused
                            ? "h-auto opacity-100"
                            : "h-0 opacity-0"
                        } mt-2 overflow-hidden text-xs text-neutral-400 transition-all duration-200`}
                      >
                        Password must be 8-16 characters long and contain one
                        uppercase, one lowercase character, and one integer.
                      </div>

                      {isErrors.passwordError && (
                        <p className="text-red-500">{isErrors.passwordError}</p>
                      )}
                    </div>

                    {/* Confirm Password input */}
                    <div className="relative mb-4 transition-all duration-200">
                      <label className="relative ">
                        <input
                          type="password"
                          className="h-[2.5rem] w-full rounded border border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[1.6] placeholder-gray-300 placeholder-opacity-0 outline-none transition-all duration-200 focus:border-blue-500"
                          placeholder=""
                          {...register("passwordConfirm")}
                        />
                        <span className="input-text2 absolute left-[0.7rem] top-[-0.10rem] bg-white text-base text-neutral-500 transition duration-200">
                          Confirm Password
                        </span>
                      </label>
                      {isErrors.confirmPasswordError && (
                        <p className="text-red-500">
                          {isErrors.confirmPasswordError}
                        </p>
                      )}
                    </div>

                    {/* Submit button */}
                    <div className="mb-0 pb-1 pt-1 text-center">
                      <button
                        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                        type="submit"
                        style={{
                          background:
                            "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                        }}
                      >
                        Register
                      </button>
                    </div>
                  </form>
                  {/* Social Sign In */}
                  <h2 className="mb-3 flex items-center justify-center">OR</h2>
                  <div className="mb-4 flex items-center justify-center">
                    <button
                      onClick={() => void signIn("google")}
                      className="flex h-[40px] w-[300px] items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-gray-800 shadow-md hover:bg-gray-200  "
                    >
                      <svg
                        className="mr-2 h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="800px"
                        height="800px"
                        viewBox="-0.5 0 48 48"
                        version="1.1"
                      >
                        {" "}
                        <title>Google-color</title>{" "}
                        <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                        <g
                          id="Icons"
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          {" "}
                          <g
                            id="Color-"
                            transform="translate(-401.000000, -860.000000)"
                          >
                            {" "}
                            <g
                              id="Google"
                              transform="translate(401.000000, 860.000000)"
                            >
                              {" "}
                              <path
                                d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                id="Fill-1"
                                fill="#FBBC05"
                              >
                                {" "}
                              </path>{" "}
                              <path
                                d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                id="Fill-2"
                                fill="#EB4335"
                              >
                                {" "}
                              </path>{" "}
                              <path
                                d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                id="Fill-3"
                                fill="#34A853"
                              >
                                {" "}
                              </path>{" "}
                              <path
                                d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                id="Fill-4"
                                fill="#4285F4"
                              >
                                {" "}
                              </path>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>{" "}
                      </svg>
                      <span>Sign up with Google</span>
                    </button>
                  </div>

                  {/* Discord Login Button */}
                  <div className="mb-8 flex items-center justify-center">
                    <button
                      onClick={() => void signIn("discord")}
                      className="flex h-[40px] w-[300px] items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-gray-800 shadow-md hover:bg-gray-200  "
                    >
                      <svg
                        className="mr-2 h-6 w-6"
                        width="800px"
                        height="800px"
                        style={{
                          fill: "rgb(114, 137, 218)",
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M464,66.52A50,50,0,0,0,414.12,17L97.64,16A49.65,49.65,0,0,0,48,65.52V392c0,27.3,22.28,48,49.64,48H368l-13-44L464,496ZM324.65,329.81s-8.72-10.39-16-19.32C340.39,301.55,352.5,282,352.5,282a139,139,0,0,1-27.85,14.25,173.31,173.31,0,0,1-35.11,10.39,170.05,170.05,0,0,1-62.72-.24A184.45,184.45,0,0,1,191.23,296a141.46,141.46,0,0,1-17.68-8.21c-.73-.48-1.45-.72-2.18-1.21-.49-.24-.73-.48-1-.48-4.36-2.42-6.78-4.11-6.78-4.11s11.62,19.09,42.38,28.26c-7.27,9.18-16.23,19.81-16.23,19.81-53.51-1.69-73.85-36.47-73.85-36.47,0-77.06,34.87-139.62,34.87-139.62,34.87-25.85,67.8-25.12,67.8-25.12l2.42,2.9c-43.59,12.32-63.44,31.4-63.44,31.4s5.32-2.9,14.28-6.77c25.91-11.35,46.5-14.25,55-15.21a24,24,0,0,1,4.12-.49,205.62,205.62,0,0,1,48.91-.48,201.62,201.62,0,0,1,72.89,22.95S333.61,145,292.44,132.7l3.39-3.86S329,128.11,363.64,154c0,0,34.87,62.56,34.87,139.62C398.51,293.34,378.16,328.12,324.65,329.81Z"
                          fill="#7289da"
                        ></path>
                        <path
                          d="M212.05,218c-13.8,0-24.7,11.84-24.7,26.57s11.14,26.57,24.7,26.57c13.8,0,24.7-11.83,24.7-26.57C237,229.81,225.85,218,212.05,218Z"
                          fill="#7289da"
                        ></path>
                        <path
                          d="M300.43,218c-13.8,0-24.7,11.84-24.7,26.57s11.14,26.57,24.7,26.57c13.81,0,24.7-11.83,24.7-26.57S314,218,300.43,218Z"
                          fill="#7289da"
                        ></path>
                      </svg>
                      <span>Sign up with Discord</span>
                    </button>
                  </div>

                  {/* <!--Register button--> */}
                  <div className="pb flex items-center justify-between">
                    <p className="mb-0 mr-2">Already have an account?</p>
                    <Link href={"/signin"}>
                      <button
                        type="button"
                        className="border-danger text-danger hover:border-danger-600 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 active:border-danger-700 active:text-danger-700 inline-block rounded border-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 focus:outline-none focus:ring-0 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                      >
                        Login
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;

import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import { api } from '~/utils/api';
import { LoginUserInput, UpdateFitnessInput } from '~/schema/user';
import { useForm } from "react-hook-form"


const Test = () => {
  const router = useRouter();

  const { handleSubmit, register } = useForm<UpdateFitnessInput>();
  const [name, setName] =useState<string | null | undefined>("");
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState<string | null>("")


  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };


  const updateUser = api.user.updateFitness.useMutation({
    onSuccess(res: any) {
      console.log("Login Res",res);
      localStorage.setItem("Fitness", JSON.stringify(res.user));
      alert("Info updated");
      // router.push("/")
    },
    onError: (error: any) => {
      console.log("Information update error",error);
    }
  })

  function onSubmit(values: UpdateFitnessInput) {
    // Convert string values to numbers
    values.age = parseInt(values.age, 10);
    values.height = parseFloat(values.height);
    values.weight = parseFloat(values.weight);
  
    values.email = email;
  
    console.log(values);
    updateUser.mutate(values);
  }
  
  useEffect(() => {
    const userString: string | null = localStorage.getItem("User");
    const userObject = JSON.parse(userString);
    const email = userObject.email;
    setEmail(email);
    console.log("This is my email", email);
  }, []);
  


  // const [isErrors, setIsErrors] = useState({
  //   emailError: "",
  //   passwordError: "",
  // });

  
  // let updatedErrors = {
  //   emailError: "",
  //   passwordError: "",
  // };
  


  // const loginUser = api.user.authenticateUser.useMutation({

  //   onSuccess: (res: any) => {
  //     console.log(res.user, "Login Res");
  //     localStorage.setItem("User", JSON.stringify(res.user));
  //     router.push("/")
  //   },
  //   onError: (err: any) => {
  //     console.log('login error', err);

  //   }
  // });

  // function onSubmit(values: LoginUserInput) {

  //   if(values.email == "") {
  //     updatedErrors.emailError = "Email Required";
  //   }
  //   if(values.password == "") {
  //     updatedErrors.passwordError = "Password Required";
  //   }

  //   setIsErrors(updatedErrors);
  //   console.log(values)
  //   loginUser.mutate(values);
    
  // }

  // const AuthUser = api.user.authenticateUser.useQuery({
  //   email: "burhan.qsols@gmail.com",
  //   password: "test",
  // });
  // const userName = AuthUser?.data?.name
  // console.log(userName);


  // const handeleVerify = async () => {
  //   try {
  //     const AuthUser = api.user.authenticateUser.useQuery({
  //       email: email,
  //       password: password,
  //     });

  //     const userName2 = AuthUser?.data?.name;
  //     console.log(userName2);

  //     if (AuthUser) {
  //       router.push("/");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };


  return (
    <div>
      <section className="gradient-form h-full bg-gray-500 bg-blend-multiply">
        <div
          className="container h-full p-10"
          style={{
            backgroundImage: 'url("/carousel3.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-300">
            <div className="w-full max-w-md">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="px-4 py-8 md:px-8">
                  <div className="mb-10 text-center">
                    <img className="mx-auto w-48" src="./logo.png" alt="logo" />
                  </div>
                  {currentStep === 1 && (
                    <form>
                      <p className="mb-4">Provide Additional Information</p>

                      {/* Age input */}
                      <div className="mb-4">
                        <label className="text-md mb-1 block font-medium text-neutral-500">
                          Age
                        </label>
                        <input
                          className="h-[2.5rem] w-full rounded border border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[1.6] placeholder-gray-300 outline-none focus:border-blue-500"
                          type="number"
                          placeholder="Age"
                          {...register("age")}
                        />
                      </div>

                      {/* Height input */}
                      <div className="mb-4">
                        <label className="text-md mb-1 block font-medium text-neutral-500">
                          Height
                        </label>
                        <input
                          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                          type="number"
                          placeholder="Height (cm)"
                          {...register("height")}
                        />
                      </div>

                      {/* Gender input */}
                      <div className="mb-4">
                        <label className="text-md mb-1 block font-medium text-neutral-500">
                          Gender
                        </label>
                        <select
                          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                          {...register("gender")}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select Gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Weight input */}
                      <div className="mb-4">
                        <label className="text-md mb-1 block font-medium text-neutral-500">
                          Weight
                        </label>
                        <input
                          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                          type="number"
                          placeholder="Weight"
                          {...register("weight")}
                        />
                      </div>
                      
                      {/* Submit button */}
                      <div className="mb-0 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          onClick={handleNextStep}
                          style={{
                            background:
                              "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </form>
                  )}

                  {currentStep === 2 && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <p className="mb-4">Provide Additional Information</p>

                      {/* Workout Time input */}
                      <div className="mb-4">
                        <label className="text-md mb-1 block font-medium text-neutral-500">
                          Workout Time
                        </label>
                        <select
                          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                          {...register("workoutTime")}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select Workout Time
                          </option>
                          <option value="10 minutes">10 minutes</option>
                          <option value="20 minutes">20 minutes</option>
                          <option value="30 minutes">30 minutes</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>

                      {/* Fitness Goals input */}
                      <div className="mb-4">
                        <label className="text-md mb-1 block font-medium text-neutral-500">
                          Fitness Goals
                        </label>
                        <select
                          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                          {...register("fitnessGoals")}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select Fitness Goals
                          </option>
                          <option value="weight loss">Weight Loss</option>
                          <option value="muscle gain">Muscle Gain</option>
                          <option value="improve fitness">
                            Improve Fitness
                          </option>
                          {/* Add more options as needed */}
                        </select>
                      </div>

                      {/* Exercise Level input */}
                      <div className="mb-4">
                        <label className="text-md mb-1 block font-medium text-neutral-500">
                          Exercise Level
                        </label>
                        <div className="space-y-2 flex flex-col">
                          <label className="inline-block">
                            <input
                              type="radio"
                              value="beginner"
                              className='mr-2 ml-2'
                              {...register("exerciseLevel")}
                            />
                            Beginner
                          </label>
                          <label className="inline-block">
                            <input
                              type="radio"
                              value="intermediate"
                              className='mr-2 ml-2'
                              {...register("exerciseLevel")}
                            />
                            Intermediate
                          </label>
                          <label className="inline-block">
                            <input
                              type="radio"
                              value="advanced"
                              className='mr-2 ml-2'
                              {...register("exerciseLevel")}
                            />
                            Advanced
                          </label>
                        </div>
                      </div>

                      {/* Previous and Submit buttons */}
                      <div className="mb-0 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          onClick={() => setCurrentStep(currentStep - 1)}
                          style={{
                            background:
                              "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                          }}
                        >
                          Previous
                        </button>
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="submit"
                          style={{
                            background:
                              "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Test


function AuthShowcase() {
    const { data: sessionData } = useSession();
  
    const { data: secretMessage } = api.example.getSecretMessage.useQuery(
      undefined, // no input
      { enabled: sessionData?.user !== undefined }
    );
  
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl text-black">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
          {secretMessage && <span> - {secretMessage}</span>}
        </p>
        <button
          className="rounded-full bg-blue-200 px-10 py-3 font-semibold text-black no-underline transition hover:bg-blue-300"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    );
  }
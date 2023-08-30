import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { UpdateFitnessInput } from '~/schema/user';
import { useForm } from "react-hook-form"

const Information = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<UpdateFitnessInput>();
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
      router.push("/")
    },
    onError: (error: any) => {
      console.log("Information update error",error);
    }
  });

  function onSubmit(values: UpdateFitnessInput) {
    // Convert string values to numbers
    values.age = parseInt(values.age, 10);
    values.height = parseFloat(values.height);
    values.weight = parseFloat(values.weight);
    if (email) {
      values.email = email;
    }
    console.log(values);
    updateUser.mutate(values);
  }

  //FOR ME: Check if the User is inside the localStorage

  useEffect(() => {
    const userString:any = localStorage.getItem("User");
    const userObject = JSON.parse(userString);
    const email = userObject.email;
    setEmail(email);
    console.log("This is my email", email);
  }, []);


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
                      <p className="mb-4 text-center text-2xl text-[#4b4a4a]">Basic Information</p>

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
                      <p className="mb-4 text-center text-2xl text-[#4b4a4a]">Fitness Information</p>

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

export default Information
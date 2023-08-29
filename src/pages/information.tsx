import React from 'react'

const Information = () => {

    const handleAdditionalInfoSubmit = () => {
        
    }

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

                  <form onSubmit={handleAdditionalInfoSubmit}>
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
                        // {...register("age")}
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
                        placeholder="Height"
                        // {...register("height")}
                      />
                    </div>

                    {/* Gender input */}
                    <div className="mb-4">
                      <label className="text-md mb-1 block font-medium text-neutral-500">
                        Gender
                      </label>
                      <select
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        // {...register("gender")}
                      >
                        <option value="" disabled selected>
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
                        // {...register("weight")}
                      />
                    </div>

                    {/* ... add more input fields for weight, workout time, fitness goals, exercise level ... */}

                    {/* Submit button */}
                    <div className="mb-0 pb-1 pt-1 text-center">
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
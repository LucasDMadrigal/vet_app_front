import React from "react";
import { useSelector } from "react-redux";
import AuthLayout from "../layout/AuthLayout";
import NewServiceForm from "../components/NewServiceForm";
import EditServicePrice from "../components/EditServicePrice";
import NewVeterinarian from "../components/NewVeterinarian";
import DeleteVeterinarian from "../components/DeleteVaterinarian";

const AdminPanel = () => {

  return (
    <>
      <AuthLayout>
        <main className="flex flex-wrap justify-center items-start gap-2 px-40 mb-4">
          <h1 className="text-5xl text-white font bold w-full text-center bg-[#8BA8C4] py-4 rounded mt-10">
            Admin Panel
          </h1>
          
          <div className="grid grid-rows-2 divide-y-2 divide-solid divide-[#8BA8C4] w-full">
            <section className="py-3 mt-4">
              <h2>Veterinary</h2>
              <button
                className="inline-flex justify-center items-center min-w-40 px-4 mr-4 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Veterinary
              </button>
              <button
                className="inline-flex justify-center items-center min-w-40 px-4 mr-4 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Veterinary
              </button>
            </section>
            <section className="py-3 mt-4">
              <h2>Services</h2>
              <button
                className="inline-flex justify-center items-center min-w-40 px-4 mr-4 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Service
              </button>
              <button
                className="inline-flex justify-center items-center min-w-40 px-4 mr-4 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Service
              </button>
            </section>
          </div>
          <div className="">
            <NewVeterinarian />
            <NewServiceForm />
            <EditServicePrice />
            <DeleteVeterinarian />
          </div>
        </main>
      </AuthLayout>
    </>
  );
};

export default AdminPanel;

import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FormGroup, Label, Input, FormText } from "reactstrap";

const NewVeterinarian = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [newVeterinarian, setNewVeterinarian] = useState({
    name: "",
    specialty: "",
    address: "",
    phone: "",
    email: "",
    image: "",
  });
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api-veterinary/veterinarian/new",
        newVeterinarian,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Veterinario creado con éxito:", response.data);
      Swal.fire({
        title: "Success",
        text: "Veterinario creado con exito",
        icon: "success",
        confirmButtonText: "Ok",
      })
        .then(() => {
          setNewVeterinarian({
            name: "",
            specialty: "",
            address: "",
            phone: "",
            email: "",
            image: "",
          })
        })
    } catch (error) {
      console.error("Error al crear veterinario:", error);
      Swal.fire({
        title: "Error",
        text: "Error al crear veterinario",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const HandleChange = (e) => {
    setNewVeterinarian({
      ...newVeterinarian,
      [e.target.name]: e.target.value,
    });
  };
  const uploadImage = async (event) => {
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Veterinary");
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmioftmku/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    setImage(file.secure_url);
    setNewVeterinarian({
      ...newVeterinarian,
      image: file.secure_url,
    });
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 p-4 border border-gray-300 rounded-lg shadow-md w-full mb-14"
    >
      <h3 className="text-lg font-bold mb-4">Create a new Veterinarian</h3>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={newVeterinarian.name}
          onChange={HandleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="specialty"
          className="block text-sm font-medium text-gray-700"
        >
          Especialidad:
        </label>
        <input
          type="text"
          id="specialty"
          name="specialty"
          value={newVeterinarian.specialty}
          onChange={HandleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Dirección:
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={newVeterinarian.address}
          onChange={HandleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Teléfono:
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={newVeterinarian.phone}
          onChange={HandleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={newVeterinarian.email}
          onChange={HandleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input
          id="exampleFile"
          name="image"
          type="file"
          onChange={uploadImage}
        />
        {loading ? (
          <h3>Uploading Image...</h3>
        ) : (
          <img src={newVeterinarian.image} style={{ width: "300px" }} />
        )}
        <FormText>Only *.jpeg and *.png images will be accepted</FormText>
      </FormGroup>
      <div className="flex justify-end">
        <button
          style={{ border: "1px solid black" }}
          type="submit"
          className="inline-flex items-center px-4 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Veterinarian
        </button>
      </div>
    </form>
  );
};

export default NewVeterinarian;

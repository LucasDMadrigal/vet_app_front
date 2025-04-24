import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FormGroup, Label, Input, FormText } from "reactstrap";

const EditVeterinarian = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [veterinarians, setVeterinarians] = useState([]);
  const [selectedVeterinarianId, setSelectedVeterinarianId] = useState("");
  const [selectedVeterinarian, setSelectedVeterinarian] = useState({
    id: "",
    firstName: "",
    lastName: "",
    specialty: "",
    address: "",
    phone: "",
    email: "",
    image: "",
    active: false,
  });
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchVeterinarians = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api-veterinary/veterinarian/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setVeterinarians(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de veterinarios:", error);
      }
    };

    fetchVeterinarians();
  }, [token]);

  const handleSelectedVeterinarianChange = (e) => {
    setSelectedVeterinarianId(e.target.value);
  };

  useEffect(() => {
    const veterinarian = veterinarians.filter(
      (v) => v.id == selectedVeterinarianId
    )[0];
    if (veterinarian) {
      console.log("🚀 ~ useEffect ~ veterinarian:", veterinarian);
      setSelectedVeterinarian(veterinarian);
    }
    console.log("🚀 ~ EditVeterinarian ~ veterinarians:", veterinarians);
  }, [selectedVeterinarianId, veterinarians]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:8080/api-veterinary/veterinarian/update",
        selectedVeterinarian,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        "🚀 ~ handleSubmit ~ veterinarianData:",
        selectedVeterinarian
      );
      console.log("🚀 ~ handleSubmit ~ token:", token);

      console.log("Veterinario creado con éxito:", response.data);
      Swal.fire({
        title: "Success",
        text: "Veterinario creado con exito",
        icon: "success",
        confirmButtonText: "Ok",
      });
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
    setLoading(false);
  };

  const handleChange = (e) => {
    setSelectedVeterinarian({
      ...selectedVeterinarian,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 p-4 border border-gray-300 rounded-lg shadow-md w-full mb-14"
    >
      <h3 className="text-lg font-bold mb-4">Edit Veterinarian</h3>

      <div>
        <label
          htmlFor="veterinarian"
          className="block text-sm font-medium text-gray-700"
        >
          Select a veterinarian:
        </label>
        <select
          id="veterinarian"
          name="veterinarian"
          value={selectedVeterinarianId}
          onChange={handleSelectedVeterinarianChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option selected disabled value="">
            Select a veterinarian
          </option>
          {veterinarians.map((vet) => (
            <option key={vet.id} value={vet.id}>
              {vet.firstName} {vet.lastName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre:
        </label>
        <input
          disabled={selectedVeterinarian.id === "" ? true : false}
          type="text"
          id="firstName"
          name="firstName"
          value={selectedVeterinarian.firstName}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Apellido:
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          disabled={selectedVeterinarian.id === "" ? true : false}
          value={selectedVeterinarian.lastName}
          onChange={handleChange}
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
          disabled={selectedVeterinarian.id === "" ? true : false}
          value={selectedVeterinarian.specialty}
          onChange={handleChange}
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
          disabled={selectedVeterinarian.id === "" ? true : false}
          value={selectedVeterinarian.address}
          onChange={handleChange}
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
          disabled={selectedVeterinarian.id === "" ? true : false}
          value={selectedVeterinarian.phone}
          onChange={handleChange}
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
          disabled={selectedVeterinarian.id === "" ? true : false}
          value={selectedVeterinarian.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input
          id="exampleFile"
          name="file"
          type="file"
          onChange={uploadImage}
        />
        {loading ? (
          <h3>Uploading Image...</h3>
        ) : (
          <img src={selectedVeterinarian.image} style={{ width: "300px" }} />
        )}
        <FormText>Only *.jpeg and *.png images will be accepted</FormText>
      </FormGroup>
      <input
        type="radio"
        disabled={selectedVeterinarian.id === "" ? true : false}
        value={selectedVeterinarian.active}
        checked={selectedVeterinarian.active}
        onClick={handleChange}
        name="active"
        id="active"
      />
      <label htmlFor="active">Activo</label>
      <div className="flex justify-end">
        <button
          style={{ border: "1px solid black" }}
          type="submit"
          className="inline-flex items-center px-4 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit Veterinarian
        </button>
      </div>
    </form>
  );
};

export default EditVeterinarian;

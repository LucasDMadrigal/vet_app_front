import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FormGroup, Label, Input, FormText } from "reactstrap";
  
  const EditVeterinarian = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [active, setActive] = useState(true);
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [veterinarians, setVeterinarians] = useState([]);
    const [selectedVeterinarianId, setSelectedVeterinarianId] = useState('');
    
    const token = useSelector((state) => state.auth.token);
    
      useEffect(() => {
          const fetchVeterinarians = async () => {
    
          try {
    
            const response = await axios.get('http://localhost:8080/api-veterinary/veterinarian/', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
    
            setVeterinarians(response.data);
    
          } catch (error) {
            console.error('Error al obtener la lista de veterinarios:', error);
          }
        };
    
        fetchVeterinarians();
      }, [token]);

      const handleChange = (e) => {
        setSelectedVeterinarianId(e.target.value);
        console.log("🚀 ~ handleChange ~ e.target.value:", e.target.value)
        
      };

      useEffect(() => {
        
        const veterinarian = veterinarians.filter((v) => v.id == selectedVeterinarianId)[0];
        if (veterinarian) {
          console.log("🚀 ~ useEffect ~ veterinarian:", veterinarian)
          setName(veterinarian.name);
          setSpecialty(veterinarian.specialty);
          setAddress(veterinarian.address);
          setPhone(veterinarian.phone);
          setEmail(veterinarian.email);
          setImage(veterinarian.image);
          setActive(veterinarian.active);
          setId(veterinarian.id);
        }
        console.log("🚀 ~ EditVeterinarian ~ veterinarians:", veterinarians)

      }, [selectedVeterinarianId, veterinarians]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const veterinarianData = {
      id,
      name,
      specialty,
      address,
      phone,
      email,
      image,
      active
    };

    try {
      console.log(veterinarianData);
      const response = await axios.put(
        "http://localhost:8080/api-veterinary/veterinarian/update",
        veterinarianData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ handleSubmit ~ veterinarianData:", veterinarianData)
      console.log("🚀 ~ handleSubmit ~ token:", token)

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

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 p-4 border border-gray-300 rounded-lg shadow-md w-full mb-14"
    >
      <h3 className="text-lg font-bold mb-4">Edit Veterinarian</h3>

      <div>
         <label htmlFor="veterinarian" className="block text-sm font-medium text-gray-700">Select a veterinarian:</label>
         <select
           id="veterinarian"
           value={selectedVeterinarianId}
           onChange={handleChange}
           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
         >
           <option selected disabled value="">Select a veterinarian</option>
           {veterinarians.map(vet => (
             <option key={vet.id} value={vet.id}>
               {vet.name}
             </option>
           ))}
         </select>
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
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          <img src={image} style={{ width: "300px" }} />
        )}
        <FormText>Only *.jpeg and *.png images will be accepted</FormText>
      </FormGroup>
      <input type="radio" value={active} checked={active} onClick={() => setActive(!active)} name="active" id="active"/>
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
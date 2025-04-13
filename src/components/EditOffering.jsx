import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FormGroup, FormText, Input, Label } from "reactstrap";

const EditOffering = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  // const token = useSelector((store) => store.auth.token);

  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [price, setPrice] = useState("");
  const [active, setActive] = useState();
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  const formData = {
    name,
    description,
    price,
    image,
  };


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api-veterinary/offerings/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(response.data);
        setServices(response.data);

        
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [token]);

  const handleServiceChange = (e) => {
    const selectedId = e.target.value;
    setSelectedServiceId(selectedId);
    const selectedService = services.find(
      (service) => service.id === parseInt(selectedId)
    );
    console.log("🚀 ~ handleServiceChange ~ selectedService:", selectedService)
    // setPrice(selectedService.price);
    setName(selectedService.name);
    setDescription(selectedService.description);
    setImage(selectedService.image);
    setPrice(selectedService.price);
    setActive(selectedService.active);
  };

  const handlePriceChange = (e) => {
    e.preventDefault();
    setPrice(parseFloat(e.target.value));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      // const response = await axios.post(
      //   "http://localhost:8080/api-veterinary/offerings/create",
      //   formData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      // console.log(response.data);
      // setNewService(response.data);
      Swal.fire({
        title: "Success",
        text: "Service updated successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to create service",
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
      <h3 className="text-lg font-bold mb-4">Create a new Service</h3>
      <div>
        <label
          htmlFor="service"
          className="block text-sm font-medium text-gray-700"
        >
          Select Service:
        </label>
        <select
          id="service"
          value={selectedServiceId}
          onChange={handleServiceChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
            <option value="" disabled selected>
              Select a service
            </option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter service description"
          rows="3"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price:
        </label>
        <input
        disabled={selectedServiceId ? true : false}
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handlePriceChange}
          placeholder="Enter service price"
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
      <input
      disabled={selectedServiceId ? true : false} type="radio" value={active} checked={active} onClick={() => setActive(!active)} name="active" id="active"/>
      <label htmlFor="active">Activo</label>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Service
        </button>
      </div>
    </form>
  );
};

export default EditOffering;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FormGroup, FormText, Input, Label } from "reactstrap";
import TimeSlots from "./TimeSlots";

const EditOffering = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  // const token = useSelector((store) => store.auth.token);

  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [price, setPrice] = useState("");
  const [active, setActive] = useState();
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  const formData = {
    id: selectedServiceId,
    name,
    description,
    price,
    image,
    active,
    timeSlots,
  };
  
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

      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();

    return () => {
      setSelectedServiceId("");
    };
  }, []);

  const handleServiceChange = (e) => {
    const selectedId = e.target.value;
    setSelectedServiceId(e.target.value);
    const service = services.find(
      (service) => service.id === parseInt(selectedId)
    );
    setSelectedService(service);
    setName(service.name);
    setDescription(service.description);
    setImage(service.image);
    setPrice(service.price);
    setActive(service.active);
    setTimeSlots(service.timeSlots);
  };

  const handlePriceChange = (e) => {
    e.preventDefault();
    setPrice(parseFloat(e.target.value));
  };
  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:8080/api-veterinary/offerings/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Success",
        text: `${response.data ? response.data : "Service updated successfully"}`,
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        // window.location.reload();
        fetchServices();
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `${error.response.data ? error.response.data : "Failed to update service"}`,
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
          disabled={selectedServiceId == "" ? true : false}
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
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name:
        </label>
        <input
          disabled={selectedServiceId == "" ? true : false}
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleNameChange}
          placeholder="Enter service name"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price:
        </label>
        <input
          disabled={selectedServiceId == "" ? true : false}
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
          disabled={selectedServiceId == "" ? true : false}
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
        disabled={selectedServiceId == "" ? true : false}
        type="radio"
        value={active}
        checked={active}
        onClick={() => setActive(!active)}
        name="active"
        id="active"
      />
      <label htmlFor="active">Activo</label>
      <TimeSlots disabledSlots={selectedServiceId == "" ? true : false} setSelectedTimeSlots={setTimeSlots} timeSlots={timeSlots} />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
};

export default EditOffering;

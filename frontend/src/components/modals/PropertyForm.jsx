import React, { useEffect, useState } from "react";
import { ModalLayout, InputField, Button, ImageUploader, UploadImage } from "../../components";
import { useMainContext } from "../../context";
import { createProperty, editProperty } from "../../services/apis";
import { AllFieldsRequiredNotification, PropertyCreatedSuccessfullyNotification, PropertyUpdatedSuccessfullyNotification, SomethingWentWrongNotification } from "../notifications/notification";

export default function PropertyForm() {
    const [data, setData] = useState({
        title: "",
        description: "",
        price: "",
        location: { coordinates: [], address: "" },
        images: [],
    });

    const { properties, selectedIds, setModal, setLoader, fetchProperties } = useMainContext();
    const [imagePreview, setImagePreview] = useState([]);

    // Prefill form if editing
    useEffect(() => {
        const property = properties.find((prop) => prop._id === selectedIds);
        if (property) {
            setData({
                title: property.title,
                description: property.description,
                price: property.price,
                location: property.location,
                images: property.images,
            });
            setImagePreview(property.images || []);
        }
    }, [properties, selectedIds]);

    const handleChange = async (e) => {
        const { name, value } = e.target;

        if (name === "location") {
            setData((prev) => ({ ...prev, location: { ...prev.location, address: value } }));
            if (value.length > 5) { 
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                        value
                        )}`
                    );
                    const json = await res.json();
                    if (json.length > 0) {
                        const { lat, lon } = json[0];
                        setData((prev) => ({
                            ...prev,
                            location: {
                                ...prev.location,
                                coordinates: [parseFloat(lon), parseFloat(lat)],
                            },
                        }));
                    }
                } catch (error) {
                    console.error("Failed to fetch coordinates", error);
                }
            }
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setImagePreview((prev) => [...prev, file]);
    };

    const handleRemoveImage = (index) => {
        setImagePreview((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        if (!data.title || !data.description || !data.price || !data.location.address) {
            AllFieldsRequiredNotification();
            setLoader(false);
            return;
        }

        try {
            const uploadedImages = await Promise.all(
                imagePreview.map((file) => {
                    if (typeof file === "string") return file;
                    return UploadImage(file);
                })
            );

            const payload = {
                title: data.title,
                description: data.description,
                price: Number(data.price),
                location: data.location,
                images: uploadedImages.map((img) => img.secure_url || img.url || img),
            };

            if (selectedIds) {
                await editProperty(selectedIds, payload);
                PropertyUpdatedSuccessfullyNotification();
            } else {
                await createProperty(payload);
                PropertyCreatedSuccessfullyNotification();
            }
            await fetchProperties();
            setModal(false);
        } catch (error) {
            console.error(error);
            SomethingWentWrongNotification();
        } finally {
            setLoader(false);
        }
    };

    return (
        <ModalLayout>
            <div className="space-y-4">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
                    {selectedIds ? "Edit Property" : "Create Property"}
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        labelName="Title"
                        name="title"
                        value={data.title}
                        method={handleChange}
                        placeholder="Enter Property Title"
                    />
                    <ImageUploader
                        imagePreview={imagePreview}
                        onImageChange={handleImageChange}
                        onRemoveImage={handleRemoveImage}
                    />
                    <InputField
                        labelName="Description"
                        name="description"
                        value={data.description}
                        method={handleChange}
                        placeholder="Enter Property Description"
                    />
                    <InputField
                        labelName="Price"
                        name="price"
                        value={data.price}
                        method={handleChange}
                        placeholder="Enter Property Price"
                        type="number"
                    />
                    <InputField
                        labelName="Location"
                        name="location"
                        value={data.location.address}
                        method={handleChange}
                        placeholder="Enter Property Location"
                    />

                    <Button
                        type="submit"
                        className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
                    >
                        {selectedIds ? "Update Property" : "Create Property"}
                    </Button>
                </form>
            </div>
        </ModalLayout>
    );
}

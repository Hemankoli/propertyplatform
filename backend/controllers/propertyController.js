const PropertSchema = require("../models/PropertyModel");

exports.createProperty = async (req, res) => {
    const { title, description, price, location, images } = req.body;
    try {
        const newData = new PropertSchema({title, description, price, location, images});
        const saveData = await newData.save();
        return res.status(200).json({message: "Property Created Successfully!", data: saveData});
    } catch (error) {
        return res.status(400).json({message: "Failed To Craete Property!"})
    }
}

exports.editProperty = async (req, res) => {
    const { propertyId } = req.params;
    const { title, description, price, location, images } = req.body;
    try {
        const updateData = {};

        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (price) updateData.price = price;
        if (images) updateData.images = images;
        if (location && location.coordinates) {
            updateData.location = {
                type: "Point",
                coordinates: location.coordinates,
                address: location.address || "",
            };
        }
        const editData = await PropertSchema.findByIdAndUpdate(propertyId, {$set: updateData}, { new: true });
        if (!editData) return res.status(404).json({ message: "Property not found" });
        return res.status(200).json({message: "Property Update Successfully!", data: editData});
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Failed To Update Property!"})
    }
}

exports.deleteProperty = async (req, res) => {
    const { propertyId } = req.params;
    try {
        const deleteData = await PropertSchema.findByIdAndDelete(propertyId);
        if (!deleteData) return res.status(404).json({ message: "Property not found" });
        return res.status(200).json({message: "Property Deleted Successfully!", data: deleteData});
    } catch (error) {
        return res.status(400).json({message: "Failed To Deleted Property!"})
    }
}

exports.getAllProperties = async (req, res) => {
    try {
        const properties = await PropertSchema.find();
        return res.status(200).json(properties) 
    } catch (error) {
        return res.status(400).json({message: "Failed To Get Property!"})
    }
}
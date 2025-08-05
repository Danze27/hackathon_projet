const Document = require("../model/Document");
const Category = require("../model/Category");

exports.index = async (req, res) => {
    try {
        const documents = await Document.find().populate('category');
        const categories = await Category.find();
        res.render("pages/bibli", { title: "bibliothéque", documents, categories });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}

exports.destroy = async (req, res) => {
    try {
        const documentId = req.params.id;
        await Document.findByIdAndDelete(documentId);
        res.redirect("/bibliotheque");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}

exports.create = async (req, res) => {
    try {
        const { name, description, category } = req.body;
        const newDocument = new Document({
            name,
            description,
            category
        });
        await newDocument.save();
        res.redirect("/bibliotheque");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}
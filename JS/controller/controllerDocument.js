const Document = require("../model/Document");
const Category = require("../model/Category");
const { name } = require("ejs");

exports.index = async (req, res) => {
    try {
        const documents = await Document.find().populate('category', {name: 1, _id: 0});
        const categories = await Category.find();
        res.render("pages/bibli", { title: "bibliothéque", documents });
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
    const { 
        name, 
        format, 
        description, 
        category 
    } = req.body;


    const existanceCategory = await Category.findOne({name: category})
    if(!existanceCategory) {
      return res.status(404).json({message: 'Category inconnue'})
    }

    const newDoc = new Document({
      name,
      format,
      description,
      createdAt: new Date(),
      category: existanceCategory._id
    });

    await newDoc.save();
    res.redirect('/bibliotheque'); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur document.");
  }
};

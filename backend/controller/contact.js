const Contact = require("../models/contact");
exports.newContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const serachUser = Contact.find({
      $or: [{ email }, { phone }],
    });
    if (serachUser.length > 0) {
      return res.status(400).send({
        success: false,
        message: "Already has Same Contact ",
      });
    }

    const newcontact = new Contact({ ...req.body });
    const savedContact = await newcontact.save();
    if (savedContact) {
      res.status(201).send({
        success: true,
        contact: savedContact,
        message: "Saved Successfully !!",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Unable to Save !!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
exports.updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    if (id) {
      const updatedContact = await Contact.findOneAndUpdate(
        id,
        {
          $set: { name, email, phone },
        },
        { new: true }
      );
      if (updatedContact) {
        res.status(200).send({
          success: true,
          contact: updatedContact,
          message: "Saved Successfully !!",
        });
      } else {
        res.status(200).send({
          success: false,
          message: "Unable to save Successfully !!",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "No id provided for update !!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const contact = await Contact.findOneAndDelete(id);
      if (contact) {
        res.status(201).send({
          success: true,
          message: "Deleted Successfully !!",
        });
      } else {
        res.status(201).send({
          success: false,
          message: "Item Doesn't Exists !!",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "No id provided for delete !!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
exports.getContacts = async (req, res) => {
  try {
    let { search } = req.query;
    if (search) {
      //   search = JSON.parse(search);
      const searchedContact = await Contact.find({
        $or: [
          { email: { $regex: new RegExp(search, "gi") } },
          { phone: { $regex: new RegExp(search, "gi") } },
          { name: { $regex: new RegExp(search, "gi") } },
        ],
      });
      if (searchedContact.length > 0) {
        return res.status(200).send({
          success: true,
          contacts: searchedContact,
          message: "Search Result !!",
        });
      } else {
        return res.status(200).send({
          success: false,
          contacts: [],
          message: "No Search Result Found !!",
        });
      }
    }
    const allContact = await Contact.find({});
    if (allContact) {
      res.status(200).send({
        success: true,
        contacts: allContact,
        message: "Loaded Successfully !!",
      });
    } else {
      res.status(400).send({
        success: false,
        contacts: [],
        message: "Some Error Occured !",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
exports.getContact = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const contact = await Contact.findById(id);
      if (contact) {
        res.status(200).send({
          success: true,
          contact: contact,
          message: "Successfully !!",
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Some Error Occured !",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Some Error Occured !",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

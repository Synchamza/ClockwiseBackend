import faqsModel from "../Models/FaqsModel.js";

export const createFaqs = async (req, res, next) => {
  try {
    const createFaqs = await new faqsModel({
      ...req.body,
    });

    const saveFaqs = await createFaqs.save();

    res.status(200).json({
      status: "success",
      message: "created faqs successfully",
      data: saveFaqs,
    });
  } catch (error) {
    // createError(error.status, error.message)
    next(error);
  }
};

export const updateFaqs = async (req, res, next) => {
  try {
    const faqsId = req.params.faqsId;
    // console.log(invoiceId)
    const updateFaqs = await faqsModel.findByIdAndUpdate(
      faqsId,
      { $set: req.body },
      { new: true }
    );

    // console.log(updateInvoices)
    res.status(200).json({
      status: "success",
      message: "update faqs successfully",
      data: updateFaqs,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFaqs = async (req, res, next) => {
  try {
    const faqsId = req.params.faqsId;
    await faqsModel.findByIdAndDelete(faqsId);
    res.status(200).json({
      status: "success",
      message: "Delete faqs successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getFaqs = async (req, res, next) => {
  try {
    const faqsId = req.params.faqsId;
    const faqs = await faqsModel.findById(faqsId);
    if(!faqs){
      return res.status(404).json({
        status : "failed",
        message : "Faqs not found"
      })
    }
    res.status(200).json({
      status: "success",
      message: "found faqs successfully",
      data: faqs,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllFaqs = async (req, res, next) => {
  try {
    const allFaqs = await faqsModel.find();
    res.status(200).json({
      status: "success",
      message: "found all Faqs successfully",
      data: allFaqs,
    });
  } catch (error) {
    next(error);
  }
};


export const searchFaqs = async (req, res, next) => {
    const { question } = req.query;
    const queryObject = {};
  
    if (question) {
      queryObject.question = question;
      console.log(queryObject);
    }
  
    try {
      const searchResult = await faqsModel.find({
        question: { $regex: question, $options: "i" },
      }).limit(40); // Use queryObject instead of req.query
  
      // const searchRes = await Resident.find(queryObject); // Use queryObject instead of req.query
      console.log(searchResult);
  
      if (searchResult.length > 0) {
        // Check if searchRes contains any data
        res.status(200).json({
          message: "Question found",
          data: searchResult,
        });
      } else {
        res.status(404).json({
          // Change status code to 404 for "Not Found"
          message: "Question not found",
          status: "failed",
        });
      }
    } catch (error) {
      console.error("Error searching Quesiton:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
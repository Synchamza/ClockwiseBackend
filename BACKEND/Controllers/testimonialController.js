import TestimonialModel from "../Models/TestimonialModel.js";
// import { createError } from "../Utils/error.js"

// createTestimonial api ===>
export const createTestimonial = async (req, res, next) => {
  try {
    const createTestimonial = await new TestimonialModel({
      ...req.body,
    });

    const saveTestimonial = await createTestimonial.save();

    res.status(200).json({
      status: "success",
      message: "created Testimonial successfully",
      data: saveTestimonial,
    });
  } catch (error) {
    // createError(error.status, error.message)
    next(error);
  }
};

// updateTestimonial api ===>
export const updateTestimonial = async (req, res, next) => {
  try {
    const testimonialId = req.params.testimonialId;
    // console.log(invoiceId)
    const updateTestimonial = await TestimonialModel.findByIdAndUpdate(
      testimonialId,
      { $set: req.body },
      { new: true }
    );

    // console.log(updateInvoices)
    res.status(200).json({
      status: "success",
      message: "update Testimonial successfully",
      data: updateTestimonial,
    });
  } catch (error) {
    next(error);
  }
};

// deleteTestimonial api ===>
export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonialId = req.params.testimonialId;
    const testimonial = await TestimonialModel.findById(testimonialId);
    if (!testimonial) {
      res.status(404).json({
        status: "failed",
        message: "Testimonial not found",
      });
    }
    await TestimonialModel.findByIdAndDelete(testimonialId);

    res.status(200).json({
      status: "success",
      message: "Delete Testimonial successfully",
    });
  } catch (error) {
    next(error);
  }
};

// getAllTestimonial api ===>
export const getAllTestimonial = async (req, res, next) => {
  try {
    const allTestimonial = await TestimonialModel.find();
    res.status(200).json({
      status: "success",
      message: "found all Testimonial successfully",
      data: allTestimonial,
    });
  } catch (error) {
    next(error);
  }
};

// searchService api
export const searchTestimonialByClientName = async (req, res, next) => {
  const { clientName } = req.query;
  const queryObject = {};

  console.log(clientName);

  if (clientName) {
    queryObject.clientName = clientName;
    console.log(queryObject);
  }

  try {
    const searchResult = await TestimonialModel.find({
      clientName: { $regex: clientName, $options: "i" },
    }).limit(40); // Use queryObject instead of req.query

    // const searchRes = await Resident.find(queryObject); // Use queryObject instead of req.query
    console.log(searchResult);

    if (searchResult.length > 0) {
      // Check if searchRes contains any data
      res.status(200).json({
        message: "Testimonials found",
        data: searchResult,
      });
    } else {
      res.status(404).json({
        // Change status code to 404 for "Not Found"
        message: "Testimonial not found",
        status: "failed",
      });
    }
  } catch (error) {
    console.error("Error searching Testimonial:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

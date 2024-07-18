const Joi = require("joi");
const path = require("path");
const CandidatesModel = require("../models/Candidates");
const { addToQueue } = require("../helpers/queue");

const addNewCandidate = async (req, res, next) => {
  try {
    const candidatesSchema = Joi.object({
      name: Joi.string().required("Candidate name is required"),
      email: Joi.string().email(),
      dob: Joi.date().required("A valid date is required"),
      image: Joi.string().required("Image url is required"),
    });
    const { error } = candidatesSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: false,
        msg: "Validation Error",
        error: error,
      });
    }
    const { name, image, email, dob } = req.body;
    const { electionId } = req.params;
    const candidate = new CandidatesModel({
      name,
      email,
      image,
      dob,
      election_id: electionId,
    });
    const data = await candidate.save();
    if (data) {
      return res.status(201).json({
        status: true,
        msg: "Candidate added",
        data: data,
      });
    }
    return res.status(400).json({
      status: false,
      msg: "Failed to add candidate",
    });
  } catch (error) {
    next(error);
  }
};

const getAllCandidates = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const { page } = req.query;
    const count = await CandidatesModel.countDocuments({
      election_id: electionId,
    });
    const data = await CandidatesModel.find({ election_id: electionId })
      .limit(10)
      .skip(10 * (page - 1))
      .sort({ name: "asc" });
    if (data) {
      let finalData = {
        data: data,
        current_page: page,
        total_pages: Math.ceil(count / 10),
      };
      return res.status(200).json({
        status: true,
        msg: "Candidates fetched",
        data: finalData,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getCandidateDetails = async (req, res, next) => {
  try {
    const { candidateId } = req.params;

    const data = await CandidatesModel.findById(candidateId);
    if (data) {
      return res.status(200).json({
        status: true,
        msg: "Candidates details fetched successfully",
        data: data,
      });
    }
    return res.status(400).json({
      status: false,
      msg: "Failed to fetch candidate details",
    });
  } catch (error) {
    next(error);
  }
};

const bulkUpload = async (req, res, next) => {
  try {
    const filePath = path.resolve(req.file.path);
    const jobData = {
      filePath,
      electionId: req.params.electionId,
      userId: req.user.id,
    };
    addToQueue(jobData);
    res.status(200).json({
      status: true,
      msg: "Candidates uploading has been started",
    });
  } catch (error) {
    next(error);
  }
};

const updateCandidateDetails = async (req, res, next) => {
  try {
    const data = await CandidatesModel.findOneAndUpdate(
      { _id: req.params.candidateId },
      req.body
    );
    if (data) {
      return res.status(200).json({
        status: true,
        msg: "Updated Successfully",
      });
    }

    return res.status(400).json({
      status: false,
      msg: "Failed to update",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addNewCandidate,
  getAllCandidates,
  bulkUpload,
  updateCandidateDetails,
  getCandidateDetails,
};

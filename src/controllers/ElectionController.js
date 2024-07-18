const Joi = require("joi");
const Elections = require("../models/Elections");
const Candidates = require("../models/Candidates");

const createElection = async (req, res, next) => {
  try {
    const { title, image, description, startDate } = req.body;

    const electionValidationSchema = Joi.object({
      title: Joi.string().required("A title is required for an election"),
      image: Joi.string(),
      description: Joi.string().required("A description is required"),
      startDate: Joi.date().required("A valid start date is required"),
    });

    const { error } = electionValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: false,
        error: error,
        msg: "Validation error",
      });
    }

    const election = new Elections({
      title,
      image,
      description,
      startDate,
      createdBy: req.user.id,
    });

    const data = await election.save();
    if (data) {
      return res.status(201).json({
        status: true,
        msg: "Election created successfully",
        data: data,
      });
    }
    return res.status(400).json({
      status: false,
      msg: "Failed to create election",
    });
  } catch (error) {
    next(error);
  }
};

const getElections = async (req, res, next) => {
  try {
    const elections = await Elections.find({ createdBy: req.user.id }).sort({
      startDate: -1,
    });
    if (elections) {
      return res.status(200).json({
        status: true,
        msg: "Elections fetched successfully",
        data: elections,
      });
    }

    return res.status(400).json({
      status: true,
      msg: "Failed to fetch elections",
    });
  } catch (error) {
    next(error);
  }
};

const getElectionById = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const elections = await Elections.findById(electionId);
    const candidates = await Candidates.countDocuments({
      election_id: electionId,
    });
    let finalData = {
      ...elections?._doc,
      total_candidates: candidates,
    };
    if (elections) {
      return res.status(200).json({
        status: true,
        msg: "Election fetched successfully",
        data: finalData,
      });
    }

    return res.status(400).json({
      status: true,
      msg: "Failed to fetch elections",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createElection, getElections, getElectionById };

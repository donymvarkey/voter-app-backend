const Queue = require("bull");
const xlsx = require("xlsx");
const Candidates = require("../models/Candidates");
const User = require("../models/User");
const { convertDate } = require("./utils");
const { sendNotification } = require("../controllers/NotificationController");
const logger = require("../logger/Logger");

const excelQueue = new Queue("excel-queue");

const addToQueue = (data) => {
  excelQueue.add({
    job: data.filePath,
    item_id: data.electionId,
    userId: data.userId,
  });
  logger.info("job added to queue");
};

const getUserFcmToken = async (userId) => {
  try {
    const data = await User.findById(userId);
    return data.fcm_token;
  } catch (error) {
    logger.error("error", error);
  }
};

excelQueue.process(async (job, done) => {
  try {
    logger.info(`${JSON.stringify(job)} staring...`);
    // const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const workbook = xlsx.readFile(job.data.job);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const fcmToken = await getUserFcmToken(job.data.userId);

    const jsonData = xlsx.utils.sheet_to_json(worksheet, { raw: false });
    const candidates = jsonData.map((item) => {
      return {
        name: item?.name || item?.Name,
        dob: convertDate(item?.dob || item?.DoB),
        email: item?.email || item?.Email,
        election_id: job?.data?.item_id,
        image: null,
      };
    });

    const data = await Candidates.insertMany(candidates);
    if (data) {
      logger.info("Job complete");
      await sendNotification(
        fcmToken,
        "Upload Complete",
        "Candidates has been successfully uploaded!"
      );
      done();
    }
  } catch (error) {
    done(new Error("Failed to process the excel file"));
  }
});

module.exports = {
  addToQueue,
};

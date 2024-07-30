const bcrypt = require("bcrypt");
const { parse, formatISO } = require("date-fns");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const getPaginatedData = async (model, pageNo, size = 10) => {
  const q = {};
  q.skip = size * (pageNo - 1);
  q.limit = size;
  const data = await model.find({}, {}, q);
  return data;
};

const getWeekRange = (date) => {
  const start = new Date(date);
  const day = start.getDay(); // 0 (Sunday) to 6 (Saturday)
  const diff = start.getDate() - day;
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6); // Saturday of the same week
  end.setHours(23, 59, 59, 999); // End of the day
  return { start, end };
};

const structureGraphData = (expenses) => {
  let dates = [];
  let expensesArr = [];
  expenses?.map((expense) => {
    dates.push(expense?._id);
    expensesArr.push(expense?.totalAmount);
  });

  return {
    dates,
    expenses: expensesArr,
  };
};

const convertDate = (dateStr) => {
  let format = "dd/MM/yyyy";
  if (dateStr.includes("-")) {
    format = "dd-MMM-yy";
  }
  const parsedDate = parse(dateStr, format, new Date());
  return formatISO(parsedDate);
};

module.exports = {
  hashPassword,
  comparePassword,
  getPaginatedData,
  getWeekRange,
  structureGraphData,
  convertDate,
};

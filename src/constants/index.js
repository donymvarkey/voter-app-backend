const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const PRIORITY = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

module.exports = {
  passwordRegex,
  PRIORITY,
};

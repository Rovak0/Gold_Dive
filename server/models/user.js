const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  //object variables
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    //what needs to be saved to users?
    // income, expenses, and savings
    //all of these are arrays because there may be multiple income sources
    //and many types of expenses and savings
    incomes: {
      type: Array,
    },
    expenses: {
      type: Array,
    },
    savings: {
      type: Array,
    },
  },
  {
    toJson: {
      virtuals: true,
    },
  }
);

//scramble the password before saving
//this is also middleware
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

//scramble financial data
// userSchema.pre('save', async function (next) {
//     if (this.isNew || this.isModified('income')) {
//         const saltRounds = 10;
//         this.income = await bcrypt.hash(this.income, saltRounds);
//       }

//     next();
// });

// userSchema.pre('save', async function (next) {
//     if (this.isNew || this.isModified('expenses')) {
//         const saltRounds = 10;
//         this.expenses = await bcrypt.hash(this.expenses, saltRounds);
//       }

//     next();

// });

// userSchema.pre('save', async function (next) {
//     if (this.isNew || this.isModified('savings')) {
//         const saltRounds = 10;
//         this.savings = await bcrypt.hash(this.savings, saltRounds);
//       }

//     next();
// });

//password checkers
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//Unlike passwords, financial data will acutally be displayed
//They must be decrypted and shown
//Can't be done with hashing.  Notes to fix later

const User = model("User", userSchema);

module.exports = User;

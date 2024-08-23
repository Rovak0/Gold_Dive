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
    budget: {
      type: Number,
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

//scramble financial data with built in node things
// const crypto = require('node:crypto');
// //not a good password, but I'll just use the user's password
//     //I don't think the password will work b/c it is hashed
//     //I'm going with username
// const algorithm = 'aes-192-cbc';

// userSchema.pre('findOneAndUpdate', async function (next) {
//     console.log("Here");
//     //clause to run encryption
//     if (this.isNew || this.isModified('incomes')) {
//         //what to run to encrypt
//         for (income of this.incomes){
//             crypto.scrypt(this.username, 'salt', 24, (err, key) => {
//                 if (err) throw err;
//                 crypto.randomFill(new Uint8Array(16), (err, iv) => {
//                     if (err) throw err;
//                     //make the cypher
//                     const cipher = crypto.createCipheriv(algorithm, key, iv);

//                     let encrypted = ''; //this is the string that the encyrpted data is stored in
//                     cipher.setEncoding('hex');

//                     cipher.on('data', (chunk) => encrypted+=chunk); //this creates the encrypted data
//                     cipher.on('end', () => console.log(encrypted)); //prints encrypted data with key (?)

//                     cipher.write('some clear text data');
//                     cipher.end();
//                     this.incomes = encrypted;
//                 })
//             })
//         }
//     }

//     next();
// });

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

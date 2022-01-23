const mongoose = require("mongoose");

//nesting schema
const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
});

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: (v) => v % 2 === 0,
            message: (props) => `${props.value} is not an even number`,
        },
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 10,
        // uppercase: true,
    },

    createdAt: {
        type: Date,
        // default: new Date(),
        default: () => Date.now(),
        immutable: true,
    },

    updatedAt: {
        type: Date,
        // default: new Date(),
        default: () => Date.now(),
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    hobbies: [String],
    address: addressSchema,
});

userSchema.methods.sayHI = function () {
    console.log(`Hi, My name is ${this.name}`);
};

userSchema.statics.findByName = function (name) {
    return this.find({ name: new RegExp(name, "i") }); //where syntax same as find
};

userSchema.query.byName = function (name) {
    return this.where({ name: new RegExp(name, "i") });
};

userSchema.virtual("nameEmail").get(function () {
    return `${this.name} <${this.email}>`;
});

// middleware- pre/post
userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    // next();
    throw new Error("Fail Save");
});
userSchema.post("save", function (doc, next) {
    doc.sayHI();
    next();
});

module.exports = mongoose.model("User", userSchema);

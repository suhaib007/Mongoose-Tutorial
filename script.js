const mongoose = require("mongoose");
const User = require("./User");

// mongoose.connect(
//     "mongodb://localhost/testdb",
//     () => {
//         console.log("Connected");
//     },
//     (e) => console.error(e)
// );

// or

mongoose.connect("mongodb://localhost/testdb");

run();
async function run() {
    // User.findById().save();
    try {
        // const user = await User.findById("61ecffa79cbbda664e050a06"); //Asynchronous
        // const user = await User.deleteOne({ name: "Abhishek" }); //Find Works exactly alike like in mongoDB
        // const user = await User.where("name").equals("Abhishek");
        // const user = await User.where("age")
        //     .gt("15")
        //     .select("age")
        //     .where("name")
        //     .equals("Abhishek")
        //     .populate("bestFriend")     //allows us to do a join
        //     .limit(1);
        // user[0].bestFriend = "61ec3b011f93c8dc49066e7a";
        // await user[0].save();

        // const user = await User.findOne({ name: "Abhishek" });
        // const user = await User.findByName("Abhishek");
        // const user = await User.find().byName("Abhishek");
        const user = await User.findOne({
            name: "Abhishek",
            email: "TEST@TEST.COM",
        });
        console.log(user);
        await user.save();
        console.log(user);
        console.log(user.nameEmail);
        // user.sayHI();       //works for a single user

        // const user = await User.create({
        //     name: "Abhishek",
        //     age: 30,
        //     email: "TEST@TEST.COM",
        //     hobbies: ["Weight Lifting", "Bowling"],
        //     address: {
        //         street: "Main St",
        //     },
        // });
        // console.log(user);
    } catch (e) {
        // console.log(e.errors.age);
        console.log(e.message);
    }
}

// const user = new User({ name: "Abhinav", age: 20 });
// await user.save();

// const user = new User({ name: "Abhinav", age: 20 });
// // Asynchronous Function
// user.save().then(() => console.log("User Saved"));

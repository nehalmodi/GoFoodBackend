const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://gofood:mern123@cluster0.a6drpfm.mongodb.net/gofoodmern?retryWrites=true&w=majority";
const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewURLParser: true },
    async (err, result) => {
      if (err) {
        console.log("--", err);
      } else {
        console.log("connected");
        const fetched_data = await mongoose.connection.db.collection(
          "food_items" 
        );
        fetched_data.find({}).toArray(async function (error, data) {
          const foodCategory = await mongoose.connection.db.collection(
            "foodCategory"
          );
          foodCategory.find().toArray(function (error, catData) {
            if (error) {
              console.log(error);
            } else {
              global.food_items = data;
              global.foodCategory = catData;
            }
          });
        });
      }
    }
  );
};

module.exports = mongoDB();

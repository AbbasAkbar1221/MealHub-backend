const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  merchants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: "Counter must have at least one merchant",
    },
    default: [],
  },
});

const Counter = mongoose.model("Counter", CounterSchema);
module.exports = Counter;

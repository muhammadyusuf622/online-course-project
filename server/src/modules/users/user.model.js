import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({

  username: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },

  email: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    match: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
    required: true
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  profil_image: {
    type: mongoose.SchemaTypes.String,
    default: "https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg",
  },
  bio: {
    type: mongoose.SchemaTypes.String,
    required: false
  },
  role: {
    type: mongoose.SchemaTypes.String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  }
}, {
  collection: "users",
  timestamps: true,
  versionKey: false
});

export default mongoose.model("Users", UserSchema);
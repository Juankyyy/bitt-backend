import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      select: false,
    },
    avatar: {
      type: String,
      maxlength: 300,
      default:
        "https://res.cloudinary.com/dsqovh4hh/image/upload/deafultprofile_rg13uu.svg",
    },
    banner: {
      type: String,
      maxlength: 300,
      default:
        "https://res.cloudinary.com/dsqovh4hh/image/upload/defaultbanner_qrncjv.svg",
    },
    bio: {
      type: String,
      maxlength: 150,
      default: null,
    },
    location: {
      type: String,
      maxlength: 30,
      default: null,
    },
    website: {
      type: String,
      default: null,
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followingCount: {
      type: Number,
      default: 0,
    },
    followersCount: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserModel);

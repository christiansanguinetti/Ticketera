import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuidv4, required: true, unique: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        delete ret.password;
      },
      virtuals: true,
    },
  }
);

// 🔐 Hashear password antes de guardar (CORRECTO)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 🔑 Método para login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Índice
userSchema.index({ id: 1, email: 1 });

const User = mongoose.model("User", userSchema);

console.log("✅ User model cargado correctamente");

export default User;
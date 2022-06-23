import mongoose from "mongoose";
import {updateIfCurrentPlugin } from "mongoose-update-if-current";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }],
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.set("versionKey", "__v");
userSchema.plugin(updateIfCurrentPlugin);

export const User = mongoose.model("User", userSchema);

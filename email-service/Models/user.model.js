const bcrypt = require('bcrypt');
const { model, Schema } = require('mongoose');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        isConfirmed: {
            type: Boolean,
            required: true,
            default: false,
        },
        role: {
            type: String,
            default: "User",
            enum: ["User", "Admin", "SuperAdmin"],
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        address: [
            {
                type: String,
                required: true,
            },
        ],
        profilePic: {
            secure_url: {
                type: String,
            },
            public_id: {
                type: String,
            },
        },
        status: {
            type: String,
            default: "offline",
            enum: ["online", "offline"],
        },
        gender: {
            type: String,
            default: "not specified",
            enum: ["male", "female", "not specified"],
        },
        age: Number,
        token: String,
        forgetCode: String,
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, +process.env.SALT_ROUNDS);
    next();
});

module.exports = model("User", userSchema);

import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";


// Inteface defining the structure of a User document
export interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'user' | 'admin';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    // Method to compare password
    comparePassword(candidatePassword: string): Promise<boolean>
}


// Mongoose schema defining validation rules and structure 
const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
        },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
        },
    
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        maxlength: [50, "First name cannot exceed 50 characters"]
    },

    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        maxlength: [50, "Last name cannot exceed 50 characters"]
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true, // Automatically adds CreatedAt and updatedAt
    collection: "users"
})


// PRE-SAVE MIDDLEWARE: Hash password before saving to database
UserSchema.pre("save", async function(next) {
    // Only hash password if it's been modified
    if (!this.isModified("password")) return next()

    try {
        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password as string, salt);
        next()
    } catch (error) {
        next(error as Error);
    }
});


// Instance Method: Compare provided password with stored hash
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
};

// Create and export the User model
const User = model<IUser>("User", UserSchema);


export default User;
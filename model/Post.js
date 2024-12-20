import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        ShortLink: {
            type: String,
            unique: true,
        },
        OriginalLink: {
            type: String,
            required: [true, "Link is required to Shorten"],
            match: [
                /^(https?:\/\/)/,
                "Please provide a valid URL.",
              ],    
        },
        ORcode: {
            type: String,
        },
        clicks: {
            type: Number,
        },
        Date: {
            type: Date,
            default: Date.now,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);

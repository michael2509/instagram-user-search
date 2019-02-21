import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: String,
    username: String,
    country: String,
    location: String,
    followers: {
        count: String,
        growth: String
    },
    likes_average: String,
    comments_average: String,
    audience: {
        age_range: String,
        gender: String,
        location: String,
        language: String,
        interests: {
            title: [String, String, String],
            value: [String, String, String]
        }
    }
})

const User = model('user', userSchema);

export default User;
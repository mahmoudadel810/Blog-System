import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
    {
    
        name: String,
        email: String,
        age: Number,
        password: {
            type: String,
            required : true
        }
        


}
)


const userModel = mongoose.model('User', userSchema)

export default userModel;


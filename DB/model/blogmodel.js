import mongoose, { Schema } from 'mongoose';

const blogSchema = new Schema(
    {

        content: String,
        addedBy: {
            type: Schema.Types.ObjectId, 
            ref : 'User'
           
       }


    }
);


const blogModel = mongoose.model('blog', blogSchema);

export default blogModel;

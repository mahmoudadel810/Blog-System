import blogModel from "../../DB/model/blogmodel.js";
import userModel from "../../DB/model/userModel.js"
import  jwt  from "jsonwebtoken";


export const addblog = async (req, res) =>
{
    try
    {
        const { content } = req.body;
        const { _id } = req.user
        const newblog = new blogModel({
            content,
            addedBy: req.user._id
        });
        const savedblog = await newblog.save()
        if (!savedblog)
        {
            res.json({message:'Can not add Blog'})
        }
        res.json({message:'Added Done ' , savedblog})
        

        
        
    } catch (error)
    {
         res.json({ Message: 'Catch Error' })
        console.log(error);
        
    }
};

//-------------------------------------------------------------
//updateblog

export const updateBlog = async (req, res) =>
{
    try
    {
        const { content, blogid , addedBy } = req.body;
        const { _id } = req.user;

        const usercheck = await userModel.findById(_id)
        console.log(usercheck);
        if (usercheck)
        {
            const updatedBlog = await blogModel.findByIdAndUpdate(
                blogid,
                { content },
                { new: true }
            );
            if (!updatedBlog)
            {
                return res.json({ message: "Update failed" });
            }

            return res.json({ message: "Update successful", updatedBlog });
        } else
        {
            res.json({message:'Invalid ID'})
        }
       
    } catch (error)
    {
        res.json({ message: "Server error" , error:error.message });
        
    }
};

//Deleteblog .

export const Deleteblog = async(req, res) =>
{
    try
    {
        const { blogid } = req.body;
        const { _id } = req.user
        
        const blogcheck = await blogModel.findOne({_id:blogid , addedBy : _id})
        console.log(blogcheck);
        if (blogcheck)
        {
            const deleted = await blogModel.deleteOne({ _id: blogid })

            deleted.deletedCount
                ? res.json({ message: " success" })
                : res.json({ message: " failed" })
        }
        
        else
        {
            res.json({ message: "Blog Not Found" });
        }
        
    }
    catch (error)
    {
        res.json({ message: "Server error"  , error :error.message});
        
    }
};

//-------------------------------------------------------------------------
//getallproducts

export const getAllProductsWithOwners = async (req, res) =>
{
    try
    {
        const blogs = await blogModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "addedBy",
                    foreignField: "_id",
                    as: "owner of Blog",
                },
            },
        ]);
        blogs
            ? res.json({ message: "Products retrieved successfully.", blogs })
            : res.json({ message: "Products  Failed to retrieve" })
    } catch (error)
    {
        
        res.json({ message: "Catch Error." , error : error.message });
        
    }
};

//------------------------------–––––––––––––––––––––––––––––––––––––––––––––––––
//get blog by id


export const getblogById = async (req, res) =>
{
    try
    {
        const { _id } = req.params;

        const blog = await blogModel.findById(_id);

        blog 
            ? res.json({ message: "blog retrieved successfully.", blog })
            : res.json({ message: "blog retrieved Failed." });
        
    } catch (error)
    {
         res.json({message: "Catch Error.", err: error.message})
    }
};



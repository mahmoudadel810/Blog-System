import userModel from "../../DB/model/userModel.js";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";


export const signUp = async (req, res) =>
{
    try
    {
        const { name, email, age, password, cpass } = req.body;
        if (!password == cpass)
        {
            res.json({message:'password must match cpass'})
        }
        const user = await userModel.findOne({ email })
        
        if (!user)
        {
            const hashedpass = bcrypt.hashSync(password, 8)
            const newuser = new userModel({
                name,
                email,
                age,
                password: hashedpass
            })
            const saveduser = await newuser.save()
            if (!saveduser)
            {
                res.json({message:'Sign Up Failed'})
            }
            res.json({ message: 'Sign Up Succsess' })

        } else
        {
            res.json({message:'please enter another email'})
        }
    }
     catch (error)
    {
        console.log(error);
        res.json({ message: "Catch error in signUp" });
    }
};

//------------------------------------------------------------
//signIn 
export const signIn = async (req, res) =>
{
    try
    {
        const { email, password } = req.body;
        
        const user = await userModel.findOne({ email })
        if (user)
        {
            const match = bcrypt.compareSync(password, user.password)
            if (match)
            {
                const token = jwt.sign({id:user._id , email: user.email , name: user.name  , age: user.age} , 'TokenSignture') //key value signture between front and back .
                res.json({message:'Login Success' , token})
            } else
            {
                res.json({ message: 'Inavalid Data ' });
            }
        } else
        {
            res.json({message:'Invalid Login Information'}) // Don't tell user that password incorrect cause safity Shit things
        }
        
    } catch (error)
    {
    
        res.json({ message: 'Catch Error in signIn' });
        console.log(error
        );
    }
};

//---------------------------------------------------
// update user (user must be logged in and account owner only can do this)

export const updateUser = async (req, res) =>
{
    try
    {
        const { name, email, age } = req.body;
        const { token } = req.headers;
        
        const decoded = jwt.verify(token, "TokenSignture");

        if (!decoded)
        {
            return res.json({ message: "Unauthorized" });
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            decoded.id,
             { name, email, age } ,
            { new: true }
        );

        if (!updatedUser)
        {
            return res.json({ message: "Update failed" });
        }

        return res.json({ message: "Update successful", updatedUser });
    } catch (error)
    {
         res.json({ message: "Server error" });
        console.log(error);
    }
};

//---------------------------------------------------------------------------------------

export const deleteUser = async (req, res) =>
{
    try
    {
        const token = req.headers.token;
        const decoded = jwt.verify(token, "TokenSignture");

        const user = await userModel.findOne({ _id: decoded.id });
        if (!user)
        {
            return res.json({ message: "Unauthorized" });
        }

        const deletedUser = await userModel.findByIdAndDelete({ _id: decoded.id });
        if (!deletedUser)
        {
            return res.json({ message: "User not found" });
        }

        return res.json({ message: "User deleted successfully" });
    } catch (error)
    {
        res.json({ message: "Server error" });
        console.log(error
        );
    }
};

//----------------------------------------------------------------------------------------------
//get user data (user must be logged in and account owner only can do this

export const getUserData = async (req, res) =>
{
    try
    {
        const {token} = req.headers;
        if (!token)
        {
         res.json({ message: "Unauthorized request" });
        }
        const decoded = jwt.verify(token, "TokenSignture");
        const user = await userModel.findOne({ _id: decoded.id });
        if (!user)
        {
            return res.json({ message: "User not found" });
        }
        return res.json({ user });
    } catch (error)
    {
        console.log(error);
         res.json({ message: "Error getting user data" });
    }
};

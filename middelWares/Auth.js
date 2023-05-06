import  jwt  from "jsonwebtoken";
import blogModel from "../DB/model/blogmodel.js";
import userModel from "../DB/model/userModel.js";

const Auth = () =>
{
    return async (req, res, next) =>
    {
        try {
            
            const { authorization } = req.headers
            
            
            if (!authorization || !authorization.startsWith('dola__'))
            {
                res.json({ message: "please enter your token , Or be sure about prefix" })
            }
            
            const token = authorization.split("dola__")[1]
            const decoded = jwt.verify(token, 'TokenSignture');
            if (!decoded)
            {
                res.json({ message: 'Can not find token' });
            }
            const user = await userModel.findById(decoded.id)

            if (!user)
            {
                res.json({ message: 'Can not find the User ' });
            }
            req.user = user
            next()

            
            
        }
        catch (error)
        {
            res.json({ message: 'catch Error' })
            console.log(error);
            
        }
    }
};

export default Auth
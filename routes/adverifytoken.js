const jwt=require ('jsonwebtoken');
module.exports=(req,res,next)=>{
    const token =req.header("admin_auth_token");
    if(!token) return res.status(401).send("Access Denied");
    try{
        const verified =jwt.verify(token,process.env.ATOKEN_STRING)
        req.user=verified;
        next();
    }
    catch(error){res.status(400).send("Invalid Token")}
}

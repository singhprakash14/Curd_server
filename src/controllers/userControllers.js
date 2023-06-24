const httpStatus=require("http-status");
const userService=require("../service/user.service");

//Adduser
const adduser = async (req, res) => {
  try {
    const { Name, EmailId, Job_Role } = req.body;
    const saveduser = await userService.adduser(Name,EmailId,Job_Role);
    res.status(httpStatus.CREATED).json(saveduser);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};


//get Alll user


const getAllUser=async(req,res)=>{
    try{
    const getuserdata=await userService.getAllUser();
    res.status(httpStatus.OK).json(getuserdata)

    }catch(error){
res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error:error.message});
    }
}


//get a todo by ID

const getUserById=async(req,res)=>{
    try{
const userid=await userService.getUserById(req.params.id)
if(!userid){
    return res.status(httpStatus.NOT_FOUND).josn({message:"user not Found"})
}
res.status(httpStatus.OK).josn(userid)
    }catch(error){
res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error:error.message})
    }
}

//update a user

const updateUser=async(req,res)=>{
    try{
const { Name, EmailId, Job_Role }=req.body;
const updatedUser = await userService.updateUser(
  req.params.id,
  Name,
  EmailId,
  Job_Role
);
if(!updatedUser){
    return res.status(httpStatus.NOT_FOUND).json({message:"user not Found"})
}
res.status(httpStatus.OK).json(updatedUser);
    }catch(error){
res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

//Delete a user

const  deleteUser=async(req,res)=>{
 try{

    const deletedUser=await userService.deleteUser(req.params.id)
    if(!deletedUser){
        return res.status(httpStatus.NOT_FOUND).json({message:"user not found"})
    }
res.status(httpStatus.OK).json({message:"user Deleted"});

 }catch(error){
res.status(httpStatus.INTERNAL_SERVER_ERROR).json
 }
}



//searchuser
const searchUser=async(req,res)=>{
    const {query}=req.query;
    try{
if(!query){
    return res.status(httpStatus.BAD_REQUEST).send({data:[]});

}
const searchResults=await userService.searchUser(query)
if(!searchResults || searchResults.length===0){
    return res.status(httpStatus.NOT_FOUND).send({data:[]});

}  
 res.json(searchResults) 

}catch(error){
res
  .status(httpStatus.INTERNAL_SERVER_ERROR)
  .json({ error: "Internal server error" });
    }
}




//     adduser,
//   getAllUser,
//   getUserById,
//   updateUser,
//   deleteUser,

//   searchUser,


module.exports = {
  adduser,
  getUserById,
  getAllUser,
  updateUser,
  deleteUser,
  searchUser,

};
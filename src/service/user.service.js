const userModel =require("../models/usermodel")


//Adduser

// const adduser = async(Name,EmailId,Job_Role)=>{
//  const existingMongoUser = await userModel.findOne({ email: EmailId });

//  if (existingMongoUser) {
//    return { error: "Email already exists" };
//  }

//     const userdata=new userModel({
//         Name,EmailId,Job_Role
//     });
//     const saveduserdata=await userdata.save()
//     return saveduserdata;
// };


const adduser = async (Name, EmailId, Job_Role) => {
  try {
    const existingMongoUser = await userModel.findOne({ EmailId });

    if (existingMongoUser) {
      return { error: "Email already exists" };
    }


    const userdata = new userModel({
      Name,
      EmailId,
      Job_Role,
    });

    const saveduserdata = await userdata.save();
    return saveduserdata;
  } catch (error) {
    console.log("Error adding user:", error);
    return { error: "An error occurred while adding the user" };
  }

};






// async function adduser(Name,EmailId,Job_Role)=>{
//   try{
//     const existingUser = await User.findOne({ where: { email } });
//     const existingMongoUser = await mongoUser.findOne({ email });
//     if (existingUser || existingMongoUser) {
//       return { error: "Email already exists" };
//     }
//   }catch (error) {
//     console.error("Error creating user:", error);
//     return { error: "Failed to create user" }
// }



//Get All User

const getAllUser=async()=>{
    const getuser=await userModel.find();
    return getuser;
};


//get a user by id

const getUserById=async(id)=>{
    const userbyid=await userModel.findById(id)
    return userbyid
}

//update a user

const updateUser = async(id, Name, EmailId, Job_Role)=>{
   const updatedUser=await userModel.findByIdAndUpdate(
    id,
    {Name,EmailId,Job_Role},
    {new:true}

   )
   return updatedUser;
};

//delete a user 


const deleteUser=async(id)=>{
    const deletedUser=await userModel.findByIdAndRemove(id)
    return deletedUser;
}


// Search user
const searchUser = async (query) => {
  try {
    const searchResults = await TodoModel.aggregate([
      {
        $match: {
          $or: [
            { Name: { $regex: query, $options: "i" } },
            { EmailId: { $regex: query, $options: "i" } },
          ],
        },
      },
    ]);

    return searchResults;
  } catch (error) {
    throw new Error("Error searching items");
  }
}

module.exports = {
  adduser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  searchUser,
};

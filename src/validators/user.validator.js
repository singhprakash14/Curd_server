const Joi=require("joi")

const userSchema = Joi.object({
  Name: Joi.string().required().messages({
    "string.empty": "Name is reqired.",
  }),
  EmailId: Joi.string().required().messages({
    "string.empty": "Email is reqired.",
  }),
  Job_Role: Joi.string().required().messages({
    "string.empty": "Job Role is reqired.",
  }),
})

  const validateUser = (req, res, next) => {
     const { error, value } = userSchema.validate(req.body);
     if (error) {
       const errorMessage = error.details[0].message;
       return res.status(400).json({ error: errorMessage });
     }
    // Check if all fields are empty
    const { Name, EmailId, Job_Role } = value;
    if (!Name && !EmailId && !Job_Role) {
      return res.status(400).json({ error: "All fields are required." });
    }
    next();
  }




module.exports=validateUser;


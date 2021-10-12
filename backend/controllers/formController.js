const form = require("../models/form");

exports.newForm = (req , res) =>{
    const Form = new form ({
        DidLike : req.body.DidLike,
        Rating : req.body.Rating,
        LikeFoods : req.body.LikeFoods,
        RatingFoods : req.body.RatingFoods,
        Comment : req.body.Comment,
        UserId : req.body.UserId
    })
    Form.save().then((new_form,err)=>{
        if(err){
           return res.status(500).json({error:"Server Error"})
        }
        
        res.status(200).json({message:"Form save successfully"})
    })
    .catch(err=>{
        res.status(400).json({message:"save Error, Please Try Again",err})
    })
}

exports.fetchForms = (req, res) => {
    form.find().then(fetchedForm=>res.status(200).json(fetchedForm))
    .catch(err => console.log(err))
}

exports.fetchFormPer = (req, res) => {
    form.findById({ _id: req.params.id })
        .then(fetchedForm => res.json(fetchedForm))
        .catch(err => console.log(err))
}

exports.updateForm = (req, res)=>{
    form.findById(req.params.id,(err,foundItem)=>{
        if(err)
            return res.status(500).json({message:"Error in Feching Categary, please try again."});
        if(!foundItem)
            return res.status(500).json({message:"Form Doesn't exist, please check."});
            updatedItem = {
                DidLike : req.body.DidLike,
                Rating : req.body.Rating,
                LikeFoods : req.body.LikeFoods,
                RatingFoods : req.body.RatingFoods,
                Comment : req.body.Comment,
                UserId : req.body.UserId
            }
            form.findByIdAndUpdate(req.params.id , updatedItem , {
                new : true, 
                useFindAndModify : false 
            }).then((new_form,err)=>{
                if(err){
                   return res.status(500).json({error:"Server Error"})
                }
                
                res.status(200).json({message:"SuccesFully Updated"})
            })
            .catch(err=>{
                res.status(400).json({message:"Updation Error, Please Try Again",err})
            })
    })
}

exports.deleteForm = (req ,res) =>{
    form.findById(req.params.id,(err,foundItem)=>{
        if(err)
            return res.status(500).json({message:"Error in Fecching Categary, please try again."});
        if(!foundItem)
            return res.status(500).json({message:"Categary Doesn't exist, please register."});
            form.findByIdAndDelete(req.params.id 
                // new : true, 
                // useFindAndModify : false 
            ).then((new_form,err)=>{
                if(err){
                   return res.status(500).json({error:"Server Error"})
                }
                
                res.status(200).json({message:"SuccesFully Deleted"})
            })
            .catch(err=>{
                res.status(400).json({message:"Deletion Error, Please Try Again",err})
            })
    })
}
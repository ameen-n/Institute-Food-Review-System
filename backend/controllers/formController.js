const form = require("../models/defaultForm");
const itemForm = require("../models/itemForm");
const ratingForm = require("../models/ratingForm");

const DayinInt  = {
    0 : "Sunday",
    1  : "Monday",
    2 : "Tuesday",
    3  : "Wednesday",
    4  : "Thursday",
    5  : "Friday",
    6  :  "Saturday"
};

var currentTime = new Date();
var currentOffset = currentTime.getTimezoneOffset();
var ISTOffset = 330;   // IST offset UTC +5:30 
var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
var hours = ISTTime.getHours()


exports.newForm = (req , res) =>{
    const ratingObject = req.body.RatingFoods;
    const ratingKeyArray = Object.keys(ratingObject);
    const ratingValueArray = Object.values(ratingObject);
    const itemArray = req.body.LikeFoods;
    

    let weekDay = DayinInt[ISTTime.getDay()];
        timeOfDay = 'Dinner';
        if(hours >= 3 && hours < 12)
            timeOfDay="Breakfast";
        else if (hours >= 12 && hours < 16)
            timeofDay="Lunch";
        else if (hours >= 16 && hours < 19)
            timeOfDay = "Snacks";

    const Form = new form ({
        DidLike : req.body.DidLike,
        Rating : req.body.Rating,
        Comment : req.body.Comment,
        UserId : req.body.UserId
    })
    Form.save().then((new_form,err)=>{
        if(err){
            return res.status(500).json({error:"Server Error"})
        }
        let DataArray = [] , DataArrayForItem = [];
        
        // console.log(ratingKeyArray)
        // console.log(ratingValueArray)
        // console.log(new_form._id)
        for(let index = 0; index < ratingKeyArray.length; index++){
            let temp = {
                UserId : req.body.UserId,
                FormId : new_form._id,
                timing : timeOfDay,
                day : weekDay,
                Food : ratingKeyArray[index],
                Rating : ratingValueArray[index]
            };
            DataArray.push(temp);
        }
        ratingForm.insertMany(DataArray,forceServerObjectId=true).then((ratingCard , err) =>{
            if(err) {
                return res.status(403).json({error:"Something went wrong Error", err})
            }
        });

        for(let index = 0; index < itemArray.length; index++){
            let temp = {
                UserId : req.body.UserId,
                FormId : new_form._id,
                timing : timeOfDay,
                day : weekDay,
                Food : itemArray[index]
            };
            DataArrayForItem.push(temp);
        }
        itemForm.insertMany(DataArrayForItem,forceServerObjectId=true).then((ratingCard , err) =>{
            if(err) {
                return res.status(403).json({error:"Something went wrong Error", err})
            }
        });

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
const menu = require("../models/menu");

exports.newMenu = (req , res) =>{
    const Menu = new menu ({
        fooditem : req.body.fooditem,
        timing : req.body.timing,
        day : req.body.day
    })
    Menu.save().then((new_user,err)=>{
        if(err){
           return res.status(500).json({error:"Server Error"})
        }
        
        res.status(200).json({message:"Menu save successfully"})
    })
    .catch(err=>{
        res.status(400).json({message:"save Error, Please Try Again",err})
    })
}

exports.fetchMenuDefault = (req, res) => {
    var currentTime = new Date();

    var currentOffset = currentTime.getTimezoneOffset();

    var ISTOffset = 330;   // IST offset UTC +5:30 

    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

    // ISTTime now represents the time in IST coordinates

    var hours = ISTTime.getHours()

    weekDay = 'Sunday';
    timeOfDay = 'Breakfast';

    switch (ISTTime.getDay())
    {
        case 0:
            weekDay = 'Sunday';
            break;
        case 1:
            weekDay = 'Monday';
            break;
        case 2:
            weekDay = 'Tuesday';
            break;
        case 3:
            weekDay = 'Wednesday';
            break;
        case 4:
            weekDay = "Thursday";
            break;
        case 5:
            weekDay = "Friday";
            break;
        case 6:
            weekDay = "Saturday";
            break;
    }

    console.log("fetchMenu: Day is:"+weekDay);


    if(hours >= 3 && hours < 12)
        timeOfDay="Breakfast";
    else if (hours >= 12 && hours < 16)
        timeofDay="Lunch";
    else if (hours >= 16 && hours < 19)
        timeOfDay = "Snacks";
    else timeOfDay="Dinner";

    menu.find({day : weekDay, timing : timeOfDay}).then(fetchedMenu=>res.json(fetchedMenu))
    .catch(err => console.log(err))
}

exports.fetchMenu = (req, res) => {
    isWeekDayGiven = false;
    if(req.params.weekDay)
    {
        try
        {
            isWeekDayGiven = true;
            weekDay = req.params.weekDay;
        }
        catch(err)
        {
            console.log(err);
        }
    }
    
    if(isWeekDayGiven)
    {
        menu.find({day : weekDay}).then(fetchedMenu=>res.json(fetchedMenu))
        .catch(err => console.log(err))
    }
    else this.fetchMenuDefault();
}

exports.updateMenu = (req, res)=>{
    menu.findById(req.params.id,(err,foundItem)=>{
        // console.log(req.categary.id)
        if(err)
            return res.json({message:"Error in Fecching Categary, please try again."});
        if(!foundItem)
            return res.json({message:"Item Doesn't exist, please check."});
            updatedItem = {
                fooditem : req.body.fooditem,
                timing : req.body.timing,
                day : req.body.day
            }
            // console.log(req.body)
            menu.findByIdAndUpdate(req.params.id , updatedItem , {
                new : true, 
                useFindAndModify : false 
            }).then((new_user,err)=>{
                // console.log(new_user)
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

exports.deleteMenu = (req ,res) =>{
    // console.log(req.params.id);
    menu.findById(req.params.id,(err,foundItem)=>{
        if(err)
            return res.json({message:"Error in Fecching Categary, please try again."});
        if(!foundItem)
            return res.json({message:"Categary Doesn't exist, please register."});
            menu.findByIdAndDelete(req.params.id 
                // new : true, 
                // useFindAndModify : false 
            ).then((new_user,err)=>{
                if(err){
                   return res.status(500).json({error:"Server Error"})
                }
                
                res.status(200).json({message:"SuccesFully Deleted"})
            })
            .catch(err=>{
                res.status(400).json({message:"Updation Error, Please Try Again",err})
            })
    })
}
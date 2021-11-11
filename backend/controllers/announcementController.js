const announcement = require("../models/announcement");

exports.newAnnouncement = (req, res) => {
    const Announcement = new announcement({
        userID: req.body.userID,
        image: req.body.image,
        text: req.body.text
    })
    Announcement.save().then((new_user, err) => {
            if (err) {
                return res.status(500).json({ error: "Server Error" })
            }

            res.status(200).json({ message: "Blog save successfully" })
        })
        .catch(err => {
            res.status(400).json({ message: "save Error, Please Try Again", err })
        })
}

exports.fetchAnnouncementDefaultPer = (req, res) => {
    announcement.find({ _id: req.params.id })
    .populate("userID" , "image Name")
    .then(fetchedBlog => res.status(200).json(fetchedBlog))
        .catch(err => console.log(err))
}

exports.fetchAnnouncementDefault = (req, res) => {
    announcement.find({ isDelete: false })
        .sort({
            'updatedAt': -1
        })
        .populate("userID" , "image Name")
        .then(fetchedBlog => {
            res.status(200).json(fetchedBlog)
        })
        .catch(err => console.log(err))
}

exports.updateAnnouncement = (req, res) => {
    console.log(req.body)
    announcement.findById(req.params.id, (err, foundItem) => {
        if (err)
            return res.json({ message: "Error in Fecching Categary, please try again." });
        if (!foundItem)
            return res.json({ message: "Item Doesn't exist, please check." });
        updatedItem = {
            $set: req.body
        }
        announcement.findByIdAndUpdate(req.params.id, updatedItem, {
                new: true,
                useFindAndModify: false
            }).then((new_user, err) => {
                if (err) {
                    return res.status(500).json({ error: "Server Error" })
                }

                res.status(200).json({ message: "SuccesFully Updated" })
            })
            .catch(err => {
                res.status(400).json({ message: "Updation Error, Please Try Again", err })
            })
    })
}

exports.deleteAnnouncement = (req, res) => {
    announcement.findById(req.params.id, (err, foundItem) => {
        if (err)
            return res.json({ message: "Error in Fecching Categary, please try again." });
        if (!foundItem)
            return res.json({ message: "Categary Doesn't exist, please register." });
        announcement.findByIdAndDelete(req.params.id
                // new : true, 
                // useFindAndModify : false 
            ).then((new_user, err) => {
                if (err) {
                    return res.status(500).json({ error: "Server Error" })
                }

                res.status(200).json({ message: "SuccesFully Deleted" })
            })
            .catch(err => {
                res.status(400).json({ message: "Updation Error, Please Try Again", err })
            })
    })
}
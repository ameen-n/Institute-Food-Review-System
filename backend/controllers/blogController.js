const blog = require("../models/blog");

exports.newBlog = (req, res) => {
    console.log(req)
    const Blog = new blog({
        userID: req.body.userID,
        image: req.body.image,
        text: req.body.text
    })
    Blog.save().then((new_user, err) => {
            if (err) {
                return res.status(500).json({ error: "Server Error" })
            }

            res.status(200).json({ message: "Blog save successfully" })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: "save Error, Please Try Again", err })
        })
}

exports.fetchBlogDefaultPer = (req, res) => {
    blog.find({ _id: req.params.id })
    .populate("userID" , "image Name")
    .then(fetchedBlog => res.status(200).json(fetchedBlog))
        .catch(err => console.log(err))
}

exports.fetchBlogDefault = (req, res) => {
    blog.find({ isDelete: false })
    .sort({
        'updatedAt': -1
    })
    .populate("userID" , "image Name")
        .then(fetchedBlog => {
            // console.log(fetchedBlog)
            res.status(200).json(fetchedBlog)
        })
        .catch(err => console.log(err))
}

exports.fetchBlogByUserID = (req, res) => {
    // console.log(req.params.userID)

    // var arr = []
    blog.find({ userID: req.params.userID })
    .populate("userID" , "image Name")
    .sort({
        'updatedAt': -1
    })
    .then(fetchedBlog => res.status(200).json(fetchedBlog))
        .catch(err => console.log(err))
        // res.status(200).json(arr);
}

exports.updateBlog = (req, res) => {
    console.log(req.params.id)
    blog.findById(req.params.id, (err, foundItem) => {
        if (err)
            return res.json({ message: "Error in Fecching Categary, please try again." });
        if (!foundItem)
            return res.json({ message: "Item Doesn't exist, please check." });
        updatedItem = {
            $set: req.body
        }
        blog.findByIdAndUpdate(req.params.id, updatedItem, {
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

exports.deleteBlog = (req, res) => {
    blog.findById(req.params.id, (err, foundItem) => {
        if (err)
            return res.json({ message: "Error in Fecching Categary, please try again." });
        if (!foundItem)
            return res.json({ message: "Categary Doesn't exist, please register." });
        blog.findByIdAndDelete(req.params.id
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
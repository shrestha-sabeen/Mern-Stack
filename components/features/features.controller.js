const featuresQuery = require("./features.query")

function createfeature(req, res, next) {

    if (req.files) {
        if (req.files.thumbnailImage) {
            req.body.thumbnailImage = req.files.thumbnailImage[0].filename;
        }
        if (req.files.galleryImages) {
            var myImages = [];
            req.files.galleryImages.forEach(function (item, index) {
                myImages.push(item.filename)
            })
            req.body.galleryImages = myImages
        }
    }

    if (req.fileError) {
        return next({ msg: "Invalid File Format" })
    }


    req.body.createdBy = req.loggedInUser;
    featuresQuery.insertfeature(req.body)
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (err) {
            next(err);
        })
}

function getAllfeatures(req, res, next) {
    featuresQuery.findAllfeatures()
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (err) {
            next(err);
        })
}

function getSinglefeature(req, res, next) {
    featuresQuery.findSinglefeature(req.params.id)
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (err) {
            next(err);
        })
}

function updatedfeatures(req, res, next) {
    req.body.modifiedBy = req.loggedInUser
    featuresQuery.updatedfeatures(req.params.id, req.body)
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (err) {
            next(err);
        })
}

function deletefeatures(req, res, next) {
    featuresQuery.removefeatures(req.params.id)
        .then(function (data) {
            res.status(200).json({ msg: "USERS DELETED !!!! " })

        })
        .catch(function (err) {
            next(err);
        })
}

module.exports = {
    createfeature,
    getAllfeatures,
    getSinglefeature,
    updatedfeatures,
    deletefeatures
}
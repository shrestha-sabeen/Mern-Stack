const roomQuery = require("./room.query");
const roomMapping = require("./../../helpers/room.mapping");

function createRoom(req, res, next) {

    if (req.fileError) {
        return next({ msg: "Invalid  File Format" })
    }

    if (req.files) {
        if (req.files.thumbnailImage) {
            req.body.thumbnailImage = req.files.thumbnailImage[0].filename;
        }
        if (req.files.coverImage) {
            req.body.coverImage = req.files.coverImage[0].filename;
        }
        if (req.files.galleryImages) {
            var myImages = [];
            req.files.galleryImages.forEach(function (item, index) {
                myImages.push(item.filename)
            })
            req.body.galleryImages = myImages;
        }
    }

    req.body.createdBy = req.loggedInUser;
    roomQuery.insertRoom(req.body)
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            next(err);
        })
}

function getAllRooms(req, res, next) {
    var condition = {};
    roomQuery.findAllRooms(condition)
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            next(err);
        })
}

function getSingleRoom(req, res, next) {
    roomQuery.findsingleRoom(req.params.id)
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            next(err);
        })
}

function updateRoom(req, res, next) {
    console.log('req.files', req.files);
    console.log('req.body', req.body);

    if (req.fileError) {
        return next({ msg: "Invalid  File Format" })
    }

    if (req.files) {
        if (req.files.thumbnailImage) {
            req.body.thumbnailImage = req.files.thumbnailImage[0].filename;
        }
        if (req.files.coverImage) {
            req.body.coverImage = req.files.coverImage[0].filename;
        }
        if (req.files.galleryImages) {
            var myImages = [];
            req.files.galleryImages.forEach(function (item, index) {
                myImages.push(item.filename)
            })
            req.body.galleryImages = myImages;
        }
    }

    req.body.modifiedBy = req.loggedInUser;
    roomQuery.updateRoom(req.params.id, req.body)
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (err) {
            next(err);
        })
}

function deleteRoom(req, res, next) {
    roomQuery.deleteRoom(req.params.id)
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            next(err);
        })
}

function getRoomsbyUserId(req, res, next) {
    roomQuery.findRoomsbyUserId(req.loggedInUser)
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            next(err);
        })
}

function searchByPost(req, res, next) {
    var searchCondition = {};
    searchCondition = roomMapping(searchCondition, req.body)
    roomQuery.findAllRooms(searchCondition)
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            next(err);
        })
}

function searchByGet(req, res, next) {
    var searchCondition = {};
    searchCondition = roomMapping(searchCondition, req.query)
    roomQuery.findAllRooms(searchCondition)
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            next(err);
        })
}

module.exports = {
    createRoom,
    getAllRooms,
    getSingleRoom,
    updateRoom,
    deleteRoom,
    getRoomsbyUserId,
    searchByPost,
    searchByGet
}
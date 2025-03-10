const Venue = require('../models/venue');
const Deal = require('../models/deal');
const slugify = require('slugify');

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const createVenue = (req, res) => {
    const { venueName, address, location, category, price, description } = req.body;
    console.log("in cretae venue",req.body);
    const ownerInfo = {
        ownerName: req.user.fullName,
        contactNumber: req.user.contactNumber
    }

    let venuePictures = [];
    if (req.files.length > 0) {
        venuePictures = req.files.map((file) => {
            return { img: file.filename };
        })
    }

    const venue = new Venue({
        venueName: venueName,
        slug: slugify(venueName),
        address: address,
        description: description,
        location: location,
        category: category,
        price: price,
        venuePictures,
        ownerId: req.user.id,
        ownerInfo: ownerInfo
    });
    console.log(venue);
    venue.save((error, _venue) => {
        if (error) return res.status(400).json({ msg: `While saving venue something went wrong`, error });
        if (_venue) return res.status(201).json({ _venue, files: req.files });
    })
}

const getVenueByVenueId = (req, res) => {
    const { venueId } = req.params;
    if (venueId) {
        Venue.findOne({ _id: venueId })
            .exec((error, _venue) => {
                if (error) return res.status(400).json({ msg: `Something went wrong`, error });
                if (_venue) res.status(200).json({ _venue });
            })
    } else {
        return res.status(400).json({ msg: `Venue dosen't exit` });
    }
}

const getAllVenuesByOwnerId = async (req, res) => {
    const { ownerId } = req.params;
    if (ownerId) {
        Venue.find({ ownerId: ownerId })
            .exec((error, _allvenues) => {
                if (error) return res.status(400).json({ msg: `Something went wrong`, error });
                if (_allvenues) res.status(200).json({ _allvenues });
            })
    }
}

const getAllVenues = async (req, res) => {
    const allVenues = await Venue.find({});
    if (allVenues) return res.status(200).json({ allVenues });
    else return res.status(400).json({ msg: `Something happend while fectching all venues` });
}

const checkAvailability = (req, res) => {
    const { venueId, eventDate } = req.body;
    Deal.find({ venueId: venueId, eventDate: eventDate })
        .exec((error, _deal) => {
            if (error) return res.status(400).json({ msg: "Something went wrong", error });
            if (isEmpty(_deal)) {
                return res.status(200).json({ msg: "No deal found, Available" });
            } else {
                return res.status(200).json({ msg: "Venue is booked for date, choose another date" })
            }
        })
}

module.exports = {
    createVenue,
    getVenueByVenueId,
    getAllVenuesByOwnerId,
    getAllVenues,
    checkAvailability
}
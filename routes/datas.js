var express = require('express');
var router = express.Router();
const DATA       = require('../models/data')
const bcrypt     = require('bcryptjs');
const jwt        = require('jsonwebtoken');

/* GET users listing. */

//SEARCH
router.post('/search', (req, res) => {
        DATA.find({ $or: [{letter: req.body.letter , frequency: req.body.freq},{letter: req.body.letter},{frequency: req.body.freq}] }).then((item) => {

            console.log(item);
                res.status(201).json([{
                    _id : item[0]._id,
                    letter : item[0].letter,
                    frequency : item[0].frequency
                }]);

        }).catch(err => console.log(err))
});

//READ
router.get('/', (req, res) => {
    DATA.find({}).then((item) => {
        res.status(200).json(item);
    }).catch(err => console.log(err))

});

//EDIT
router.put('/:id', (req, res) => {
    DATA.findOneAndUpdate(
        {_id :req.params.id},
        {letter: req.body.letter, frequency: Number(req.body.freq)}).then((dataUpdate) => {
            console.log(dataUpdate);
            res.status(201).json({
                success: true,
                message : 'data have been update',
                data : {
                    _id : dataUpdate._id,
                    letter : dataUpdate.letter,
                    frequency : dataUpdate.frequency
                }
            })
        }).catch((err) => {
            res.json({
                success : false
            })
        })
    });

    //ADD
    router.post('/', (req, res) => {
        let data = new DATA({});

        data.letter = req.body.letter
        data.frequency = Number(req.body.freq)

        data.save((err)=> {
            if (err) return res.send(err);

            res.status(201).json({
                success : true,
                message : 'data have been added',
                data : {
                    _id : data._id,
                    letter : req.body.letter,
                    frequency : Number(req.body.freq)
                }
            })
        })
    });

    //DELETE
    router.delete('/:id', (req, res) => {
        DATA.findOneAndDelete({_id: req.params.id}).then((dataRemoved) => {
            res.status(201).json({
                success:true,
                message: 'data have been deleted',
                data: {
                    _id : dataRemoved._id,
                    letter : dataRemoved.letter,
                    frequency : dataRemoved.frequency,
                }
            })
        }).catch((err) => {
            res.json({
                success : false
            })
        })
    })

    //FIND
    router.get('/:id', (req, res) => {
        DATA.findOne({_id: req.params.id}).then((dataFind) => {
            res.status(200).json({
                success:true,
                message: 'data found',
                data: {
                    _id : dataFind._id,
                    letter : dataFind.letter,
                    frequency : dataFind.frequency
                }
            })
        }).catch((err) => {
            res.json({
                success : false
            })
        })
    })

    module.exports = router;

    [
    {
        "_id": "5c7a204a1c539a17ebb1b83b",
        "letter": "2017-12-31T00:00:00.000Z",
        "frequency": 1.2,
        "__v": 0
    },
    {
        "_id": "5c7a22a133a564199233c95e",
        "frequency": 1.2,
        "__v": 0
    },
    {
        "_id": "5c7a239c1335191a31ba0b2b",
        "letter": "2019-03-02T06:33:00.025Z",
        "frequency": 1.2,
        "__v": 0
    },
    {
        "_id": "5c7a27ebfdfc811b43f1d964",
        "letter": "2019-03-02T06:51:23.487Z",
        "frequency": 1.2,
        "__v": 0
    },
    {
        "_id": "5c7a2801fdfc811b43f1d965",
        "letter": "2019-03-02T06:51:45.161Z",
        "frequency": 1.5,
        "__v": 0
    },
    {
        "_id": "5c7a280ffdfc811b43f1d966",
        "letter": "2018-02-02T00:00:00.000Z",
        "frequency": 1.5,
        "__v": 0
    }
]

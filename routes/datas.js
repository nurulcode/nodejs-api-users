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


        console.log(req.body);


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

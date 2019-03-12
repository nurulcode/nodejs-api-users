var express = require('express');
var router = express.Router();
const DATE = require('../models/datadate')
var moment = require('moment');
const helpers    = require('../helpers/util');

//SEARCH
router.post('/search', (req, res) => {
    console.log(moment(req.body.letter).format('YYYY-MM-DD'));
    DATE.find({ $or: [{letter: moment(req.body.letter).format('YYYY-MM-DD') , frequency: Number(req.body.freq)},{letter: moment(req.body.letter).format('YYYY-MM-DD')},{frequency: Number(req.body.freq)}] }).then((item) => {

        console.log(item);
        res.status(201).json([{
            _id : item[0]._id,
            letter : moment(item[0].letter).format('YYYY-MM-DD'),
            frequency : item[0].frequency
        }]);

    }).catch(err => console.log(err))
});


//READ
router.get('/', function(req, res, next) {
     let dataList = []
    DATE.find({}).then((getData) => {
        for (let item of getData) {
            dataList.push({
                _id: item._id,
                letter: moment(item.letter).format("YYYY-MM-DD"),
                frequency: Number(item.frequency)
            })
        }
        res.status(200).json(dataList);
    }).catch( err => console.log(err));
});


//EDIT
router.put('/:id', (req, res) => {
    DATE.findOneAndUpdate(
        {_id :req.params.id},
        {letter: req.body.letter, frequency: Number(req.body.freq)}).then((dataUpdate) => {
            DATE.find({_id :dataUpdate._id}).then((item) => {
                res.status(201).json({
                    success: true,
                    message : 'data have been update',
                    data : {
                        _id : item[0]._id,
                        letter :  moment(item[0].letter).format('YYYY-MM-DD'),
                        frequency : item[0].frequency
                    }
                })
            }).catch((err) => {
                res.json({
                    success : false
                })
            })
        }).catch((err) => {
            res.json({
                success : false
            })
        })
    });

    //ADD
    router.post('/', (req, res) => {
        let data = new DATE({});

        data.letter = req.body.letter !== '' ? req.body.letter : Date.now()
        data.frequency = Number(req.body.freq)

        data.save((err)=> {
            if (err) return res.send(err);

            res.status(201).json({
                success : true,
                message : 'data have been added',
                data : {
                    _id : data._id,
                    letter : moment(data.letter).format('YYYY-MM-DD'),
                    frequency : Number(req.body.freq)
                }
            })
        })
    });

    //DELETE
    router.delete('/:id', ( req, res) => {
        DATE.findOneAndDelete({ _id : req.params.id }).then((dataRemoved) => {
            res.status(201).json({
                success : true,
                message : 'data have been deleted',
                data: {
                    _id : dataRemoved._id,
                    letter : moment(dataRemoved.letter).format('YYYY-MM-DD'),
                    frequency : dataRemoved.frequency
                }
            })
        })
    })

    //FIND
    router.get('/:id', (req, res) => {
        DATE.findOne({_id : req.params.id }).then((dataFind) => {
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

var express = require('express');
var router = express.Router();
const MAPS = require('../models/map')

//SEARCH
router.post('/search', (req, res) => {
    MAPS.find({title: req.body.title }).then((searchData) => {
        console.log(searchData);
        res.status(200).json([{
            _id : searchData[0]._id,
            title : searchData[0].title,
            lat : Number(searchData[0].lat),
            lng : Number(searchData[0].lng)
        }]);

    }).catch(err => console.log(err))
});

//READ
router.get('/', function(req, res, next) {
    MAPS.find({}).then((getData) => {
        res.status(200).json(getData);
    }).catch( err => console.log(err));
});


//EDIT
router.put('/:id', (req, res) => {
    MAPS.findOneAndUpdate(
        {_id :req.params.id},
        {
            title: req.body.title,
            lat : Number(req.body.lat),
            lng : Number(req.body.lng) }).then((dataUpdate) => {
                console.log(dataUpdate);
                MAPS.find({_id :dataUpdate._id}).then((item) => {
                    res.status(201).json({
                        success: true,
                        message : 'data have been update',
                        data : {
                            _id : item[0]._id,
                            title : item[0].title,
                            lat : Number(item[0].lat),
                            lng : Number(item[0].lng)
                        }
                    })
                }).catch((err) => {
                    res.json({
                        success : false,
                        message : 'find'
                    })
                })
            }).catch((err) => {
                res.json({
                    success : false,
                    message : 'update'
                })
            })
        });

        //ADD
        router.post('/', (req, res) => {
            let data = new MAPS({});

            data.title = req.body.title
            data.lat = Number(req.body.lat)
            data.lng = Number(req.body.lng)

            data.save((err)=> {
                if (err) return res.send(err);

                res.status(201).json({
                    success : true,
                    message : 'data have been added',
                    data : {
                        _id : data._id,
                        title : data.title,
                        lat : Number(data.lat),
                        lng : Number(data.lng)
                    }
                });
            });
        });

        //DELETE
        router.delete('/:id', ( req, res) => {
            MAPS.findOneAndDelete({ _id : req.params.id }).then((dataRemoved) => {
                res.status(201).json({
                    success : true,
                    message : 'data have been deleted',
                    data: {
                        _id : dataRemoved._id,
                        title : dataRemoved.title,
                        lat : Number(dataRemoved.lat),
                        lng : Number(dataRemoved.lng)
                    }
                })
            })
        })

        //FIND
        router.get('/:id', (req, res) => {
            MAPS.findOne({_id : req.params.id }).then((dataFind) => {
                res.status(200).json({
                    success:true,
                    message: 'data found',
                    data: {
                        _id : dataFind._id,
                        title : dataFind.title,
                        lat : Number(dataFind.lat),
                        lng : Number(dataFind.lng)
                    }
                })
            }).catch((err) => {
                res.json({
                    success : false
                })
            })
        })


        module.exports = router;

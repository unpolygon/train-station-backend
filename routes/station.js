const express = require('express');
const router = express.Router();

var station = [{dest: 0, status: 'green', train: 0},{dest: 1, status: 'green', train: 1}]
var train  = [{dest: 0,status: 'stay'},{dest: 1,status: 'stay'}];

var initStation = [{dest: 0, status: 'green', train: 0},{dest: 1, status: 'green', train: 1}];
var initTrain = [{dest: 0,status: 'stay'},{dest: 1,status: 'stay'}];

router.get('/arrived/:train',(req,res) => {
    //train arrived
    let trainParams = req.params.train;
    let currentTrain = train[trainParams];
    let dest = station[currentTrain.dest];
    if(dest.status !== 'red'){
        train[trainParams] = {dest: currentTrain.dest, status: 'error'};
    }else{
        dest.status = 'green';
        dest.train = trainParams;
        train[trainParams].status = 'stay';
    }
    res.json({station:dest,train: train[trainParams]});
});

router.route('/release/:dest').get((req, res) => {
    //station release train
    let dest = req.params.dest;
    let currentStation = station[dest];
    if(currentStation.status === 'green'){
        //1 minute go
        currentStation.status = 'yellow';
        let currentTrain = train[currentStation.train];
        currentTrain.status = 'going';
        currentTrain.dest = +!currentTrain.dest;
    }else if(currentStation.status === 'yellow'){
        currentStation.status = 'red';
    }
    res.json({station:station[dest] ,train:train});
});


router.get('/',(req,res) => {
    //update data
    res.json({station:station,train:train});
});

router.get('/reset',(req,res) => {
    //reset data
    station = {...initStation};
    train = {...initTrain};
    res.json({station:station,train:train});
});


module.exports = router;

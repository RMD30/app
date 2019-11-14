const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const urlEncoded = bodyParser.json();

const cors = require('cors');
app.use(cors());


mongoose.connect(
    "mongodb+srv://RMD:Admin14344@cluster0-diyzv.mongodb.net/test?retryWrites=true&w=majority",{ 
    useUnifiedTopology: true,useNewUrlParser: true 
    }
);

const User = mongoose.model('user',{
    name: String,
    age: Number
});

app.use(express.static(__dirname + '/dist/app'));
app.use(bodyParser.json());

app.get('/',(req, res) => {
    res.sendFile(__dirname + 'dist/app/index.html');
});

app.get('/user', (req, res) => {
    User.find({},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.post('/user', urlEncoded, (req, res) => {
    var user = new User({
        name: req.body.name,
        age: req.body.age,
    });
    user.save((err, data) => {
        if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.put('/user/:id', urlEncoded, (req, res) => {
    User.updateOne({_id:req.params.id},{
        name: req.body.name,
        age: req.body.age
    }, (err, data) => {
        if(err) res.json({msg:'Invalid request'});
            res.json(data);
    });
});

app.delete('/user/:id', (req, res) => {
    User.deleteOne({_id:req.params.id},(err,data) => {
    if(err) res.json({msg:'Invalid Request'});
        res.json(data);
    });
});

const PORT = process.env.PORT || 80;

app.listen(PORT,() => {
    console.log(`Serve running at port ${PORT}`);
});
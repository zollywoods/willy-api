//REST API demo in Node.js
var express = require('express'); // requre the express framework
var app = express();
var fs = require('fs'); //require file system object

var Web3 = require('web3');
var provider = "https://rinkeby.infura.io/v3/b06292d8ce5b481cadf17d9b78370b54"
var web3Provider = new Web3(provider);
var web3 = new Web3(web3Provider);
const MyContract = require('../contract/MyContract.json');
// var willyContract = new web3.eth.Contract(MyContract,"0xdC7c07adf044090770F0199f60b910aAE93d0f35" );
// var willyContract = wContract.at('b06292d8ce5b481cadf17d9b78370b54');
let supply = 0;

port =  process.env.PORT || '0.0.0.0'
const host = '0.0.0.0';


web3.eth.getBlockNumber().then((result) => {
    console.log("Latest Ethereum Block is ",result);
  });

  async function run(){
    var willyContract = new web3.eth.Contract(MyContract,"0xdC7c07adf044090770F0199f60b910aAE93d0f35" );
    supply = await willyContract.methods.totalSupply().call();
    console.log("here is the totalSupply: ", supply);
  }

  run();

// Endpoint to Get a list of users
app.get('/clowns/:id', function(req, res){
    console.log("the req params:  ", req.params['id'])
    fs.readFile("metadata" + "/" + req.params['id'] + ".json", 'utf8', function(err, data){
        if( req.params['id'] > (supply  - 1)){
            const notRevealed = "this NFT has not been minted yet, check in later to see it"
            res.end(notRevealed); // you can also use res.send()
        }
        else{
            // console.log(data);
            res.end(data); // you can also use res.send()    
        }
    });
})

//lets see

// Create a server to listen at port 8080
var server = app.listen((process.env.PORT || 80), function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at 8080", host, port)
})

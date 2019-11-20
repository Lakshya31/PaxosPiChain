const events = require('events');
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
const random = require('random');
const Blockchain = require("./Blockchain/Blockchain")
const {ValueTxn} = require("./Blockchain/Transaction")
const uuid = require("uuid/v1")

const quickChain = new Blockchain()
const mediumChain = new Blockchain()
const slowChain = new Blockchain()

// console.log(pichain.chain)
// const transact = new ValueTxn(uuid(),"sidharth","lakshya","data",new Date().getTime())
// pichain.addTransaction(transact)
// const transact1 = new ValueTxn(uuid(),"sidharth","lakshya","data",new Date().getTime())
// pichain.addTransaction(transact1)

// pichain.minePendingTxns()

// console.log(pichain.chain[1].txns)

const slow_node = new events.EventEmitter();
const medium_node = new events.EventEmitter();
const quick_node = new events.EventEmitter();

var buffer = ""

quick_transaction = () => {

    if(buffer !== ""){
        let probability = random.float(min = 0, max = 1);
    
        if(probability < 0.5){
            let value = buffer.split(" ");
            buffer = "";
            if(value.length !== 3){
                throw new error("Type it Properly please!")
            }
            console.log("Quick",value);
            const transaction = new ValueTxn(uuid(),value[0],value[1],value[2],new Date().getTime())
            quickChain.addTransaction(transaction)
            quickChain.minePendingTxns()
            // console.log(quickChain.getLatestBlock())
            mediumChain.recieveNewBlock(quickChain.getLatestBlock())
            slowChain.recieveNewBlock(quickChain.getLatestBlock())
            setTimeout(()=>{
                console.log("\n Medium Chain : \n",mediumChain.getLatestBlock())
            console.log("\n Quick Chain : \n",quickChain.getLatestBlock())
            console.log("\n Slow Chain : \n",slowChain.getLatestBlock())
            },200)
            
        }
    }
    
    
}

medium_transaction = () => {
    
    if(buffer !== ""){
        var probability = random.float(min = 0, max = 1);
    
        if(probability < 0.5){
            let value = buffer.split(" ");
            buffer = "";
            if(value.length !== 3){
                throw new error("Type it Properly please!")
            }
            console.log("Medium",value);
            const transaction = new ValueTxn(uuid(),value[0],value[1],value[2],new Date().getTime())
            mediumChain.addTransaction(transaction)
            mediumChain.minePendingTxns()
            quickChain.recieveNewBlock(mediumChain.getLatestBlock())
            slowChain.recieveNewBlock(mediumChain.getLatestBlock())
            setTimeout(()=>{
                console.log("\n Medium Chain : \n",mediumChain.getLatestBlock())
            console.log("\n Quick Chain : \n",quickChain.getLatestBlock())
            console.log("\n Slow Chain : \n",slowChain.getLatestBlock())
            },200)
        }
    }
    
    
}

slow_transaction = () => {
    
    if(buffer !== ""){
        let value = buffer.split(" ");
        buffer = "";
        if(value.length !== 3){
            throw new error("Type it Properly please!")
        }
        console.log("Slow",value);
        const transaction = new ValueTxn(uuid(),value[0],value[1],value[2],new Date().getTime())
            slowChain.addTransaction(transaction)
            slowChain.minePendingTxns()
            quickChain.recieveNewBlock(slowChain.getLatestBlock())
            mediumChain.recieveNewBlock(slowChain.getLatestBlock())
            setTimeout(()=>{
                console.log("\n Medium Chain : \n",mediumChain.getLatestBlock())
            console.log("\n Quick Chain : \n",quickChain.getLatestBlock())
            console.log("\n Slow Chain : \n",slowChain.getLatestBlock())
            },200)  
        }
    
}

slow_node.on('transaction', slow_transaction);
medium_node.on('transaction', medium_transaction);
quick_node.on('transaction', quick_transaction);

process.stdin.setRawMode(true);

process.stdin.on('keypress', (letter, key) => {
    if(key.name == 'tab'){
        process.exit();
    }
    else if(key.name == 'return'){
        process.stdout.write("\n");
        setTimeout(() => quick_node.emit('transaction'), 0);
        setTimeout(() => medium_node.emit('transaction'), 1000);
        setTimeout(() => slow_node.emit('transaction'), 2000);
    }
    else if(key.name == 'space'){
        buffer=buffer+' ';
        process.stdout.write(" ");
    }
    else{
        process.stdout.write(key.name);
        buffer = buffer + key.name
    }
});
const events = require('events');
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
const random = require('random');

const slow_node = new events.EventEmitter();
const medium_node = new events.EventEmitter();
const quick_node = new events.EventEmitter();

var buffer = ""

quick_transaction = () => {

    if(buffer !== ""){
        var probability = random.float(min = 0, max = 1);
    
        if(probability < 0.5){
            console.log("Quick",buffer)
            buffer = ""
        }
    }
    
    
}

medium_transaction = () => {
    
    if(buffer !== ""){
        var probability = random.float(min = 0, max = 1);
    
        if(probability < 0.5){
            console.log("Medium",buffer)
            buffer = ""
        }
    }
    
    
}

slow_transaction = () => {
    
    if(buffer !== ""){
        console.log("Slow",buffer)
        buffer = ""
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
        process.stdout.write("\n")
        setTimeout(() => quick_node.emit('transaction'), 0);
        setTimeout(() => medium_node.emit('transaction'), 1000);
        setTimeout(() => slow_node.emit('transaction'), 2000);
    }

    else{
        process.stdout.write(key.name);
        buffer = buffer + key.name
    }
});

 
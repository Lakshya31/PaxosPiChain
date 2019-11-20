let Block = require('./Block')
let _ = require("lodash")
let {ValueTxn} = require('./Transaction')
class BlockChain{
    constructor(){
        this.chain=[this.addGenesisBlock()]
        //proof of work thing
        this.difficulty=2
        //txnPool
        this.PendingTxns=[]
        //proof of work : miner reward
        this.mReward=10;
    }
    addGenesisBlock(){
        return new Block(0,"0",0,"12/11/13",[],[],[],"gen_prof")
    }
    // addBlock(block){
    //     block.prevHash = this.getLatestBlock().currHash;
    //     // block.currHash=block.calc_Hash().toString()
    //     //proofof work
    //     block.mineBlock(this.difficulty);
    //     this.chain.push(block);
    // }
    addTransaction(transaction){
        if(transaction.type==="ValueTransfer" || transaction.type==="DataTransfer")
        {if(!transaction.from || !transaction.to){
            throw new Error('Transaction must include from and to address');
        }
    }else{
        if(!transaction.owner){
            throw new Error('Transaction must include fromaddress');
        }
    }
        if(!transaction.isValid()){
            throw new Error('Cannot add invalid transaction to chain');
        }
    
        this.PendingTxns.push(transaction);
    }
    minePendingTxns(sAddress){
        let block = new Block(this.chain.length,"",this.chain[this.chain.length-1].total_txn,new Date().getTime(),this.PendingTxns)
        block.mineBlock(this.difficulty)
        block.prevHash = this.chain[this.chain.length-1].currHash
        this.chain.push(block)
        this.PendingTxns= [
            new ValueTxn(null,sAddress, this.mReward)
        ]
    }
    recieveNewBlock(block){
        this.chain.push(block)
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1]
    }
    getBalanceOfAddress(address){
        let balance = 0;
        for(const block of this.chain){
            for(const trans of block.txns){
                if(trans.from === address){
                    balance -= trans.amount;
                }
                if(trans.to === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }
    isChainValid(){
        for(let i=1;i<this.chain.length;++i){
            let currBlock = this.chain[i]
            let prevBlock = this.chain[i-1]
            
            if(currBlock.currHash!==currBlock.calc_Hash().toString()){
                console.log("1")
                console.log(currBlock.currHash)
                console.log(currBlock.calc_Hash().toString())
                return false
            }

            if(currBlock.prevHash!==prevBlock.currHash){
                console.log("2")
                return false
            }
        }
        if(!_.isEqual(this.chain[0],this.addGenesisBlock())){
            console.log(this.chain[0])
            console.log(this.addGenesisBlock())
            console.log("3")
            return false
        }
        if (!currentBlock.hasValidTransactions()) {
            return false;
        }
        return true
    }

}
module.exports = BlockChain
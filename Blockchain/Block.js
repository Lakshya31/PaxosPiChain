let sha256 = require("crypto-js/sha256");
class Block{
    constructor(lastLen,last_hash="",total_txn=0,timeStamp,txns=[],validator_set=[],signatures=[],proof=""){
        this.height=lastLen+1;
        this.currHash="DASGERGDV545454s5df8sd68c4sd8c48sadc54fd4s5c158486c8s8we"
        this.prevHash=last_hash;
        this.total_txn=total_txn+txns.length;
        this.curr_txns=txns.length;
        this.proof=proof;
        this.timeStamp=timeStamp
        this.txns=txns
        this.validators=validator_set;
        this.signatures=signatures;
        //proof of work thing remove later
        this.nonce=0
    }
    calc_Hash(){
        //remove nonce later
        return sha256(this.nonce+this.prevHash+this.height+this.total_txn+this.curr_txns+this.proof+this.timeStamp+JSON.stringify(this.txns)+JSON.stringify(this.validators)+JSON.stringify(this.signatures))
    }
    mineBlock(difficulty) {
        // Keep changing the nonce until the hash of our block starts with enough zero's.
        while (this.currHash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
          this.nonce++;
          this.currHash = this.calc_Hash().toString(); 
        }
          
        console.log("BLOCK MINED: " + this.currHash);
    }
    hasValidTransactions(){
        for(const tx of this.txns){
            if(!tx.isValid()){
                return false;
            }
        }
    
        return true;
    }
}

module.exports=Block
const moongose=require('mongoose');
const mongoURI="mongodb://localhost:27017/SIH" 

//An API URI (Uniform Resource Identifier) is a unique address that identifies a specific piece of information within an API and allows you to locate and interact with it

const connectToMongo=()=>{
    moongose.connect(mongoURI).then(()=>{ 
        console.log("MONGO DB IS SUCCESSFULLY CONNECTED")
    }).catch(()=>{
        console.log("SOME ERROR OCCURED WHILE CONNECTING TO MONGO DB ");
    });
}
module.exports=connectToMongo;
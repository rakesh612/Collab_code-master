import mongoose from "mongoose";
import { stringify } from "uuid";

const newRoomSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
     creator:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    members:{   //array of user objects
        type:[
            {
                type:mongoose.Types.ObjectId,
                ref:'User'
            }
        ],
        default:[]
    },
    currentCode:{
        type:String,
        default:"//start your code here"
    },
    language:{
        type:String,
        default:"java"
    }
},{timestamps:true});



newRoomSchema.pre('save', function (next) {
    if (this.isNew) { 
        this.members = [this.creator];
    }
    next();
});


export default mongoose.model("Room",newRoomSchema);

// Runs before saving the document.
// If it’s a new room (this.isNew === true), it automatically:
// Puts the creator inside the members array.
// That way, the room creator is also a participant without requiring extra logic.
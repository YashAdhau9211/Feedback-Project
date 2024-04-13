import mongoose , {Schema, Document} from "mongoose";
// import { Content } from "next/font/google";

export interface Message extends Document{
    content: string;
    createdAt: Date 
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


export interface User extends Document{
    usrename: string;
    email: string;
    password: string;
    isVerify: boolean;
    verifycode: string;
    verifyCodeExpriry: Date;
    isAcceptingMessage: boolean;
    messages: Message[]
}



const UserSchema: Schema<User> = new Schema({
    usrename: {
        type: String,
        required: [true ,"Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true ,"Email is required"],
        unique: true,
        match: [ /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
        , "Please use a vaild email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    verifycode: {
        type: String,
        required: [true, "Verifycode is required"]
    },
    verifyCodeExpriry: {
        type: Date,
        required: [true, "Verify code Expriry is required"]
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: false
    },
    messages: [MessageSchema]
})



const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User" , UserSchema))

export default UserModel;
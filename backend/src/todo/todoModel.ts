import mongoose from "mongoose";
import {Status, type ITodo } from "./todoTypes.ts";

const todoSchema = new mongoose.Schema<ITodo>({
    task: {
        type: String
    },
    deadline: {
        type: String
    },
    status: {
        type: String,
        enum: [Status.Completed, Status.Pending],
        default: Status.Pending
    }
})

export const todoModel = mongoose.model("Todo", todoSchema)


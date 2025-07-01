import mongoose, { Schema, Document } from "mongoose";


export interface ITask extends Document { // esto es de typesScript
    name: string;
    description: string;
}

export const TaskSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
})

const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task
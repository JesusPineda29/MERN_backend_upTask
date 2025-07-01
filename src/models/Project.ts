import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./task";


export interface IprojectType extends Document { // esto es de typesScript
    projectName: string;
    clientName: string;
    description: string;
    tasks: PopulatedDoc<ITask & Document>[]
}


const ProjectSchema: Schema = new Schema({ // esto es de Mongoose
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ]
}, {timestamps: true})


const Project = mongoose.model<IprojectType>('Project', ProjectSchema)
export default Project

import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./Task";
import { IUser } from "./User";



export interface IprojectType extends Document { // esto es de typesScript
    projectName: string;
    clientName: string;
    description: string;
    tasks: PopulatedDoc<ITask & Document>[]
    manager: PopulatedDoc<IUser & Document>
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
    ],
    manager: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


const Project = mongoose.model<IprojectType>('Project', ProjectSchema)
export default Project

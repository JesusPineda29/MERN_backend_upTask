import mongoose, { Schema, Document } from "mongoose";

export type projectType = Document & { // esto es de typesScript
    projectName: string;
    clientName: string;
    description: string;
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
    }
})

const Project = mongoose.model<projectType>('Project', ProjectSchema)

export default Project

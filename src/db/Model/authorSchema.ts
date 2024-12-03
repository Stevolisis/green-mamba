import { Schema, InferSchemaType, model, models } from 'mongoose';

const AuthorSchema = new Schema({
    walletAddress: { 
        type: String, 
        required: true, 
        unique: true ,
    },
    name: { 
        type: String, 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String
    },
},{
    timestamps:true
});

type AuthorType = InferSchemaType<typeof AuthorSchema>;

const Author = models.Author || model<AuthorType>('Author', AuthorSchema);
export default Author;

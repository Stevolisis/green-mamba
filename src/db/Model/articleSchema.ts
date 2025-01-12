import { Schema, InferSchemaType, model, models, Model } from 'mongoose';

// Define the schema for the Article model
const ArticleSchema = new Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    slug: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    img: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    content: { 
      type: String, 
      required: true 
    },
    author: { 
      type: Schema.Types.ObjectId, 
      ref: 'Author',
      required: true,
    },
    tags: [{ 
      type: String 
    }],
    gifts: { 
      type: Number, 
      required: true 
    },
  },
  {
    timestamps: true,
  }
);

type ArticleType = InferSchemaType<typeof ArticleSchema>;

const Article = models.Article || model<ArticleType>('Article', ArticleSchema);
export default Article;

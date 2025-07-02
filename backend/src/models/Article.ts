import {Schema, model, Document} from "mongoose"

export interface IArticle extends Document {
  title: string,
  url: string,
  source: string,
  publishedAt: Date,
  description: string;
  imageUrl: string;
}

const ArticleSchema: Schema = new Schema({
  title: {type: String, required: true},
  url:{type: String, required: true, unique: true},
  source: {type: String, required: true},
  publishedAt: {type: Date, required: true},
  description: {type: String, default: ""},
  imageUrl: {type: String, required: true}
}, {
  timestamps: true,
  collection: "articles"
}); // Automatically add createdAt & updatedAt timestamps


// Create an index on source and publishedAt (newest first)
ArticleSchema.index({source: 1, publishedAt: -1});

const Article = model<IArticle>("Article", ArticleSchema)


export default Article;
import {Schema, model, Document} from "mongoose"

export interface IArticle extends Document {
  title: string,
  url: string,
  source: string,
  publicationDate: string,
  description: string;
}

const ArticleSchema: Schema = new Schema({
  title: {type: String, required: true},
  url:{type: String, required: true, unique: true},
  source: {type: String, required: true},
  pubDate: {type: Date, required: true},
  description: {type: String, default: ""},
  imageURL: {type: String, requires: true}
}, {timestamps: true}); // Automatically add createdAt & updatedAt timestamps


// Create an index on source and pubDate(newest first)
ArticleSchema.index({source: 1, pubDate: -1});

const Article = model<IArticle>("Article", ArticleSchema)


export default Article;
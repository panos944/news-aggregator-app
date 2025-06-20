import {Schema, model, Document} from "mongoose"

// Article document structure

export interface IArticle extends Document {
  title: string,
  link: string,
  source: string,
  pubDate: string,
  creater: string,
  contentSnipet: string;
}

const ArticleSchema: Schema = new Schema({
  title: {type: String, required: true},
  link:{type: String, required: true, unique: true},
  source: {type: String, required: true},
  pubDate: {type: Date, required: true},
  creator: {type:String, default: "N/A"},
  contentSnipet: {type: String, default: ""}
}, {timestamps: true}); // Automatically add createdAt & updatedAt timestamps


// Create an index on source and pubDate(newest first)
ArticleSchema.index({source: 1, pubDate: -1});

const Article = model<IArticle>("Article", ArticleSchema)


export default Article;
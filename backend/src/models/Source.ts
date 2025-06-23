import { Schema, model, Document} from "mongoose"


export interface ISource extends Document {
  name: string; // needs to match "source" in Article.ts
  rssUrl: string;
}


const SourceSchema: Schema = new Schema({
  name: {type: String, required: true, unique: true},
  rssUrl: {type: String, required: true, unique:true}
});


const Source = model<ISource>("Source", SourceSchema)


export default Source;
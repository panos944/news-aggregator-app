import Source, { ISource } from "../models/Source";

export class SourceRepository {
    public async findAll(): Promise<ISource[]> {
    // Fetches all source documents from the database
        return Source.find({}).exec()
    }
}
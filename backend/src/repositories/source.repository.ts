import Source, { ISource } from "../models/Source";

export class SourceRepository {
    public async findAll(): Promise<ISource[]> {
        return Source.find({}).exec()
    }
}
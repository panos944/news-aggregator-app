import RealPlayerProgram, { IRealPlayerProgram } from "../models/RealPlayerProgram";
import { fromRealPlayerProgramToDto } from "../dtos/article.dto";
import { IArticle } from "../models/Article";

export class RealPlayerService {
  /**
   * Get current Real Player program based on current time
   */
  public async getCurrentProgram(): Promise<IRealPlayerProgram | null> {
    const now = new Date();
    
    return await RealPlayerProgram.findOne({
      isActive: true,
      startTime: { $lte: now },
      endTime: { $gte: now }
    }).sort({ startTime: -1 });
  }

  /**
   * Get upcoming programs for today
   */
  public async getTodaysPrograms(): Promise<IRealPlayerProgram[]> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return await RealPlayerProgram.find({
      isActive: true,
      startTime: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ startTime: 1 });
  }

  /**
   * Get recent programs (last 24 hours) to simulate RSS feed behavior
   */
  public async getRecentPrograms(): Promise<IArticle[]> {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const programs = await RealPlayerProgram.find({
      isActive: true,
      startTime: { $gte: twentyFourHoursAgo }
    }).sort({ startTime: -1 }).limit(10);

    // Convert Real Player programs to article format
    return programs.map(program => fromRealPlayerProgramToDto(program)) as IArticle[];
  }

  /**
   * Create a new program
   */
  public async createProgram(programData: Partial<IRealPlayerProgram>): Promise<IRealPlayerProgram> {
    const program = new RealPlayerProgram(programData);
    return await program.save();
  }

  /**
   * Update a program
   */
  public async updateProgram(id: string, updateData: Partial<IRealPlayerProgram>): Promise<IRealPlayerProgram | null> {
    return await RealPlayerProgram.findByIdAndUpdate(id, updateData, { new: true });
  }

  /**
   * Delete a program
   */
  public async deleteProgram(id: string): Promise<boolean> {
    const result = await RealPlayerProgram.findByIdAndDelete(id);
    return result !== null;
  }

  /**
   * Get all programs with pagination
   */
  public async getAllPrograms(page: number = 1, limit: number = 20): Promise<{
    programs: IRealPlayerProgram[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    
    const [programs, total] = await Promise.all([
      RealPlayerProgram.find().sort({ startTime: -1 }).skip(skip).limit(limit),
      RealPlayerProgram.countDocuments()
    ]);

    return {
      programs,
      total,
      totalPages: Math.ceil(total / limit)
    };
  }
}

export const realPlayerService = new RealPlayerService(); 
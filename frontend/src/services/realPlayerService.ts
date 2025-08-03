 // Create a new service for managing Real Player programs in the frontend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export interface RealPlayerProgram {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  imageUrl?: string;
  url?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProgramData {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  imageUrl?: string;
  url?: string;
}

class RealPlayerService {
  // Get all programs with pagination
  async getPrograms(page: number = 1, limit: number = 20) {
    const response = await fetch(`${API_BASE_URL}/api/realplayer/programs?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch programs");
    }
    return response.json();
  }

  // Get current program
  async getCurrentProgram(): Promise<RealPlayerProgram | null> {
    const response = await fetch(`${API_BASE_URL}/api/realplayer/current`);
    if (!response.ok) {
      throw new Error("Failed to fetch current program");
    }
    return response.json();
  }

  // Get today's programs
  async getTodaysPrograms(): Promise<RealPlayerProgram[]> {
    const response = await fetch(`${API_BASE_URL}/api/realplayer/today`);
    if (!response.ok) {
      throw new Error("Failed to fetch today's programs");
    }
    return response.json();
  }

  // Create a new program
  async createProgram(programData: CreateProgramData): Promise<RealPlayerProgram> {
    const response = await fetch(`${API_BASE_URL}/api/realplayer/programs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(programData),
    });
    
    if (!response.ok) {
      throw new Error("Failed to create program");
    }
    return response.json();
  }

  // Update a program
  async updateProgram(id: string, programData: Partial<CreateProgramData>): Promise<RealPlayerProgram> {
    const response = await fetch(`${API_BASE_URL}/api/realplayer/programs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(programData),
    });
    
    if (!response.ok) {
      throw new Error("Failed to update program");
    }
    return response.json();
  }

  // Delete a program
  async deleteProgram(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/realplayer/programs/${id}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error("Failed to delete program");
    }
  }
}

export const realPlayerService = new RealPlayerService();
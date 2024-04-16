export interface IAchievementData {
    title: string;
    description: string;
    experienceId: number;
  }
  
  export interface IAchievementEntity extends IAchievementData {
    id: number
    // createdAt: string
    // updatedAt: string
  }
  
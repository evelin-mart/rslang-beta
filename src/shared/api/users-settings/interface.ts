
export interface UserSettings {
  wordsPerDay?: number;
  optional: {
    avatarUrl?: string,
    dailyStats?: {
      new: number;
      learned: number;
      date: Date;
    }[]
  }
}

export const defaultUserSettings: UserSettings = {
  wordsPerDay: 1,
  optional: {}
}
export function formattedDate(date: Date): string {
  // returns date as 11/11/2021
  // other times it returns 11/11/2021, 12:00:00 AM
  // which is why we call the .split at the end
  return date.toLocaleDateString("en-US");
}

export const KEY="streak";

export interface Streak {
  currentCount: number
  startDate: string
  lastLoginDate: string
}

export function shouldIncrementOrResetStreakCount(
  currentDate: Date,
  lastLoginDate: string
): "increment" | "reset" | "none" {
  // We get 11/5/2021
  // so to get 5, we split on / and get the second item
  const difference =
    currentDate.getDate() - parseInt(lastLoginDate.split("/")[1]);
  // This means they logged in the day after the currentDate
  if (difference === 1) {
    return "increment";
  }
  if (difference === 0) {
    return "none";
  }
  // Otherwise they logged in after a day, which would
  // break the streak
  return "reset";
}

export function buildStreak(
  date: Date,
  overrideDefaults?: Partial<Streak>,
): Streak {
  const defaultStreak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date),
  }

  return {
    ...defaultStreak,
    ...overrideDefaults,
  }
}

export function updateStreak(storage: Storage, streak: Streak): void {
  storage.setItem(KEY, JSON.stringify(streak))
}

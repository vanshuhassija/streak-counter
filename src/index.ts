import {
  buildStreak,
  formattedDate,
  KEY,
  shouldIncrementOrResetStreakCount,
  Streak,
  updateStreak,
} from "./utils";

export default function streakCounter(storage: Storage, date: Date): Streak {
  const streakInLocalStorage = storage.getItem(KEY);
  if (streakInLocalStorage) {
    try {
      const streak = JSON.parse(streakInLocalStorage || "") as Streak;
      const state = shouldIncrementOrResetStreakCount(
        date,
        streak.lastLoginDate
      );

      if (state === "increment") {
        const updatedStreak = buildStreak(date, {
          startDate: streak.startDate,
          currentCount: streak.currentCount + 1,
          lastLoginDate: formattedDate(date),
        });
        updateStreak(storage, updatedStreak);
        return updatedStreak;
      } else if (state === "reset") {
        const updatedStreak = buildStreak(date, {
          startDate: streak.startDate,
          currentCount: 1,
          lastLoginDate: formattedDate(date),
        });
        updateStreak(storage, updatedStreak);

        return updatedStreak;
      }

      return streak;
    } catch (error) {
      console.error("Failed to parse streak from local storage");
    }
  }

  const streak = buildStreak(date);
  updateStreak(storage, streak);

  return streak;
}

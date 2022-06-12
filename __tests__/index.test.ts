import streakCounter from "../src/index";
import { JSDOM } from "jsdom";
import { formattedDate } from "../src/utils";
const key = "streak";

describe("basic test", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});

describe("streakCounter", () => {
  let mockLocalStorage: Storage;
  const date = new Date("12/12/2021");
  beforeEach(() => {
    const mockJSDom = new JSDOM("", { url: "https://localhost" });
    const streak = {
      currentCount: 1,
      startDate: formattedDate(date),
      lastLoginDate: formattedDate(date),
    };

    mockLocalStorage = mockJSDom.window.localStorage;
    mockLocalStorage.setItem("streak", JSON.stringify(streak));
  });

  it("should return a streak object with currentCount, startDate and lastLoginDate", () => {
    const date = new Date();
    const streak = streakCounter(mockLocalStorage, date);
    expect(streak.hasOwnProperty("currentCount")).toBe(true);
    expect(streak.hasOwnProperty("startDate")).toBe(true);
    expect(streak.hasOwnProperty("lastLoginDate")).toBe(true);
  });
  it("should store the streak in localStorage", () => {
    const date = new Date();
    const key = "streak";
    streakCounter(mockLocalStorage, date);

    const streakAsString = mockLocalStorage.getItem(key);
    expect(streakAsString).not.toBeNull();
  });
  it("should return the streak from localStorage", () => {
    const date = new Date();
    const streak = streakCounter(mockLocalStorage, date);

    // Should match the dates used to set up the tests
    expect(streak.startDate).toBe("12/12/2021");
  });

  it("should increment the streak", () => {
    // It should increment because this is the day after
    // the streak started and a streak is days in a row.
    const date = new Date("12/13/2021");
    const streak = streakCounter(mockLocalStorage, date);

    expect(streak.currentCount).toBe(2);
  });

  it("should not increment the streak when login days not consecutive", () => {
    // It should not increment because this is two days after
    // the streak started and the days aren't consecutive.
    const date = new Date("12/14/2021");
    const streak = streakCounter(mockLocalStorage, date);

    expect(streak.currentCount).toBe(1);
  });

  it("should save the incremented streak in localStorage", () => {
    const date = new Date("12/13/2021");
    streakCounter(mockLocalStorage, date);
    const streak = JSON.parse(mockLocalStorage.getItem(key) || "");
    expect(streak.currentCount).toBe(2);
  });

  it("should reset if not consecutive", () => {
    const date = new Date("12/13/2021");
    const streak = streakCounter(mockLocalStorage, date);

    expect(streak.currentCount).toBe(2);

    const newDate = new Date("12/15/2021");
    const updatedStreak = streakCounter(mockLocalStorage, newDate);
    expect(updatedStreak.currentCount).toBe(1);
  });

  it("should save the reset streak to localStorage", () => {
    const date = new Date("12/13/2021");
    const streak = streakCounter(mockLocalStorage, date);

    expect(streak.currentCount).toBe(2);

    const newDate = new Date("12/15/2021");
    streakCounter(mockLocalStorage, newDate);
    const updatedStreak = JSON.parse(mockLocalStorage.getItem(key) || "");
    expect(updatedStreak.currentCount).toBe(1);
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });
});

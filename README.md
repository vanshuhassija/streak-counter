# `@vanshuhassija/streak-counter` - a basic streak counter

This is a basic streak counter - inspired by Duolingo - written in TypeScript and meant for the browser (uses `localStorage`).

## Install

```shell
yarn add @vanshuhassija/streak-counter
npm install @vanshuhassija/streak-counter
```

## Usage
```code
import {streakCounter} from '@vanshuhassija/streak-counter'

const today = new Date()
const streak = streakCounter(localStorage, today)
// streak returns an object:
// {
//    currentCount: 1,
//    lastLoginDate: "11/11/2021",
//    startDate: "11/11/2021",
// }
```

[![Edit Sweet Streak](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/sweet-streak-09i6on?)
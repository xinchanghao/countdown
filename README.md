# useCountDown &middot; [![npm](https://img.shields.io/npm/v/@chhxin/countdown.svg)](https://www.npmjs.com/package/@chhxin/countdown)

[![GitHub issues](https://img.shields.io/github/issues/ChhXin/countdown)](https://github.com/ChhXin/countdown/issues)
[![GitHub license](https://img.shields.io/github/license/ChhXin/countdown)](https://github.com/ChhXin/countdown/blob/master/LICENSE)

## Introduction

When sending the verification code, you need to prevent the user from clicking frequently to send (usually waiting for one minute). At this time, the send button is disabled and the countdown still takes effect when the user refreshes or closes the current page.

## Demo

[![Edit @chhxin/countdown Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/chhxincountdown-demo-qc3yd)

## Install

```shell
npm i --save @chhxin/countdown
```

or

```shell
yarn add @chhxin/countdown
```

## Usage

### 1. `useCountDown`

```jsx
import { useCountDown } from '@chhxin/countdown'

const Timer = () => {
  const [restTime, resetCountDown] = useCountDown('timer', {
    total: 60,
    lifeCycle: 'session'
  })

  return null
}
```

### 2. `CountDownProvider`

```jsx
import { CountDownProvider } from '@chhxin/countdown'

const Timer = () => (
  <CountDownProvider
    id='timer'
    options={{
      total: 60,
      lifeCycle: 'session'
    }}>
    {(restTime, resetCountDown) => null}
  </CountDownProvider>
)
```

## Props

| name    | type   | required | default                             |
| ------- | ------ | -------- | ----------------------------------- |
| id      | string | true     |                                     |
| options | object | false    | `{total: 60, lifeCycle: 'session'}` |

options:

| name      | type                  | required | default   |
| --------- | --------------------- | -------- | --------- |
| total     | number                | false    | 60        |
| lifeCycle | 'session' \| 'always' | false    | 'session' |

lifeCycle：

- 'session', sessionStorage. It only takes effect during the current page period. When the user closes the page or opens a new page, the countdown is invalid.
- 'always', localStorage. As long as the user does not clear the browser data, the countdown will always take effect.

## License

MIT License

Copyright (c) 2020 逸尘

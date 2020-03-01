# useCountDown

## 介绍

React 倒计时 Hooks

验证手机号发送验证码时，需要防止用户频繁点击发送（一般等待一分钟），此时发送按钮为禁用状态，且用户如果刷新或关闭当前验证页面时，倒计时仍然生效。

## 安装

```shell
npm i --save @chhxin/countdown
```

or

```shell
yarn add @chhxin/countdown
```

## 使用方式

### 1. Hooks API `useCountDown`

```jsx
import { useCountDown } from "@chhxin/countdown";

const Timer = () => {
  const [restTime, resetCountDown] = useCountDown("timer", {
    total: 60,
    lifeCycle: "session"
  });

  return null;
};
```

### 2. `CountDownProvider`

```jsx
import { CountDownProvider } from "@chhxin/countdown";

const Timer = () => (
  <CountDownProvider
    id="timer"
    options={{
      total: 60,
      lifeCycle: "session"
    }}
  >
    {(restTime, resetCountDown) => null}
  </CountDownProvider>
);
```

## 参数说明

| name    | type   | required | default                             | description      |
| ------- | ------ | -------- | ----------------------------------- | ---------------- |
| id      | string | true     |                                     | 持久化的唯一标识 |
| options | object | false    | `{total: 60, lifeCycle: 'session'}` | 其他参数         |

options 由下列属性组成

| name      | type                  | required | default   | description        |
| --------- | --------------------- | -------- | --------- | ------------------ |
| total     | number                | false    | 60        | 倒计时总时长（秒） |
| lifeCycle | 'session' \| 'always' | false    | 'session' | 持久化方式         |

lifeCycle 说明：

- 使用 'session'，即 sessionStorage，只在当前页面周期内生效，用户关闭页面或打开新页面时，则倒计时失效。
- 使用 'always'，即 localStorage，用户只要不清除浏览器数据，则倒计时一直生效。

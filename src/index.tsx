import { useEffect, useState, useMemo, ReactNode } from "react";

type Options = {
  total?: number;
  lifeCycle?: "always" | "session";
};

const useCountDown = (timerKey: string, options?: Options) => {
  const total = options?.total ?? 60;
  const lifeCycle = options?.lifeCycle ?? "session";
  const Key = `__${timerKey}`;

  const [resetCounter, getRestTime] = useMemo(() => {
    const storage = lifeCycle === "always" ? localStorage : sessionStorage;

    return [
      () => storage.setItem(Key, `${Date.now() + total * 1000}`),
      () => {
        const time = Number(storage.getItem(Key) || "unknown");

        if (isNaN(time)) {
          return 0;
        }

        return Math.max(Math.floor((time - Date.now()) / 1000), 0);
      }
    ] as const;
  }, [Key, lifeCycle, total]);

  const [restTime, setRestTime] = useState(getRestTime);

  useEffect(() => {
    const timer = setInterval(() => {
      const newRestTime = getRestTime();

      if (restTime !== newRestTime) {
        setRestTime(newRestTime);
      }
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [getRestTime, restTime]);

  return [restTime, resetCounter] as const;
};

const CountDownProvider = ({
  id,
  children,
  options
}: {
  id: string;
  options?: Options;
  children: (restTime: number, resetCountDown: () => void) => ReactNode;
}) => {
  const [restTime, resetCounter] = useCountDown(id, options);

  return children(restTime, resetCounter);
};

export { useCountDown, CountDownProvider };

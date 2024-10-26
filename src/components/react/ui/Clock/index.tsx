import type React from "react";

import { cn } from "@/lib/cn";
import {
  motion,
  type MotionValue,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { tv } from "tailwind-variants";

type ClockTime = {
  hour: number;
  minute: number;
};

type ClockTimeRange = {
  endAt: ClockTime;
  startAt: ClockTime;
};

interface ClockProps extends Partial<ClockTimeRange> {
  className?: string | undefined;
  /**
   * The progress of the clock, must be `MotionValue<number>` and between 0 and 1.
   *
   * @type {MotionValue<number>}
   */
  progress: MotionValue<number>;
}

/** 分針は1分で6度進む */
const MINUTE_HAND_PER_MINUTE = 6;
/** 時針は1分で0.5度進む */
const HOUR_HAND_PER_MINUTE = 0.5;

type GetClockHandDeg = (arg: ClockTimeRange) => ClockTimeRange;

const getClockHandDeg: GetClockHandDeg = ({ endAt, startAt }) => {
  const startAtInMinutes = startAt.hour * 60 + startAt.minute;
  const endAtInMinutes = endAt.hour * 60 + endAt.minute;

  return {
    endAt: {
      hour: endAtInMinutes * HOUR_HAND_PER_MINUTE,
      minute: endAtInMinutes * MINUTE_HAND_PER_MINUTE,
    },
    startAt: {
      hour: startAtInMinutes * HOUR_HAND_PER_MINUTE,
      minute: startAtInMinutes * MINUTE_HAND_PER_MINUTE,
    },
  };
};

const clockStyle = tv({
  slots: {
    hand: "absolute left-1/2 w-0.5 origin-[center_bottom] bg-current",
    hour: "top-[15%] h-[35%]",
    minute: "top-0 h-1/2",
    wrapper: "pointer-events-none size-20",
  },
});
const css = clockStyle();

/**
 * Clock component displays a clock with animated clock hands.
 *
 * @component
 * @param props.startAt - The starting time for the clock hands. Defaults to { hour: 0, minute: 0 }.
 * @param props.endAt - The ending time for the clock hands. Defaults to { hour: 12, minute: 0 }.
 * @param props.progress - The progress value for animating the clock hands. Must be `MotionValue<number>` and between 0 and 1.
 *
 * @example
 * ```tsx
 * // Displays Clock from 1:15 to 1:45 with progress value from scrollYProgress.
 *<Clock
    endAt={{ hour: 1, minute: 45 }}
    progress={scrollYProgress}
    startAt={{ hour: 1, minute: 15 }}
  />
  ```
 */
const Clock: React.FC<ClockProps> = ({
  className,
  endAt,
  progress,
  startAt,
}) => {
  startAt ??= {
    hour: 0,
    minute: 0,
  };
  endAt ??= {
    hour: 12,
    minute: 0,
  };
  const { endAt: endAtDeg, startAt: startAtDeg } = getClockHandDeg({
    endAt,
    startAt,
  });

  const hourDeg = useTransform(
    progress,
    [0, 1],
    [startAtDeg.hour, endAtDeg.hour],
  );
  const minuteDeg = useTransform(
    progress,
    [0, 1],
    [startAtDeg.minute, endAtDeg.minute],
  );
  const hourTransform = useMotionTemplate`rotate(${hourDeg}deg)`;
  const minuteTransform = useMotionTemplate`rotate(${minuteDeg}deg)`;

  return (
    <div aria-hidden className={css.wrapper({ className })}>
      <motion.span
        className={cn(css.hand(), css.hour())}
        style={{ transform: hourTransform }}
      />
      <motion.span
        className={cn(css.hand(), css.minute())}
        style={{ transform: minuteTransform }}
      />
    </div>
  );
};

export default Clock;

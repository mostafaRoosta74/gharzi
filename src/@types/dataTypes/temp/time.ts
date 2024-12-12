export const TimeUnits = ["sec", "min", "h", "day", "Mo"];
export type TimeUnit = (typeof TimeUnits)[number];

export type Time = {
    time: number;

    unit: TimeUnit;
};

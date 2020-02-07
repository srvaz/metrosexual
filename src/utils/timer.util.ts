import { DAY_PERIOD, NIGHT_PERIOD } from "../constants/timer";

export const isDayPreiod = () => {
  const currentDate = new Date();
  const dayTime = DAY_PERIOD.START.split(':');
  const nightTime = NIGHT_PERIOD.START.split(':');
  const dayDate = createDate(dayTime);
  const nightDate = createDate(nightTime);

  return currentDate >= dayDate && currentDate <= nightDate;
};

const createDate = (hour: string[]) => {
  const currentDate = new Date();

  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    parseInt(hour[0]),
    parseInt(hour[1]),
    parseInt(hour[2])
  );
};

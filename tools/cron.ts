export enum TimesEnum {
  MINUTE = 60000,
  TEN_MINUTES = TimesEnum.MINUTE * 10,
  HOUR = TimesEnum.TEN_MINUTES * 6,
  DAY = TimesEnum.HOUR * 24,
  WEEK = TimesEnum.DAY * 7,
  // END_OF_MONTH = TODO
}

export const cron = (
  interval: number,
  cb: () => void,
  stepSize = 30000,
  timeToGo = TimesEnum.MINUTE
) => {
  if (interval <= stepSize) {
    throw new Error(`interval: ${interval} cannot be <= stepSize: ${stepSize}`);
  }
  const startTime = Date.now();
  let timeAtLastRun = startTime;
  const intervalID = setInterval(() => {
    const isDoneCronning = checkCron(startTime, timeToGo);
    if (isDoneCronning) {
      clearInterval(intervalID);
      return;
    }
    timeAtLastRun = tryToExecute(interval, cb, timeAtLastRun);
  }, stepSize);
};

export function checkCron(startTime: number, timeToGo: number) {
  const currentTime = Date.now();
  return currentTime - startTime >= timeToGo;
}

export function tryToExecute(
  interval: number,
  cb: () => void,
  timeAtLastRun: number
) {
  const currentTime = Date.now();
  if (currentTime - timeAtLastRun >= interval) {
    cb();
    return currentTime;
  }
  return timeAtLastRun;
}

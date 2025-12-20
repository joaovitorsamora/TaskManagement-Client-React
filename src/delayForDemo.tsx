export function delayForDemo<T>(promise: Promise<T>): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(resolve, 4000);
  }).then(() => promise);
}

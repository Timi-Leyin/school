export const getDay = (d: Date | string | number) => {
  const [day, month] = new Date(d)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      weekday: "long",
    })
    .split(",");
  return [day, month];
};

export const getTime = (d: Date | number | string) => {
  const startTime = new Date(d).toLocaleTimeString("en-US", {
    hour12: true,
  });
  return startTime;
};

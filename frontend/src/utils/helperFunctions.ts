export const getNumOfDays = () => {
  const d = new Date();
  const numOfDays = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  return numOfDays;
};

export const hourlyDataHolder = Array.from({ length: 24 }, (v, i) => ({
  hour: i + 1,
  total: 0,
}));

export const dailyDataHolder = Array.from(
  { length: getNumOfDays() },
  (v, i) => ({
    date: i + 1,
    total: 0,
  })
);

export const monthlyDataHolder = Array.from({ length: 12 }, (v, i) => ({
  month: i + 1,
  total: 0,
}));

export const hasNullProperty = <Type>(request: Type): boolean => {
  const prefilledWithNullable = {
    ...request,
    description: 'dummy text',
    id: 1,
  };
  return Object.values(prefilledWithNullable).some(
    (property) => property === undefined || property === null || property === ''
  );
};

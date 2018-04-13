export type IncreaseAction = {
  type: "INCREASE",
  count: number
};

export const increase = (count:number): IncreaseAction => {
  return {
    type: "INCREASE",
    count
  };
}

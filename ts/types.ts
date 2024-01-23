export type UserState = {
  steps: number;
  duration: string;
  user_info: PageInfo[];
};

export type PriceTemplate = {
  plan_price: PlanPrice;
  extra: AddsOn;
};

export type PlanPrice = {
  [key: string]: string[];
};

export type AddsOn = {
  [key: string]: string[];
};

export type PageInfo = Record<string, string>;

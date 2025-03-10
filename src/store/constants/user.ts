import { Plan } from "@/interfaces/user";

export const planRanks: Record<Plan, number> = {
  Basic: 1,
  Advanced: 2,
  Premium: 3,
  Vip: 4,
};

export const plans = {
  basic: "Basic",
  premium: "Premium",
  advanced: "Advanced",
  vip: "VIP",
};

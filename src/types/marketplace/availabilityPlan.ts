/**
 * Availability plan types
 */
type AvailabilityPlanType = "availability-plan/day" | "availability-plan/time";

type AvailabilityPlanEntry<T extends AvailabilityPlanType = AvailabilityPlanType> = {
  dayOfWeek: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  seats: number;
} & (T extends "availability-plan/time" ? { startTime: string; endTime: string } : {});

export type AvailabilityPlan<T extends AvailabilityPlanType = "availability-plan/day"> = {
  type: T;
  timezone: string;
  entries: Array<AvailabilityPlanEntry<T>>;
};
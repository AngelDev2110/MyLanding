export type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "arrow-down"
  | "copy"
  | "mail"
  | "check";

export interface Props {
  name: IconName;
  size?: number;
}

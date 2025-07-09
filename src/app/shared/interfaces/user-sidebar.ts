import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface UserTab {
  id: number;
  icon: IconDefinition;
  link: string;
  route: string;
  click?: VoidFunction
}

import * as icons from "./index.ts";
import { type Icon } from "../../utils/types.ts";

export type IconProps = Icon & {
  name: keyof typeof icons;
};

const Icon = ({ name, ...props }: IconProps): JSX.Element => {
  const Component = icons[name];
  return <Component {...props} />;
};

export default Icon;

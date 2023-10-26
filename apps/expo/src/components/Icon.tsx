import type { FC } from "react";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import type { IconProps } from "@expo/vector-icons/build/createIconSet";

export const Icon: FC<Props> = ({ name, color = "white", ...props }) => {
  if (Object.keys(MaterialIcons.glyphMap).includes(name))
    return (
      <MaterialIcons
        size={18}
        color={color}
        {...props}
        name={name as keyof typeof MaterialIcons.glyphMap}
      />
    );

  if (Object.keys(Feather.glyphMap).includes(name))
    return (
      <Feather
        size={18}
        color={color}
        {...props}
        name={name as keyof typeof Feather.glyphMap}
      />
    );

  if (Object.keys(AntDesign.glyphMap).includes(name))
    return (
      <AntDesign
        size={18}
        color={color}
        {...props}
        name={name as keyof typeof AntDesign.glyphMap}
      />
    );

  if (Object.keys(FontAwesome.glyphMap).includes(name))
    return (
      <FontAwesome
        size={18}
        color={color}
        {...props}
        name={name as keyof typeof FontAwesome.glyphMap}
      />
    );

  if (Object.keys(Entypo.glyphMap).includes(name))
    return (
      <Entypo
        size={18}
        color={color}
        {...props}
        name={name as keyof typeof Entypo.glyphMap}
      />
    );

  return null;
};

export type IconName =
  | keyof typeof FontAwesome.glyphMap
  | keyof typeof AntDesign.glyphMap
  | keyof typeof Feather.glyphMap
  | keyof typeof MaterialIcons.glyphMap
  | keyof typeof Entypo.glyphMap;
type Props = IconProps<IconName>;

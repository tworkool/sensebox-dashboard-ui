import { Avatar } from "@mantine/core";
import Identicon from "identicon.js";
import { useMemo } from "react";
import { useMantineColorScheme } from '@mantine/core';

const IdenticonAvatar = (props) => {
  const { id, ...rest} = props;
  const { colorScheme } = useMantineColorScheme();
  const bg = colorScheme === "light" ? [230, 230, 230, 255] : [20, 20, 20, 255];

  const identiconImage = useMemo(() => {
    if (id === undefined || id === null) return null;
    try {
      const data = new Identicon(id.toString(), {
        size: 128,
        background: bg,
      }).toString();
      return `data:image/png;base64,${data}`;
    } catch (error) {
      return null;
    }
  }, [id, bg]);

  return <Avatar src={identiconImage} {...rest} />;
};

export default IdenticonAvatar;

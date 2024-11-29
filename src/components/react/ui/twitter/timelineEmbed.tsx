"use client";

import useClientTheme from "../../../../hooks/useClientTheme";
import Timeline from "./timeline";

const TimelineEmbed = ({ id }: { id: string }) => {
  const { theme } = useClientTheme();

  return <Timeline id={id} theme={theme} />;
};

export default TimelineEmbed;

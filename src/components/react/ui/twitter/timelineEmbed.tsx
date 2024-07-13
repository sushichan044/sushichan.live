"use client";

import Timeline from "@/components/react/ui/twitter/timeline";
import useClientTheme from "@/hooks/useClientTheme";

const TimelineEmbed = ({ id }: { id: string }) => {
  const { theme } = useClientTheme();

  return <Timeline id={id} theme={theme} />;
};

export default TimelineEmbed;

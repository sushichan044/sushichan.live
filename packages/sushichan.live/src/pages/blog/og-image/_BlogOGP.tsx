import type { ReactNode } from "react";

type BlogOGPProps = {
  fontFamily?: string;
  title: string;
};

export const BlogOGP = ({ fontFamily, title }: BlogOGPProps): ReactNode => {
  return (
    <div
      style={{
        backgroundColor: "#9ab3ca",
        display: "flex",
        fontFamily,
        height: "100%",
        letterSpacing: 0.05,
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          clipPath: "inset(32px round 16px)",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            textWrap: "balance",
            wordBreak: "keep-all",
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          alignItems: "center",
          bottom: "60px",
          display: "flex",
          fontSize: 40,
          fontWeight: 400,
          gap: "8px",
          position: "absolute",
          right: "60px",
        }}
      >
        <img
          alt="favicon"
          height={48}
          src="https://assets.sushichan044.workers.dev/icon-transparent.png"
          style={{
            top: "6px",
          }}
          width={48}
        />
        すしにっき
      </div>
    </div>
  );
};

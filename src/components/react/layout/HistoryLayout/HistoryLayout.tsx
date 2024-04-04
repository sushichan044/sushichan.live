import Clock from "@/components/react/ui/Clock"
import { useScroll } from "framer-motion"
import React from "react"

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { scrollYProgress } = useScroll()

  return (
    <div className="flex flex-row flex-nowrap justify-between">
      <section>{children}</section>
      <aside>
        <Clock className="sticky top-4" progress={scrollYProgress} />
      </aside>
    </div>
  )
}

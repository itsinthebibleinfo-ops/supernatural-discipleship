import { Suspense } from "react";
import { AppFrame } from "@/components/app-frame";
import { BibleStudy } from "@/components/bible-study";

export default function BiblePage() {
  return (
    <AppFrame>
      <Suspense fallback={<div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">Loading Bible study...</div>}>
        <BibleStudy />
      </Suspense>
    </AppFrame>
  );
}


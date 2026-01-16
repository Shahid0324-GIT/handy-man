import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Handyman</h1>
      <Link href="/tools">
        <Button size="lg">Open Dashboard</Button>
      </Link>
    </div>
  );
}

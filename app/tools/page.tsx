import { NAV_ITEMS } from "@/lib/constants";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

export default function ToolsDashboard() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Select a tool to get started.</p>
      </div>

      {NAV_ITEMS.map((group) => (
        <div key={group.title} className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground/90">
            {group.title}
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {group.items.map((tool) => (
              <Link key={tool.url} href={tool.url}>
                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <tool.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-base">{tool.title}</CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Clock } from "lucide-react";
import { toast } from "sonner";
import { Frequency } from "@/utils";
import { DAYS } from "@/lib/constants";

export default function CronPage() {
  const [freq, setFreq] = useState<Frequency>("weekly");
  const [minute, setMinute] = useState("0");
  const [hour, setHour] = useState("9");
  const [dayOfMonth, setDayOfMonth] = useState("1");
  const [weekDays, setWeekDays] = useState<string[]>(["1"]);
  const [cron, setCron] = useState("* * * * *");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    let newCron = "* * * * *";
    let humanText = "";

    const m = parseInt(minute) || 0;
    const h = parseInt(hour) || 0;

    switch (freq) {
      case "minute":
        newCron = "*/1 * * * *";
        humanText = "Every minute";
        break;
      case "hourly":
        newCron = `${m} * * * *`;
        humanText = `At ${m} minutes past the hour`;
        break;
      case "daily":
        newCron = `${m} ${h} * * *`;
        humanText = `At ${h.toString().padStart(2, "0")}:${m
          .toString()
          .padStart(2, "0")} every day`;
        break;
      case "weekly":
        const days = weekDays.length > 0 ? weekDays.sort().join(",") : "*";
        newCron = `${m} ${h} * * ${days}`;
        humanText = `At ${h.toString().padStart(2, "0")}:${m
          .toString()
          .padStart(2, "0")} on selected days`;
        break;
      case "monthly":
        newCron = `${m} ${h} ${dayOfMonth} * *`;
        humanText = `At ${h.toString().padStart(2, "0")}:${m
          .toString()
          .padStart(2, "0")} on day ${dayOfMonth} of the month`;
        break;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCron(newCron);
    setDesc(humanText);
  }, [freq, minute, hour, dayOfMonth, weekDays]);

  const toggleDay = (id: string) => {
    setWeekDays((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const copyCron = () => {
    navigator.clipboard.writeText(cron);
    toast.success("Cron expression copied!");
  };

  return (
    <ToolShell
      title="Cron Expression Generator"
      description="Create schedule expressions for cron jobs visually."
    >
      <div className="grid h-full gap-8 lg:grid-cols-12">
        {/* LEFT: Builder */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-6">
            <div className="space-y-3">
              <Label>I want to run a job...</Label>
              <Select
                value={freq}
                onValueChange={(v) => setFreq(v as Frequency)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minute">Every Minute</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dynamic Inputs based on Frequency */}
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              {(freq === "hourly" ||
                freq === "daily" ||
                freq === "weekly" ||
                freq === "monthly") && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Minute (0-59)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={59}
                      value={minute}
                      onChange={(e) => setMinute(e.target.value)}
                    />
                  </div>
                  {freq !== "hourly" && (
                    <div className="space-y-2">
                      <Label>Hour (0-23)</Label>
                      <Input
                        type="number"
                        min={0}
                        max={23}
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              )}

              {freq === "monthly" && (
                <div className="space-y-2">
                  <Label>Day of Month (1-31)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={31}
                    value={dayOfMonth}
                    onChange={(e) => setDayOfMonth(e.target.value)}
                  />
                </div>
              )}

              {freq === "weekly" && (
                <div className="space-y-3">
                  <Label>Days of Week</Label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS.map((day) => (
                      <div
                        key={day.id}
                        className="flex items-center space-x-2 border p-2 rounded-md hover:bg-muted/50 cursor-pointer select-none"
                        onClick={() => toggleDay(day.id)}
                      >
                        <Checkbox
                          id={`day-${day.id}`}
                          checked={weekDays.includes(day.id)}
                          // The Fix: Removed onCheckedChange so click bubbles to div
                          className="pointer-events-none"
                        />
                        <span className="text-sm font-medium leading-none">
                          {day.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* RIGHT: Result */}
        <div className="lg:col-span-7 flex flex-col justify-start pt-2">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-teal-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-card border p-8 rounded-xl shadow-xl flex flex-col gap-6 items-center text-center">
              <div className="space-y-2">
                <h3 className="text-muted-foreground font-medium uppercase tracking-wider text-sm">
                  Generated Expression
                </h3>
                <div className="text-5xl md:text-6xl font-mono font-bold tracking-tight text-foreground break-all">
                  {cron}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm font-medium text-muted-foreground">
                <Clock className="size-4" />
                {desc}
              </div>

              <Button
                size="lg"
                className="w-full max-w-sm mt-4"
                onClick={copyCron}
              >
                <Copy className="mr-2 size-4" /> Copy String
              </Button>
            </div>
          </div>

          {/* Quick Cheatsheet */}
          <div className="mt-8 grid grid-cols-5 gap-2 text-center text-xs text-muted-foreground font-mono opacity-70">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-foreground text-lg">*</span>
              <span>Minute</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-foreground text-lg">*</span>
              <span>Hour</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-foreground text-lg">*</span>
              <span>Day (Month)</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-foreground text-lg">*</span>
              <span>Month</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-foreground text-lg">*</span>
              <span>Day (Week)</span>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}

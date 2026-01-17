"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { FEATURES } from "@/lib/constants";

export function FeatureGrid() {
  return (
    <section className="py-24 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Everything you need. <br />
            <span className="text-blue-600 dark:text-yellow-500">
              Nothing you don&apos;t.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Stop pasting your data into random websites. Handyman runs 100% in
            your browser.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow border-muted/50 bg-background/50 backdrop-blur-sm">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.bg}`}
                >
                  <feature.icon className={`size-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

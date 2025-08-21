"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bell, BarChart3, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  const [featureNumber, setFeatureNumber] = useState(0);
  const features = useMemo(
    () => [
      {
        icon: Bell,
        title: "Digital Notice Board",
        description:
          "Stay updated with announcements, events, and important information",
      },
      {
        icon: BarChart3,
        title: "Interactive Polls",
        description:
          "Voice your opinion and see what your campus community thinks",
      },
      {
        icon: Search,
        title: "Lost & Found",
        description: "Find your lost items or help others recover theirs",
      },
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (featureNumber === features.length - 1) {
        setFeatureNumber(0);
      } else {
        setFeatureNumber(featureNumber + 1);
      }
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [featureNumber, features]);

  const currentFeature = features[featureNumber];

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <Button variant="secondary" size="sm">
            🎓 Campus Life Simplified
          </Button>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-3xl tracking-tighter text-center font-regular">
              <span className="text-blue-600 text-6xl md:text-8xl">
                Campusly
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                Your Digital Campus Companion
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-3xl text-center">
              Stay informed, engaged, and connected. One place for all your
              campus needs - notices, polls, and lost & found. No more scattered
              information or digging through messy WhatsApp chats.
            </p>
          </div>

          {/* Animated Feature Highlight */}
          <motion.div
            className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-lg border"
            key={featureNumber}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <currentFeature.icon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">
                {currentFeature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {currentFeature.description}
              </p>
            </div>
          </motion.div>

          <div className="flex flex-row gap-3">
            <Link href="/sign-in">
              <Button size="lg" className="gap-4" variant="outline">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/feed">
              <Button size="lg" className="gap-4">
                Checkout Feed <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
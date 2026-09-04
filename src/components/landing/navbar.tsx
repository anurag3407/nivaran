"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, ShieldCheck, Cpu, User, Stethoscope, Sliders } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Brand Logo & Editorial Title */}
        <div className="flex items-center gap-4">
          <Link href="/" className="group flex items-center gap-3">
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-foreground group-hover:text-accent transition-colors duration-150">
              NIVARAN<span className="text-accent">.AI</span>
            </span>
          </Link>
          <Badge variant="accent" className="hidden sm:inline-flex text-[10px] py-0.5 font-mono tracking-wider">
            ENTERPRISE CLINICAL OS
          </Badge>
        </div>


        {/* Action Gateways */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/audit-trail" className="hidden lg:inline-flex">
            <Button variant="ghost" size="sm" className="text-xs">
              <ShieldCheck size={14} strokeWidth={1.5} className="mr-1.5" />
              Audit Ledger
            </Button>
          </Link>

          <Link href="/settings" title="Universal AI Model Config">
            <Button variant="ghost" size="sm" className="text-xs">
              <Sliders size={14} strokeWidth={1.5} className="mr-1.5" />
              Model Config
            </Button>
          </Link>

          <Link href="/patient/DEMO-701">
            <Button variant="secondary" size="sm" className="hidden sm:inline-flex text-xs">
              <User size={14} strokeWidth={1.5} className="mr-1.5" />
              Patient PWA
            </Button>
          </Link>

          <Link href="/doctor/dashboard">
            <Button variant="accent-solid" size="sm" className="text-xs">
              <Stethoscope size={14} strokeWidth={1.5} className="mr-1.5" />
              Doctor Command
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

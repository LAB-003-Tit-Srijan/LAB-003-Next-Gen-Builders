import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Search, Send, Paperclip, Smile, MapPin, Calendar, Phone, Video, MoreHorizontal,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { conversations, sampleMessages } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({ component: ChatPage });

function ChatPage() {
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [showThread, setShowThread] = useState(false);
  const active = conversations.find((c) => c.id === activeId)!;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-0 py-0 sm:px-4 sm:py-6 lg:px-8">
        <div className="grid h-[calc(100vh-4rem)] overflow-hidden border border-border bg-card sm:h-[calc(100vh-7rem)] sm:rounded-3xl md:grid-cols-[320px_1fr]">
          {/* Sidebar */}
          <aside className={cn("flex flex-col border-r border-border", showThread && "hidden md:flex")}>
            <div className="border-b border-border p-4">
              <h2 className="text-lg font-semibold">Messages</h2>
              <div className="mt-3 flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input placeholder="Search conversations" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              </div>
            </div>
            <ul className="flex-1 overflow-y-auto">
              {conversations.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => { setActiveId(c.id); setShowThread(true); }}
                    className={cn(
                      "flex w-full items-center gap-3 border-b border-border/60 p-4 text-left transition hover:bg-secondary/40",
                      c.id === activeId && "bg-secondary/60",
                    )}
                  >
                    <div className="relative">
                      <img src={c.avatar} alt="" className="h-11 w-11 rounded-full" />
                      {c.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success ring-2 ring-card" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="truncate text-sm font-semibold">{c.name}</span>
                        <span className="text-[10px] text-muted-foreground">{c.time}</span>
                      </div>
                      <div className="text-[11px] text-primary">{c.product}</div>
                      <div className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{c.lastMsg}</div>
                    </div>
                    {c.unread > 0 && (
                      <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                        {c.unread}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Thread */}
          <section className={cn("flex flex-col", !showThread && "hidden md:flex")}>
            <header className="flex items-center gap-3 border-b border-border p-4">
              <button onClick={() => setShowThread(false)} className="md:hidden">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="relative">
                <img src={active.avatar} alt="" className="h-10 w-10 rounded-full" />
                {active.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-card" />}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{active.name}</div>
                <div className="text-xs text-muted-foreground">{active.online ? "Online · About " + active.product : "Last seen recently"}</div>
              </div>
              <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto bg-background/40 p-5">
              <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-card p-3 text-center text-xs text-muted-foreground">
                You're chatting about <span className="font-semibold text-foreground">{active.product}</span>. Stay safe — meet only on campus.
              </div>
              {sampleMessages.map((m, i) => (
                <motion.div
                  key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}
                >
                  <div className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-soft",
                    m.from === "me" ? "bg-brand-gradient text-primary-foreground" : "bg-card border border-border",
                  )}>
                    {m.text}
                    <div className={cn("mt-1 text-[10px]", m.from === "me" ? "opacity-70" : "text-muted-foreground")}>{m.time}</div>
                  </div>
                </motion.div>
              ))}

              <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Calendar className="h-3.5 w-3.5 text-primary" /> Schedule a meet-up
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  {["Today, 5 PM", "Tomorrow, 11 AM", "Sat, 2 PM", "Custom…"].map((t) => (
                    <button key={t} className="rounded-lg border border-border bg-background px-3 py-2 text-left hover:bg-secondary">{t}</button>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-secondary/60 p-2 text-xs">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> Suggested: Central Library entrance
                </div>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 border-t border-border p-3">
              <Button variant="ghost" size="icon" type="button"><Paperclip className="h-4 w-4" /></Button>
              <input
                placeholder="Write a message…"
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              <Button variant="ghost" size="icon" type="button"><Smile className="h-4 w-4" /></Button>
              <Button size="icon" className="rounded-full bg-brand-gradient text-primary-foreground hover:opacity-90">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

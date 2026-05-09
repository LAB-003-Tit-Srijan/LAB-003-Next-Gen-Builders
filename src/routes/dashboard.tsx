import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  TrendingUp, Eye, MessageCircle, Heart, Package, ShoppingBag,
  Plus, BadgeCheck,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { products, conversations } from "@/lib/mock-data";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/dashboard")({ component: DashboardPage });

const chartData = [
  { d: "Mon", views: 120, msgs: 4 }, { d: "Tue", views: 180, msgs: 7 },
  { d: "Wed", views: 150, msgs: 6 }, { d: "Thu", views: 220, msgs: 11 },
  { d: "Fri", views: 280, msgs: 14 }, { d: "Sat", views: 320, msgs: 18 },
  { d: "Sun", views: 260, msgs: 12 },
];

function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Welcome back, Aarav 👋</p>
              <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Your dashboard</h1>
            </div>
            <Button className="rounded-full bg-brand-gradient text-primary-foreground shadow-elegant hover:opacity-90">
              <Plus className="h-4 w-4" /> New listing
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: Eye, label: "Profile views", v: "1,284", t: "+12.4%" },
              { i: Package, label: "Active listings", v: "8", t: "2 new" },
              { i: MessageCircle, label: "Unread chats", v: "3", t: "Today" },
              { i: TrendingUp, label: "Earnings", v: "₹14,520", t: "+₹2,400" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-primary">
                    <s.i className="h-4 w-4" />
                  </div>
                  <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">{s.t}</span>
                </div>
                <div className="mt-4 text-2xl font-bold tracking-tight">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Chart */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Activity overview</h3>
                  <p className="text-xs text-muted-foreground">Views and messages this week</p>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Views</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-foreground" /> Msgs</span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="dv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                    <Area type="monotone" dataKey="views" stroke="var(--primary)" strokeWidth={2} fill="url(#dv)" />
                    <Area type="monotone" dataKey="msgs" stroke="var(--foreground)" strokeWidth={2} fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Activity feed */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="text-sm font-semibold">Recent activity</h3>
              <ul className="mt-4 space-y-4">
                {[
                  { i: Heart, t: "Riya wishlisted your MacBook Air", time: "2m ago" },
                  { i: MessageCircle, t: "New message from Karthik", time: "1h" },
                  { i: ShoppingBag, t: "Order placed: Casio Calculator", time: "3h" },
                  { i: BadgeCheck, t: "Identity re-verified ✓", time: "1d" },
                  { i: Eye, t: "12 new views on your listings", time: "2d" },
                ].map((a, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                      <a.i className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 text-sm">
                      <div className="text-foreground">{a.t}</div>
                      <div className="text-xs text-muted-foreground">{a.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* My listings */}
          <section className="mt-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">My listings</h2>
              <Link to="/marketplace" className="text-sm text-primary hover:underline">View all →</Link>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="bg-secondary/60 text-xs text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 text-left font-medium">Item</th>
                    <th className="px-5 py-3 text-left font-medium">Price</th>
                    <th className="px-5 py-3 text-left font-medium">Views</th>
                    <th className="px-5 py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.slice(0, 5).map((p) => (
                    <tr key={p.id} className="hover:bg-secondary/30">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.image} className="h-10 w-10 rounded-lg object-cover" alt="" />
                          <span className="line-clamp-1 font-medium">{p.title}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 font-semibold">₹{p.price.toLocaleString("en-IN")}</td>
                      <td className="px-5 py-3 text-muted-foreground">{120 + Math.floor(Math.random() * 200)}</td>
                      <td className="px-5 py-3">
                        <span className="rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Wishlist */}
          <section className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold">Wishlist</h3>
              <ul className="mt-4 space-y-3">
                {products.slice(5, 9).map((p) => (
                  <li key={p.id} className="flex items-center gap-3">
                    <img src={p.image} className="h-12 w-12 rounded-lg object-cover" alt="" />
                    <div className="flex-1">
                      <div className="line-clamp-1 text-sm font-medium">{p.title}</div>
                      <div className="text-xs text-muted-foreground">₹{p.price.toLocaleString("en-IN")} · {p.seller.college}</div>
                    </div>
                    <Heart className="h-4 w-4 fill-destructive text-destructive" />
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold">Recent chats</h3>
              <ul className="mt-4 space-y-3">
                {conversations.map((c) => (
                  <li key={c.id} className="flex items-center gap-3">
                    <div className="relative">
                      <img src={c.avatar} alt="" className="h-10 w-10 rounded-full" />
                      {c.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-card" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{c.name}</div>
                        <div className="text-[11px] text-muted-foreground">{c.time}</div>
                      </div>
                      <div className="line-clamp-1 text-xs text-muted-foreground">{c.lastMsg}</div>
                    </div>
                    {c.unread > 0 && (
                      <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                        {c.unread}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

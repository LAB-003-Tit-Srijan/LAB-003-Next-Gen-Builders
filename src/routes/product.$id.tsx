import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BadgeCheck, Heart, MessageCircle, Share2, MapPin, Calendar, Shield,
  TrendingUp, Sparkles, ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/mock-data";
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetails,
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center text-center">
      <div>
        <h1 className="text-2xl font-semibold">Listing not found</h1>
        <Link to="/marketplace" className="mt-3 inline-block text-primary hover:underline">Back to marketplace</Link>
      </div>
    </div>
  ),
});

function ProductDetails() {
  const { id } = Route.useParams();
  const product = products.find((p) => p.id === id);
  if (!product) throw notFound();
  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState(false);
  const gallery = product.images?.length ? product.images : [product.image, product.image, product.image, product.image];
  const similar = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const aiPrice = Math.round(product.price * 0.96);
  const trend = [
    { m: "Apr", p: aiPrice + 400 }, { m: "May", p: aiPrice + 280 },
    { m: "Jun", p: aiPrice + 150 }, { m: "Jul", p: aiPrice + 80 },
    { m: "Aug", p: aiPrice + 30 },  { m: "Sep", p: aiPrice },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link to="/marketplace" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to marketplace
          </Link>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Gallery */}
            <div>
              <motion.div
                key={active}
                initial={{ opacity: 0.6, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden rounded-3xl border border-border bg-card"
              >
                <img src={gallery[active]} alt={product.title} className="aspect-square w-full object-cover" />
              </motion.div>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`overflow-hidden rounded-xl border-2 transition ${active === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}
                  >
                    <img src={g} alt="" className="aspect-square w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-medium text-muted-foreground">
                <span className="rounded-full bg-secondary px-2 py-0.5">{product.category}</span>
                <span className="rounded-full bg-secondary px-2 py-0.5">{product.condition}</span>
                <span className="rounded-full bg-secondary px-2 py-0.5">Posted {product.postedAgo}</span>
              </div>
              <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                {product.title}
              </h1>

              <div className="mt-5 flex items-end gap-3">
                <span className="text-4xl font-bold tracking-tight">₹{product.price.toLocaleString("en-IN")}</span>
                {product.originalPrice && (
                  <span className="pb-1 text-base text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

              {/* AI Price card */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-secondary/40 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-primary-foreground">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">AI fair-price estimate</div>
                      <div className="text-xs text-muted-foreground">Based on 142 similar campus listings</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-semibold text-success">94% confidence</span>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Estimated value</div>
                    <div className="mt-1 text-lg font-bold">₹{aiPrice.toLocaleString("en-IN")}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Demand</div>
                    <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-success">
                      <TrendingUp className="h-3.5 w-3.5" /> High
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Condition impact</div>
                    <div className="mt-1 text-sm font-semibold">+8% premium</div>
                  </div>
                </div>
                <div className="mt-4 h-24">
                  <ResponsiveContainer>
                    <AreaChart data={trend} margin={{ left: 0, right: 0, top: 6, bottom: 0 }}>
                      <defs>
                        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="m" hide />
                      <YAxis hide domain={["auto", "auto"]} />
                      <Tooltip
                        contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                        formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Avg"]}
                      />
                      <Area type="monotone" dataKey="p" stroke="var(--primary)" strokeWidth={2} fill="url(#g)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" className="flex-1 rounded-full bg-brand-gradient text-primary-foreground shadow-elegant hover:opacity-90">
                  Buy now · ₹{product.price.toLocaleString("en-IN")}
                </Button>
                {product.forRent && (
                  <Button size="lg" variant="outline" className="rounded-full">
                    Rent · ₹{product.rentPerDay}/day
                  </Button>
                )}
                <Button size="lg" variant="outline" className="rounded-full" onClick={() => setLiked(!liked)} aria-label="Wishlist">
                  <Heart className={liked ? "fill-destructive text-destructive" : ""} />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full" aria-label="Share">
                  <Share2 />
                </Button>
              </div>

              {/* Seller */}
              <div className="mt-6 rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <img src={product.seller.avatar} alt="" className="h-12 w-12 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold">{product.seller.name}</span>
                      {product.seller.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {product.seller.college} · ★ {product.seller.rating}
                    </div>
                  </div>
                  <Link to="/chat">
                    <Button size="sm" className="rounded-full">
                      <MessageCircle className="h-4 w-4" /> Chat
                    </Button>
                  </Link>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 rounded-xl bg-secondary/60 p-3">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Verified college email</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-secondary/60 p-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Member since 2024</span>
                  </div>
                </div>
              </div>

              {/* Meet up */}
              <div className="mt-4 rounded-2xl border border-dashed border-border bg-card p-5">
                <div className="text-sm font-semibold">Suggested meet-up</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Both of you study near the Central Library. Tap below to coordinate a safe spot.
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Central Library", "Cafeteria Block C", "Main Gate"].map((p) => (
                    <button key={p} className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs hover:bg-secondary">
                      📍 {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Similar */}
          <section className="mt-20">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Similar listings</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {similar.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

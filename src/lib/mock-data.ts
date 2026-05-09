export type Category =
  | "Books" | "Gadgets" | "Notes" | "Electronics"
  | "Cycles" | "Hostel Essentials" | "Lab Equipment" | "Furniture";

export type Product = {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: Category;
  condition: "New" | "Like New" | "Good" | "Fair";
  image: string;
  images?: string[];
  seller: { name: string; college: string; verified: boolean; rating: number; avatar: string };
  description: string;
  forRent?: boolean;
  rentPerDay?: number;
  postedAgo: string;
};

const img = (q: string, seed: number) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=900&q=70&sig=${seed}`;

export const products: Product[] = [
  {
    id: "p1",
    title: "Engineering Mathematics — B.S. Grewal (44th Ed.)",
    price: 320, originalPrice: 720, category: "Books", condition: "Good",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Aarav Mehta", college: "IIT Delhi", verified: true, rating: 4.9,
      avatar: "https://i.pravatar.cc/120?img=12" },
    description: "Lightly used, no markings on inside pages. A few highlights in chapter 3.",
    postedAgo: "2 days ago",
  },
  {
    id: "p2",
    title: "Apple MacBook Air M1 — 8GB / 256GB",
    price: 54999, originalPrice: 89900, category: "Electronics", condition: "Like New",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Riya Sharma", college: "BITS Pilani", verified: true, rating: 4.8,
      avatar: "https://i.pravatar.cc/120?img=47" },
    description: "Bought 14 months ago. Battery cycles under 90. Box and charger included.",
    postedAgo: "5 hours ago",
  },
  {
    id: "p3",
    title: "Casio FX-991ES Plus Scientific Calculator",
    price: 650, originalPrice: 1100, category: "Gadgets", condition: "Like New",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Karthik R.", college: "NIT Trichy", verified: true, rating: 5.0,
      avatar: "https://i.pravatar.cc/120?img=33" },
    description: "Used for one semester. Works perfectly. Cover included.",
    postedAgo: "1 day ago",
  },
  {
    id: "p4",
    title: "Hercules Roadeo Hybrid Cycle — 21 Speed",
    price: 4200, originalPrice: 9500, category: "Cycles", condition: "Good",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Devansh Kapoor", college: "VIT Vellore", verified: true, rating: 4.6,
      avatar: "https://i.pravatar.cc/120?img=14" },
    description: "Recently serviced. New brake pads and tyres.",
    forRent: true, rentPerDay: 80,
    postedAgo: "3 days ago",
  },
  {
    id: "p5",
    title: "Hostel Study Lamp — Rechargeable LED",
    price: 380, category: "Hostel Essentials", condition: "New",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Meera Iyer", college: "IIT Bombay", verified: true, rating: 4.7,
      avatar: "https://i.pravatar.cc/120?img=20" },
    description: "Brand new, sealed. Brightness adjustable.",
    postedAgo: "6 hours ago",
  },
  {
    id: "p6",
    title: "Data Structures Hand-Written Notes (Sem 3)",
    price: 120, category: "Notes", condition: "Like New",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Ananya Singh", college: "DTU", verified: true, rating: 4.9,
      avatar: "https://i.pravatar.cc/120?img=45" },
    description: "Topper notes — covers full syllabus with diagrams.",
    postedAgo: "1 week ago",
  },
  {
    id: "p7",
    title: "Sony WH-CH520 Wireless Headphones",
    price: 2800, originalPrice: 4499, category: "Gadgets", condition: "Like New",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Ishaan Verma", college: "IIIT Hyderabad", verified: true, rating: 4.8,
      avatar: "https://i.pravatar.cc/120?img=15" },
    description: "Used for 4 months. Excellent battery life.",
    postedAgo: "2 days ago",
  },
  {
    id: "p8",
    title: "Foldable Study Table — Wood Finish",
    price: 950, category: "Furniture", condition: "Good",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Tanvi Patel", college: "MIT Manipal", verified: false, rating: 4.3,
      avatar: "https://i.pravatar.cc/120?img=22" },
    description: "Selling because moving out. Sturdy and clean.",
    postedAgo: "4 days ago",
  },
  {
    id: "p9",
    title: "Digital Multimeter — Lab Grade",
    price: 720, category: "Lab Equipment", condition: "Like New",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Rohan Das", college: "IIT Kharagpur", verified: true, rating: 4.9,
      avatar: "https://i.pravatar.cc/120?img=8" },
    description: "Used for 1 EE lab. Calibrated, pristine condition.",
    postedAgo: "12 hours ago",
  },
  {
    id: "p10",
    title: "iPad 9th Gen 64GB Wi-Fi + Apple Pencil",
    price: 19500, originalPrice: 33900, category: "Electronics", condition: "Good",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Sneha Rao", college: "NIT Surathkal", verified: true, rating: 4.7,
      avatar: "https://i.pravatar.cc/120?img=49" },
    description: "Perfect for note-taking. Comes with case and Pencil.",
    forRent: true, rentPerDay: 250,
    postedAgo: "1 day ago",
  },
  {
    id: "p11",
    title: "Resnick Halliday — Physics Vol. 1 & 2",
    price: 540, originalPrice: 1300, category: "Books", condition: "Good",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Aditya Joshi", college: "IIT Madras", verified: true, rating: 4.8,
      avatar: "https://i.pravatar.cc/120?img=11" },
    description: "Both volumes. Clean pages. Great for JEE & first-year physics.",
    postedAgo: "3 days ago",
  },
  {
    id: "p12",
    title: "Mini Refrigerator — 50L (Hostel Friendly)",
    price: 3800, originalPrice: 6800, category: "Hostel Essentials", condition: "Good",
    image: "https://images.unsplash.com/photo-1536353284924-9220c464e262?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Kabir Shah", college: "BITS Goa", verified: true, rating: 4.6,
      avatar: "https://i.pravatar.cc/120?img=7" },
    description: "Compact, low power. Perfect for hostel rooms.",
    postedAgo: "5 days ago",
  },
];

export const categories: { name: Category; emoji: string; count: number }[] = [
  { name: "Books", emoji: "📚", count: 312 },
  { name: "Gadgets", emoji: "🎧", count: 184 },
  { name: "Notes", emoji: "📝", count: 421 },
  { name: "Electronics", emoji: "💻", count: 96 },
  { name: "Cycles", emoji: "🚲", count: 58 },
  { name: "Hostel Essentials", emoji: "🛏️", count: 142 },
  { name: "Lab Equipment", emoji: "🔬", count: 47 },
  { name: "Furniture", emoji: "🪑", count: 73 },
];

export const testimonials = [
  { name: "Pranav S.", college: "IIT Delhi",
    quote: "Sold my old textbooks in 2 days. The verified-student badge made buyers trust me instantly.",
    avatar: "https://i.pravatar.cc/120?img=5" },
  { name: "Nikita J.", college: "BITS Pilani",
    quote: "I rented a cycle for the semester instead of buying one. Saved a fortune.",
    avatar: "https://i.pravatar.cc/120?img=32" },
  { name: "Aman G.", college: "VIT Vellore",
    quote: "The AI price suggestion was scary accurate. Listed and sold within 6 hours.",
    avatar: "https://i.pravatar.cc/120?img=17" },
];

export const conversations = [
  { id: "c1", name: "Aarav Mehta", lastMsg: "Sure, we can meet at the library at 5.",
    time: "2m", online: true, unread: 2, avatar: "https://i.pravatar.cc/120?img=12",
    product: "B.S. Grewal Maths" },
  { id: "c2", name: "Riya Sharma", lastMsg: "Is the MacBook still available?",
    time: "1h", online: true, unread: 0, avatar: "https://i.pravatar.cc/120?img=47",
    product: "MacBook Air M1" },
  { id: "c3", name: "Karthik R.", lastMsg: "Cool, I'll bring the calculator tomorrow.",
    time: "3h", online: false, unread: 0, avatar: "https://i.pravatar.cc/120?img=33",
    product: "Casio FX-991ES" },
  { id: "c4", name: "Meera Iyer", lastMsg: "Thanks! Leaving a review now.",
    time: "1d", online: false, unread: 0, avatar: "https://i.pravatar.cc/120?img=20",
    product: "Study Lamp" },
];

export const sampleMessages = [
  { from: "them", text: "Hey! Is the book still available?", time: "10:32" },
  { from: "me", text: "Yes it is — only one copy left though.", time: "10:33" },
  { from: "them", text: "Great! Can we meet today?", time: "10:34" },
  { from: "me", text: "Sure, library entrance at 5 PM works?", time: "10:35" },
  { from: "them", text: "Perfect. See you there 👍", time: "10:36" },
];

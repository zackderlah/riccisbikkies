import Hero from "@/components/home/Hero";
import OriginSection from "@/components/home/OriginSection";
import StorefrontSection from "@/components/home/StorefrontSection";
import ReviewsSection from "@/components/home/ReviewsSection";

export default function HomePage() {
  return (
    <main className="wrapper">
      <Hero />
      <OriginSection />
      <StorefrontSection />
      <ReviewsSection />
    </main>
  );
}

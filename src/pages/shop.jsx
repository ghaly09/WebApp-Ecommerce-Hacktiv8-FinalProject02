import Card from "@/components/Card";
import Navbar from "@/components/Navbar";

export default function Shop() {
  return (
    <section className="container mx-auto max-w-[1000px] mt-5 px-3">
      <Navbar />
      <Card type="shop" />
    </section>
  );
}

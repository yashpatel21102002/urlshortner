import ShortenForm from "@/components/ShortenForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* <Navbar /> */}
      <main className="container mx-auto px-4 py-10">
        <ShortenForm />
        <Footer />
      </main>
    </div>
  );
}

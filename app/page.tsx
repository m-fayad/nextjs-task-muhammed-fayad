import AsideSection from "@/components/layout/aside-section";
import MainSection from "@/components/layout/main-section";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 min-h-screen p-8 pb-20 sm:p-20">
      <MainSection />
      <AsideSection />
    </div>
  );
}

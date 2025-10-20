import { breadcrumbItems } from "@/lib/constants";
import BreadCrumbComponent from "../atoms/BreadCrumbComponent";

const MainSection = () => {
  return (
    <main className="space-y-8">
      <BreadCrumbComponent items={breadcrumbItems} />

      <h1 className="text-2xl">Starting SEO as your Home Based Business</h1>

      {/* Video player that is sticky on top on the mobile devices, but not on the desktop */}
      {/* gap */}
      {/* circlar boxes which contains social icons facebook, twitter, linkedin, youtube... all colored with gray fills */}
    </main>
  );
};

export default MainSection;

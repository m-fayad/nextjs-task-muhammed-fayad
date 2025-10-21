import dynamic from "next/dynamic";
import AsideSection from "@/components/layout/aside-section";
import { breadcrumbItems } from "@/lib/constants";
import BreadCrumbComponent from "@/components/atoms/BreadCrumbComponent";
import VideoPlayer from "@/components/molecules/VideoPlayer";
import SectionalButtons from "@/components/molecules/SectionalButtons";
import CourseMaterialsSection from "@/components/layout/course-material-section";
import { CommentsProvider } from "@/context/CommentsContext";

const CommentsSections = dynamic(
  () => import("@/components/layout/comments-section")
);

export default function Home() {
  return (
    <CommentsProvider>
      <div className="grid grid-cols-1 grid-rows-[30px_70px_300px] md:grid-cols-[1.5fr_1fr] gap-y-4 gap-x-8 min-h-screen p-4 pb-20 sm:p-20">
        <BreadCrumbComponent items={breadcrumbItems} />

        <h1 className="text-2xl font-bold col-start-1">
          Starting SEO as your Home Based Business
        </h1>

        <div className="sticky top-0 z-50 md:static md:col-start-1 md:col-span-1">
          <VideoPlayer />
        </div>

        <SectionalButtons />
        <CourseMaterialsSection />

        <AsideSection />
        <CommentsSections />
      </div>
    </CommentsProvider>
  );
}

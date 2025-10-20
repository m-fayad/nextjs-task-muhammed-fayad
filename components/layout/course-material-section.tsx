import { Book, BookUser, Clock, Globe, User } from "lucide-react";

const CourseMaterialsSection = () => {
  return (
    <section className="col-start-1">
      <h2 className="text-lg font-bold mb-4 capitalize">Course Materials</h2>

      <div className="grid md:grid-cols-2 grid-rows-3 gap-y-2 gap-x-16 md:justify-between divide-y-2 divide-gray-200">
        <div className="flex items-center gap-2">
          <User className="size-4" />
          <span>Instructor:</span>
          <span className="ms-auto">Edward Norton</span>
        </div>

        <div className="w-full flex items-center gap-2">
          <Clock className="size-4" />
          <span>Duration:</span>

          <span className="ms-auto">3 weeks</span>
        </div>

        <div className="w-full flex items-center gap-2">
          <Book className="size-4" />
          <span>Lessons:</span>

          <span className="ms-auto">8</span>
        </div>

        <div className="w-full flex items-center gap-2">
          <BookUser className="size-4" />
          <span>Enrolled:</span>

          <span className="ms-auto">65 students</span>
        </div>

        <div className="w-full flex items-center gap-2">
          <Globe className="size-4" />
          <span>Language:</span>

          <span className="ms-auto">English</span>
        </div>
      </div>
    </section>
  );
};

export default CourseMaterialsSection;

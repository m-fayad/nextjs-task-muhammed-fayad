import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockLeaderboard } from "@/lib/constants";

const LeaderboardModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader className="text-[#080264]">
          <DialogTitle className="text-center font-normal">
            Course Name Shown Here
          </DialogTitle>
          <h2 className="text-center text-xl font-bold">Leaderboard</h2>
        </DialogHeader>

        <div className="bg-[#F5F9FA] p-4 rounded-lg text-sm text-[#080264] flex items-center gap-4">
          عظيم، يا صديقي.. أداءك في الكورس ده أفضل من ٦٠٪ من باقي الطلبة.. كمل
          عايز أشوف اسمك في الليدر بورد هنا
          <span className="text-5xl">💪</span>
        </div>

        <div className="space-y-3 bg-[#F5F9FA] rounded-lg p-6">
          {mockLeaderboard.map((user) => (
            <div
              key={user.rank}
              className="flex items-center gap-3 p-3 bg-white border rounded-lg shadow-sm"
            >
              <span className="font-bold text-gray-500 w-6">{user.rank}.</span>
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="flex-1 font-medium">{user.name}</span>
              <span className="text-sm font-semibold text-green-600">
                {user.score}%
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderboardModal;

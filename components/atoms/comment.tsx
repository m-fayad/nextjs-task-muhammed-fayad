const Comment = ({
  avatar,
  username,
  date,
  content,
}: {
  avatar: string;
  username: string;
  date: string;
  content: string;
}) => {
  return (
    <div className="flex items-start gap-4 pb-2">
      <div className="shrink-0">
        <img
          src={avatar}
          alt={username + " avatar"}
          title={username + " avatar"}
          className="rounded-full"
          width={48}
          height={48}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground font-semibold">
          {username}
        </span>
        <time className="text-xs text-muted-foreground" dateTime={date}>
          {date || "Unknown Date"}
        </time>
        <p className=" mt-1.5 text-sm text-muted-foreground">{content}</p>
      </div>
    </div>
  );
};

export default Comment;

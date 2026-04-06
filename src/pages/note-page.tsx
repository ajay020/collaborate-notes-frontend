import { useParams } from "react-router-dom";
import { useNote } from "../hooks/useNote";

export default function NotePage() {
  const { noteId } = useParams();

  if (!noteId) {
    return <div className="container">Note ID not found</div>;
  }

  const {
    content,
    typingUsers,
    userCount,
    isOwner,
    handleChange,
  } = useNote(noteId);

  // console.log("NotePage render:", { content, isOwner });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-4">
        {/* Top bar */}
        <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-gray-700">Note: {noteId.slice(0, 8)}...</h1>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              {userCount} Online
            </span>
          </div>
          <div className="text-sm italic text-blue-500">
            {typingUsers.length > 0 && "Someone is typing..."}
          </div>
        </div>

        {/* Editor */}
        <textarea
          value={content}
          onChange={(e) => handleChange(e.target.value)}
          className="min-h-[500px] w-full resize-none rounded-xl border-none bg-white p-8 shadow-lg outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Start collaborating..."
        />

        {isOwner && (
          <p className="text-right text-xs text-gray-400">You are the owner of this note</p>
        )}
      </div>
    </div>
  );
}
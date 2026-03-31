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

  console.log("NotePage render:", { content, isOwner });

  return (
    <div className=" w-1/2 h-1/2 mx-auto space-y-4 p-8 bg-slate-100">
      {/* Top bar */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{userCount} users online</span>
        {typingUsers.length > 0 && <span>Someone is typing...</span>}
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={(e) => handleChange(e.target.value)}
        className=" w-full h-full border rounded p-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Start typing..."
      />
    </div>
  );
}
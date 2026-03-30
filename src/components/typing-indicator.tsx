export default function TypingIndicator({ typing }: { typing: boolean }) {
    if (!typing) return null;
    return <p className="typing">Someone is typing...</p>;
}
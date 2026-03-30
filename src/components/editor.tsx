type Props = {
    text: string;
    onChange: (value: string) => void;
    disabled: boolean;
};

export default function Editor({ text, onChange, disabled }: Props) {
    console.log("Rendering editor with text:", text);
    return (
        <textarea
            value={text}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="editor"
            placeholder="Start typing..."
        />
    );
}
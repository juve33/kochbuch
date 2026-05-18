type FractionInputProps =
    Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        "type" | "pattern" | "onChange"
    > & {
        onValueChange?: (
            parsedValue?: number | undefined,
            stringValue?: string | undefined
        ) => void;
    }

const FractionInput = ({ onValueChange, ...props } : FractionInputProps) => {
    const parseFraction = (value: string) => {
        const str = value.trim();

        if (!str) return undefined;

        if (/^\d+(\.\d+)?$/.test(str)) {
            return parseFloat(str);
        }

        if (/^\d+\s*\/\s*\d+$/.test(str)) {
            const [num, den] = str.split("/").map((s) => parseFloat(s.trim()));

            if (den === 0) return undefined;

            return num / den;
        }

        if (/^\d+\s+\d+\s*\/\s*\d+$/.test(str)) {
            const parts = str.split(/\s+/);

            const whole = parseFloat(parts[0]);
            const [num, den] = parts[1].split("/").map((s) => parseFloat(s.trim()));

            if (den === 0) return undefined;

            return whole + (num / den);
        }
    }
    
    return (
        <input
            {...props}
            type="text"
            pattern={[
                "^\\d+(\\.\\d+)?$",
                "^\\d+\\s*\\/\\s*\\d+$",
                "^\\d+\\s+\\d+\\s*\\/\\s*\\d+$"
            ].join("|")}
            onChange={(e) => {
                const parsed = (e.target.validity.valid) ? parseFraction(e.target.value) : undefined;

                onValueChange?.(parsed, e.target.value);
            }}
        />
    )
}

export default FractionInput
import * as React from "react";
import { ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";
import { cn, mergeEventHandlers } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  customOnChange?: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onKeyDown, customOnChange, value, onChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value || "");
    const isControlled = value !== undefined;

    const keyMap: { [key: string]: string } = {
      q: "a", w: "b", e: "c", r: "d", t: "e", y: "f", u: "g", i: "h", o: "i", p: "j", a: "k", s: "l", d: "m",
      f: "n", g: "o", h: "p", j: "q", k: "r", l: "s", z: "t", x: "u", c: "v", v: "w", b: "x", n: "y", m: "z",
      Q: "A", W: "B", E: "C", R: "D", T: "E", Y: "F", U: "G", I: "H", O: "I", P: "J", A: "K", S: "L", D: "M",
      F: "N", G: "O", H: "P", J: "Q", K: "R", L: "S", Z: "T", X: "U", C: "V", V: "W", B: "X", N: "Y", M: "Z"
    };

    const preventCopyPaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      alert("Copying and pasting is not allowed!");
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      isControlled ? customOnChange?.(newValue) : setInternalValue(newValue);
      onChange?.(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (keyMap.hasOwnProperty(event.key)) {
        event.preventDefault();
        const newValue = (isControlled ? value : internalValue) + keyMap[event.key];
        isControlled ? customOnChange?.(newValue) : setInternalValue(newValue);
      }
    };

    const mergedOnKeyDown = mergeEventHandlers<KeyboardEvent<HTMLInputElement>>(
      onKeyDown, handleKeyDown
    );

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        value={isControlled ? value : internalValue}
        onChange={handleChange}
        onKeyDown={mergedOnKeyDown}
        onPaste={preventCopyPaste}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
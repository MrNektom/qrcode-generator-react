import {
  ForwardedRef,
  forwardRef,
  Ref,
  RefCallback,
  RefObject,
  useRef,
} from "react";
import "./TextField.css";

type ChangeHandler = (event: {
  target: any;
  type?: any;
}) => Promise<void | boolean>;

interface ITextFieldProps {
  label?: string;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  name: string;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
}

export const TextField = forwardRef(
  (
    { label, ...other }: ITextFieldProps,
    ref: ForwardedRef<HTMLInputElement | null>
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    function onClick() {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }

    function updateRef(inp: HTMLInputElement | null) {
      inputRef.current = inp;
      if (typeof ref == "function") {
        ref(inp);
      } else if (ref && typeof ref == "object") {
        ref.current = inp;
      }
    }

    return (
      <div className="TextField" onClick={onClick}>
        <input
          className="TextField_input"
          type="text"
          placeholder="."
          {...other}
          ref={updateRef}
        />
        {label && <div className="TextField_label">{label}</div>}
      </div>
    );
  }
);

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="ps-2 w-full rounded-md py-2 pr-10 border border-gray-300"
        placeholder={placeholder}
        required
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;

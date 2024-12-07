/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "./ui/input";

export default function EditableLabel({
  value,
  onChange,
  defaultValue,
  placeholder,
  className,
  classNameLabel,
}: any) {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <Input
      value={value || defaultValue}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => setIsEditing(false)}
      onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
      className={className}
      autoFocus
      placeholder={placeholder}
    />
  ) : (
    <h1
      className={"text-sm font-medium text-gray-800 cursor-pointer hover:text-gray-600 "+classNameLabel}
      onClick={() => setIsEditing(true)}
    >
      {value || defaultValue}
    </h1>
  );
}

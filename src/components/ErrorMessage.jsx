import React from "react";

export default function ErrorMessage({ error, message="", className=""}) {
   return error && (
    <span className={`text-red-600 ${className}`}>{message}</span>
  );
}

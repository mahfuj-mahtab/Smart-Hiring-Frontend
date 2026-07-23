import { Label } from "@/components/ui/label";
import { ErrorAlert } from "@/components/feedback/ErrorAlert";

export function FormField({ label, name, error, children, required }) {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-destructive"> *</span>}
        </Label>
      )}
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export function ApiErrorBanner({ message, fieldErrors }) {
  const fieldMessages = fieldErrors
    ? Object.entries(fieldErrors).map(([key, val]) => {
        const text = Array.isArray(val) ? val.join(", ") : val;
        return `${key}: ${text}`;
      })
    : [];

  return (
    <div className="space-y-2">
      {message && <ErrorAlert message={message} />}
      {fieldMessages.map((msg) => (
        <ErrorAlert key={msg} message={msg} />
      ))}
    </div>
  );
}

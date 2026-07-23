export function FormSection({ title, description, children, className = "" }) {
  return (
    <div
      className={`premium-card space-y-5 border-0 p-6 sm:p-7 ${className}`}
    >
      <div>
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

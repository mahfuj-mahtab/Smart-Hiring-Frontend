"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { ImagePlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { FormField, ApiErrorBanner } from "@/components/forms/FormField";
import { FormSection } from "@/components/forms/FormSection";
import { OrganizationPreview } from "@/features/organization/components/OrganizationPreview";
import { EMPLOYEE_SIZE_OPTIONS } from "@/features/organization/constants/organization";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import { MESSAGES } from "@/constants/messages";

function FileUploadZone({ id, name, label, accept, error, currentUrl, previewUrl, onFileChange }) {
  const displayUrl = previewUrl || currentUrl;

  return (
    <FormField label={label} name={name} error={error}>
      <div className="upload-zone-wrapper">
        <div className="upload-zone">
          <input
            id={id}
            name={name}
            type="file"
            accept={accept}
            onChange={onFileChange}
          />
          {displayUrl ? (
            <div className="relative h-20 w-full max-w-xs overflow-hidden rounded-lg">
              <Image
                src={displayUrl}
                alt=""
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ImagePlus className="h-5 w-5" />
            </div>
          )}
          <div>
            <p className="text-sm font-medium">
              {displayUrl ? "Click to replace" : "Click to upload"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              PNG, JPG or WebP
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
            <Upload className="h-3.5 w-3.5" />
            Choose file
          </span>
        </div>
      </div>
    </FormField>
  );
}

export function OrganizationSettingsForm({ action, organization }) {
  const [state, formAction, pending] = useActionState(action, null);
  const [preview, setPreview] = useState({
    name: organization?.name || "",
    industry: organization?.industry || "",
    employee_size: organization?.employee_size || "",
    logo: organization?.logo || null,
    banner: organization?.banner || null,
    employee_size_display: organization?.employee_size_display || "",
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  useActionToast(state, {
    successMessage: MESSAGES.organization.updated,
  });

  const handleFilePreview = (event, setter) => {
    const file = event.target.files?.[0];
    if (file) {
      setter(URL.createObjectURL(file));
    }
  };

  const previewOrg = {
    ...organization,
    ...preview,
    logo: logoPreview || organization?.logo,
    banner: bannerPreview || organization?.banner,
    employee_size_display:
      EMPLOYEE_SIZE_OPTIONS.find((o) => o.value === preview.employee_size)?.label ||
      organization?.employee_size_display ||
      "",
  };

  return (
    <div className="grid gap-8 xl:grid-cols-5">
      <form action={formAction} className="space-y-6 xl:col-span-3">
        <ApiErrorBanner message={state?.message} fieldErrors={state?.fieldErrors} />

        <FormSection
          title="Organization profile"
          description="Customize how your organization appears on your public careers page and subdomain home."
        >
          <FormField label="Organization name" name="name" error={state?.fieldErrors?.name} required>
            <Input
              id="name"
              name="name"
              defaultValue={organization?.name || ""}
              required
              onChange={(e) => setPreview((p) => ({ ...p, name: e.target.value }))}
            />
          </FormField>

          <FormField label="Industry" name="industry" error={state?.fieldErrors?.industry}>
            <Input
              id="industry"
              name="industry"
              defaultValue={organization?.industry || ""}
              placeholder="e.g. Technology, Healthcare"
              onChange={(e) => setPreview((p) => ({ ...p, industry: e.target.value }))}
            />
          </FormField>

          <FormField
            label="Company size"
            name="employee_size"
            error={state?.fieldErrors?.employee_size}
          >
            <NativeSelect
              id="employee_size"
              name="employee_size"
              defaultValue={organization?.employee_size || ""}
              onChange={(e) => {
                const value = e.target.value;
                const label =
                  EMPLOYEE_SIZE_OPTIONS.find((o) => o.value === value)?.label || "";
                setPreview((p) => ({
                  ...p,
                  employee_size: value,
                  employee_size_display: label,
                }));
              }}
            >
              <option value="">Select size</option>
              {EMPLOYEE_SIZE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} employees
                </option>
              ))}
            </NativeSelect>
          </FormField>
        </FormSection>

        <FormSection
          title="Branding"
          description="Upload a logo and banner for your public pages. Logo max 2 MB, banner max 5 MB."
        >
          <FileUploadZone
            id="logo"
            name="logo"
            label="Logo"
            accept="image/png,image/jpeg,image/webp"
            error={state?.fieldErrors?.logo}
            currentUrl={organization?.logo}
            previewUrl={logoPreview}
            onFileChange={(e) => handleFilePreview(e, setLogoPreview)}
          />

          <FileUploadZone
            id="banner"
            name="banner"
            label="Banner"
            accept="image/png,image/jpeg,image/webp"
            error={state?.fieldErrors?.banner}
            currentUrl={organization?.banner}
            previewUrl={bannerPreview}
            onFileChange={(e) => handleFilePreview(e, setBannerPreview)}
          />
        </FormSection>

        <div className="flex justify-end">
          <Button type="submit" variant="gradient" disabled={pending} className="rounded-xl px-8">
            {pending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>

      <div className="xl:col-span-2">
        <div className="sticky top-24">
          <OrganizationPreview organization={previewOrg} />
        </div>
      </div>
    </div>
  );
}

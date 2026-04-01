import { useState, useEffect } from "react";
import CmsLayout from "@/components/CmsLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

// Define all editable site settings with labels and types
const SETTING_GROUPS: { group: string; label: string; fields: { key: string; label: string; type: "text" | "textarea" | "image"; placeholder?: string }[] }[] = [
  {
    group: "hero",
    label: "Homepage Hero",
    fields: [
      { key: "hero_title", label: "Hero Title", type: "text", placeholder: "Group Adventures for 18-35s" },
      { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea", placeholder: "Thailand, Bali & Philippines..." },
      { key: "hero_cta_text", label: "CTA Button Text", type: "text", placeholder: "Explore Tours" },
      { key: "hero_image", label: "Hero Background Image URL", type: "image" },
    ],
  },
  {
    group: "stats",
    label: "Homepage Stats",
    fields: [
      { key: "stats_travellers", label: "Travellers Stat", type: "text", placeholder: "500+" },
      { key: "stats_destinations", label: "Destinations Stat", type: "text", placeholder: "3" },
      { key: "stats_rating", label: "Rating Stat", type: "text", placeholder: "4.9" },
      { key: "stats_reviews", label: "Reviews Count", type: "text", placeholder: "200+" },
    ],
  },
  {
    group: "contact",
    label: "Contact & Social",
    fields: [
      { key: "contact_email", label: "Contact Email", type: "text", placeholder: "hello@acetravel.co.uk" },
      { key: "contact_phone", label: "Phone Number", type: "text", placeholder: "+44 ..." },
      { key: "contact_instagram", label: "Instagram URL", type: "text" },
      { key: "contact_tiktok", label: "TikTok URL", type: "text" },
      { key: "contact_facebook", label: "Facebook URL", type: "text" },
    ],
  },
  {
    group: "seo",
    label: "SEO Defaults",
    fields: [
      { key: "seo_title", label: "Default Page Title", type: "text", placeholder: "ACE Travel Experiences | Group Tours..." },
      { key: "seo_description", label: "Default Meta Description", type: "textarea" },
    ],
  },
  {
    group: "footer",
    label: "Footer",
    fields: [
      { key: "footer_tagline", label: "Footer Tagline", type: "text", placeholder: "Adventures built for 18-35s" },
    ],
  },
];

export default function CmsSettings() {
  const settingsQuery = trpc.cms.settings.getAll.useQuery();
  const bulkSave = trpc.cms.settings.bulkSave.useMutation({
    onSuccess: () => { settingsQuery.refetch(); toast.success("Settings saved"); },
    onError: (e) => toast.error(e.message),
  });

  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (settingsQuery.data) {
      const map: Record<string, string> = {};
      settingsQuery.data.forEach((s) => { map[s.key] = s.value ?? ""; });
      setValues(map);
    }
  }, [settingsQuery.data]);

  const handleSave = (group: string) => {
    const fields = SETTING_GROUPS.find((g) => g.group === group)?.fields ?? [];
    const payload = fields.map((f) => ({ key: f.key, value: values[f.key] ?? "" }));
    bulkSave.mutate(payload);
  };

  if (settingsQuery.isLoading) {
    return (
      <CmsLayout title="Site Settings">
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-400" /></div>
      </CmsLayout>
    );
  }

  return (
    <CmsLayout title="Site Settings">
      <div className="max-w-2xl mx-auto space-y-8">
        <p className="text-gray-400 text-sm">Edit global site content. Changes take effect immediately after saving.</p>

        {SETTING_GROUPS.map((group) => (
          <div key={group.group} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold">{group.label}</h2>
              <Button
                size="sm"
                onClick={() => handleSave(group.group)}
                disabled={bulkSave.isPending}
                className="bg-teal-500 hover:bg-teal-400 text-gray-950"
              >
                {bulkSave.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
                Save
              </Button>
            </div>
            {group.fields.map((field) => (
              <div key={field.key} className="space-y-1.5">
                <Label className="text-gray-300 text-sm">{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    value={values[field.key] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white min-h-[80px]"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <Input
                    value={values[field.key] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder={field.placeholder}
                  />
                )}
                {field.type === "image" && values[field.key] && (
                  <img src={values[field.key]} alt="Preview" className="mt-2 h-24 w-auto rounded-lg object-cover border border-gray-700" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </CmsLayout>
  );
}

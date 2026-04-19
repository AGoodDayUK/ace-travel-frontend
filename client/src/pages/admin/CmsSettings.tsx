import { useState, useEffect } from "react";
import CmsLayout from "@/components/CmsLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

const SETTING_GROUPS: {
  group: string; label: string; description?: string;
  fields: { key: string; label: string; type: "text" | "textarea" | "image"; placeholder?: string; hint?: string }[];
}[] = [
  {
    group: "hero",
    label: "Homepage Hero",
    description: "The main banner shown at the top of the homepage.",
    fields: [
      { key: "hero_title", label: "Hero Title", type: "text", placeholder: "Group Adventures for 18-35s" },
      { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea", placeholder: "Thailand, Bali & Philippines..." },
      { key: "hero_cta_text", label: "CTA Button Text", type: "text", placeholder: "Explore Tours" },
      { key: "hero_image", label: "Hero Background Image", type: "image" },
    ],
  },
  {
    group: "stats",
    label: "Homepage Stats Bar",
    description: "The numbers displayed in the stats strip below the hero.",
    fields: [
      { key: "stats_travellers", label: "Travellers (e.g. 800+)", type: "text", placeholder: "800+" },
      { key: "stats_deposit", label: "Deposit Amount (e.g. £60)", type: "text", placeholder: "£60" },
      { key: "stats_rating", label: "Rating (e.g. 4.9★)", type: "text", placeholder: "4.9★" },
      { key: "stats_destinations", label: "Destinations Count (e.g. 3)", type: "text", placeholder: "3" },
      { key: "stats_reviews", label: "Reviews Count (e.g. 200+)", type: "text", placeholder: "200+" },
    ],
  },
  {
    group: "contact",
    label: "Contact & Social",
    description: "Used in the footer, contact page, and WhatsApp chat button.",
    fields: [
      { key: "contact_email", label: "Contact Email", type: "text", placeholder: "admin@acetravelexperiences.com" },
      { key: "contact_phone", label: "Phone Number", type: "text", placeholder: "+44 7450 996 347" },
      { key: "contact_whatsapp", label: "WhatsApp Number (digits only)", type: "text", placeholder: "447450996347", hint: "Include country code, no spaces or + sign. E.g. 447450996347" },
      { key: "contact_instagram", label: "Instagram URL", type: "text", placeholder: "https://www.instagram.com/acetravelexperiences/" },
      { key: "contact_tiktok", label: "TikTok URL", type: "text", placeholder: "https://www.tiktok.com/@acetravelexperiences" },
      { key: "contact_facebook", label: "Facebook Group URL", type: "text", placeholder: "https://www.facebook.com/groups/..." },
    ],
  },
  {
    group: "seo",
    label: "SEO Defaults",
    description: "Default meta tags used when a page doesn't have its own.",
    fields: [
      { key: "seo_title", label: "Default Page Title", type: "text", placeholder: "ACE Travel Experiences | Group Tours for 18-35s" },
      { key: "seo_description", label: "Default Meta Description", type: "textarea", placeholder: "Group adventures to Thailand, Bali and the Philippines..." },
    ],
  },
  {
    group: "footer",
    label: "Footer",
    fields: [
      { key: "footer_tagline", label: "Footer Tagline", type: "text", placeholder: "Adventures built for 18-35s" },
    ],
  },
  {
    group: "about",
    label: "About Page",
    description: "Content for the /about page.",
    fields: [
      { key: "about_hero_title", label: "Hero Title", type: "text", placeholder: "Born from a love of travel, built for adventurers." },
      { key: "about_hero_text", label: "Hero Text", type: "textarea", placeholder: "We're not just a travel company..." },
      { key: "about_hero_image", label: "Hero Image", type: "image" },
      { key: "about_team_title", label: "Team Section Title", type: "text", placeholder: "The A-ce Team" },
      { key: "about_team_subtitle", label: "Team Section Subtitle", type: "textarea", placeholder: "Behind every incredible trip..." },
      { key: "about_team_member1_name", label: "Team Member 1 — Name", type: "text", placeholder: "Jay" },
      { key: "about_team_member1_role", label: "Team Member 1 — Role", type: "text", placeholder: "Operations Manager" },
      { key: "about_team_member1_bio", label: "Team Member 1 — Bio", type: "textarea", placeholder: "The engine behind every tour..." },
      { key: "about_team_member1_image", label: "Team Member 1 — Photo", type: "image" },
      { key: "about_team_member2_name", label: "Team Member 2 — Name", type: "text", placeholder: "Ruby" },
      { key: "about_team_member2_role", label: "Team Member 2 — Role", type: "text", placeholder: "Social Media Manager" },
      { key: "about_team_member2_bio", label: "Team Member 2 — Bio", type: "textarea", placeholder: "The face behind the content..." },
      { key: "about_team_member2_image", label: "Team Member 2 — Photo", type: "image" },
      { key: "about_team_member3_name", label: "Team Member 3 — Name", type: "text", placeholder: "Mollie" },
      { key: "about_team_member3_role", label: "Team Member 3 — Role", type: "text", placeholder: "Trip Manager" },
      { key: "about_team_member3_bio", label: "Team Member 3 — Bio", type: "textarea", placeholder: "Your on-the-ground guide..." },
      { key: "about_team_member3_image", label: "Team Member 3 — Photo", type: "image" },
    ],
  },
  {
    group: "scuba",
    label: "Scuba Diving Add-On",
    description: "Prices and descriptions shown on the Scuba Diving page and tour detail pages.",
    fields: [
      { key: "scuba_basic_price", label: "Basic Diver Price (e.g. £100)", type: "text", placeholder: "£100" },
      { key: "scuba_open_water_price", label: "Open Water Price (e.g. £350)", type: "text", placeholder: "£350" },
      { key: "scuba_basic_description", label: "Basic Diver Short Description", type: "textarea", placeholder: "Perfect introduction to scuba diving..." },
      { key: "scuba_open_water_description", label: "Open Water Short Description", type: "textarea", placeholder: "Get your internationally recognised PADI certification..." },
      { key: "scuba_hero_image", label: "Scuba Hero Image", type: "image" },
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
  const [savingGroup, setSavingGroup] = useState<string | null>(null);

  useEffect(() => {
    if (settingsQuery.data) {
      const map: Record<string, string> = {};
      settingsQuery.data.forEach((s) => { map[s.key] = s.value ?? ""; });
      setValues(map);
    }
  }, [settingsQuery.data]);

  const handleSave = async (group: string) => {
    setSavingGroup(group);
    const fields = SETTING_GROUPS.find((g) => g.group === group)?.fields ?? [];
    const payload = fields.map((f) => ({ key: f.key, value: values[f.key] ?? "" }));
    await bulkSave.mutateAsync(payload).finally(() => setSavingGroup(null));
  };

  if (settingsQuery.isLoading) {
    return (
      <CmsLayout title="Site Settings">
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-teal-500" /></div>
      </CmsLayout>
    );
  }

  return (
    <CmsLayout title="Site Settings">
      <div className="max-w-2xl mx-auto space-y-6">
        <p className="text-gray-500 text-sm">Edit global site content. Each section saves independently — click <strong>Save</strong> within a section to apply changes.</p>

        {SETTING_GROUPS.map((group) => (
          <div key={group.group} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {/* Section header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/60">
              <div>
                <h2 className="text-gray-900 font-semibold text-sm">{group.label}</h2>
                {group.description && <p className="text-gray-400 text-xs mt-0.5">{group.description}</p>}
              </div>
              <Button
                size="sm"
                onClick={() => handleSave(group.group)}
                disabled={savingGroup === group.group}
                className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm h-8 px-3 text-xs"
              >
                {savingGroup === group.group ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
                Save
              </Button>
            </div>

            {/* Fields */}
            <div className="px-6 py-5 space-y-5">
              {group.fields.map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">{field.label}</Label>
                  {field.type === "image" ? (
                    <ImageUploadField
                      label=""
                      value={values[field.key] ?? ""}
                      onChange={(url) => setValues((v) => ({ ...v, [field.key]: url }))}
                      previewHeight="h-28"
                    />
                  ) : field.type === "textarea" ? (
                    <Textarea
                      value={values[field.key] ?? ""}
                      onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                      className="border-gray-200 text-gray-900 min-h-[80px] focus:border-teal-400"
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <Input
                      value={values[field.key] ?? ""}
                      onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                      className="border-gray-200 text-gray-900 focus:border-teal-400"
                      placeholder={field.placeholder}
                    />
                  )}
                  {field.hint && <p className="text-gray-400 text-xs">{field.hint}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CmsLayout>
  );
}

import { trpc } from "@/lib/trpc";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TourSelectFieldProps {
  label?: string;
  /** The currently selected tour ID (number) or null */
  tourId: number | null;
  /** The currently selected tour name (string) or null — kept in sync */
  tourName?: string | null;
  /** Called with { id, name } when a tour is selected, or null when cleared */
  onChange: (tour: { id: number; name: string; slug: string } | null) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

/**
 * A dropdown that loads tours from the database and lets the user pick one.
 * Replaces manual "Tour Name" text inputs throughout the CMS.
 */
export function TourSelectField({
  label,
  tourId,
  onChange,
  className,
  placeholder = "Select a tour (optional)",
  required = false,
}: TourSelectFieldProps) {
  const toursQuery = trpc.cms.tours.list.useQuery();
  const tours = toursQuery.data ?? [];

  const handleChange = (value: string) => {
    if (value === "__none__") {
      onChange(null);
      return;
    }
    const tour = tours.find((t) => String(t.id) === value);
    if (tour) {
      onChange({ id: tour.id, name: tour.name, slug: tour.slug });
    }
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <Label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </Label>
      )}
      <Select
        value={tourId ? String(tourId) : "__none__"}
        onValueChange={handleChange}
        disabled={toursQuery.isLoading}
      >
        <SelectTrigger className="border-gray-200 bg-white text-gray-900 focus:border-teal-400 focus:ring-teal-400/20">
          <SelectValue placeholder={toursQuery.isLoading ? "Loading tours..." : placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-200 shadow-lg">
          {!required && (
            <SelectItem value="__none__" className="text-gray-400 focus:bg-gray-50">
              — No tour linked —
            </SelectItem>
          )}
          {tours.map((tour) => (
            <SelectItem
              key={tour.id}
              value={String(tour.id)}
              className="text-gray-900 focus:bg-teal-50 focus:text-teal-700"
            >
              {tour.name}
              <span className="text-gray-400 text-xs ml-2">({tour.destination})</span>
            </SelectItem>
          ))}
          {tours.length === 0 && !toursQuery.isLoading && (
            <div className="px-3 py-2 text-xs text-gray-400">No tours found. Create a tour first.</div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}

import { PencilLine, X, Star, ActivitySquare } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavbarContext } from "@/context/NavbarContext";

const API_BASE = import.meta.env.VITE_API_URL ?? "https://cbc-hackaton-urcst-bn.onrender.com/api";

interface DoctorProfile {
  id: string;
  email: string;
  name: string;
  specialty: string;
  languages: string[];
  phone: string;
  isAvailable: boolean;
  rating: number;
  totalSessions: number;
  createdAt: string;
}

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

const Field = ({
  label,
  value,
  type = "text",
  editable,
  onChange,
}: {
  label: string;
  value: string;
  type?: string;
  editable: boolean;
  onChange?: (v: string) => void;
}) => (
  <div>
    <span className="block text-muted-foreground/65 text-sm">{label}</span>
    <Input
      type={type}
      value={value}
      readOnly={!editable}
      onChange={(e) => onChange?.(e.target.value)}
      className={
        editable
          ? "!h-10 font-normal"
          : "border-none font-normal shadow-none p-0 !h-fit !ring-0 !outline-none -mt-1 !text-base"
      }
    />
  </div>
);

const PublicProfileOverview = () => {
  const { setBreadcrumb } = useNavbarContext();
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [draft, setDraft] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setBreadcrumb({
      links: [{ label: "Public", href: "?tab=profile" }],
      page: "Profile",
    });
  }, [setBreadcrumb]);

  useEffect(() => {
    fetch(`${API_BASE}/doctor/me`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((json) => {
        if (json.status === "success") {
          setProfile(json.data);
          setDraft(json.data);
        } else {
          setError(json.message ?? "Failed to load profile.");
        }
      })
      .catch(() => setError("Network error."))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/doctor/me`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          name: draft.name,
          phone: draft.phone,
          specialty: draft.specialty,
          languages: draft.languages,
          isAvailable: draft.isAvailable,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setProfile(json.data ?? draft);
        setEditMode(false);
      } else {
        setError(json.message ?? "Failed to save.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16 text-muted-foreground text-sm">
        Loading profile…
      </div>
    );
  }

  if (error || !profile || !draft) {
    return (
      <div className="text-sm text-red-500 py-8">{error ?? "Profile not found."}</div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <figure className="bg-muted/60 size-20 md:size-28 border rounded-full overflow-hidden flex items-center justify-center shrink-0">
            <img src="/user-profile.png" alt={profile.name} className="size-full object-cover opacity-80" />
          </figure>
          <div>
            <h2 className="text-2xl md:text-3xl font-medium">{profile.name}</h2>
            <p className="text-primary font-medium text-sm mt-1">{profile.specialty}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="size-4 fill-yellow-400 stroke-yellow-400" />
              <span className="text-sm font-medium">{profile.rating}</span>
              <span className="text-xs text-muted-foreground ml-1">· {profile.totalSessions} sessions</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {editMode ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="size-4 mr-1" />Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
              <PencilLine className="size-4 mr-1" />Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-primary">{profile.totalSessions}</p>
          <p className="text-xs text-muted-foreground mt-1">Total Sessions</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{profile.rating}</p>
          <p className="text-xs text-muted-foreground mt-1">Rating</p>
        </div>
        <div className={`${profile.isAvailable ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"} border rounded-lg p-4 text-center`}>
          <div className="flex justify-center">
            <ActivitySquare className={`size-7 ${profile.isAvailable ? "text-green-600" : "text-gray-400"}`} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {profile.isAvailable ? "Available" : "Unavailable"}
          </p>
        </div>
      </div>

      {/* Fields */}
      <form onSubmit={(e) => e.preventDefault()} className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
        <div className="space-y-5">
          <h5 className="font-medium text-lg">Contact Information</h5>
          <Field
            label="Full Name"
            value={draft.name}
            editable={editMode}
            onChange={(v) => setDraft({ ...draft, name: v })}
          />
          <Field label="Email" value={draft.email} type="email" editable={false} />
          <Field
            label="Phone"
            value={draft.phone}
            type="tel"
            editable={editMode}
            onChange={(v) => setDraft({ ...draft, phone: v })}
          />
        </div>
        <div className="space-y-5">
          <h5 className="font-medium text-lg">Professional Details</h5>
          <Field
            label="Specialty"
            value={draft.specialty}
            editable={editMode}
            onChange={(v) => setDraft({ ...draft, specialty: v })}
          />
          <div>
            <span className="block text-muted-foreground/65 text-sm">Languages</span>
            {editMode ? (
              <Input
                value={draft.languages.join(", ")}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    languages: e.target.value.split(",").map((l) => l.trim()).filter(Boolean),
                  })
                }
                placeholder="e.g. English, Kinyarwanda"
                className="!h-10 font-normal"
              />
            ) : (
              <p className="text-base mt-1">{profile.languages.join(", ")}</p>
            )}
          </div>
          <div>
            <span className="block text-muted-foreground/65 text-sm mb-1">Availability</span>
            {editMode ? (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.isAvailable}
                  onChange={(e) => setDraft({ ...draft, isAvailable: e.target.checked })}
                  className="size-4"
                />
                <span className="text-sm">Available for bookings</span>
              </label>
            ) : (
              <span className={`text-sm font-medium ${profile.isAvailable ? "text-green-600" : "text-gray-500"}`}>
                {profile.isAvailable ? "Available" : "Not available"}
              </span>
            )}
          </div>
          <div>
            <span className="block text-muted-foreground/65 text-sm">Member since</span>
            <p className="text-base mt-1">
              {new Date(profile.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PublicProfileOverview;

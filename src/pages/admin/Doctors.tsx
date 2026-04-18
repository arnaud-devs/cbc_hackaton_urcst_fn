import { useEffect, useState } from "react";
import { useNavbarContext } from "@/context/NavbarContext";
import { useSidebar } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Star,
  Phone,
  CheckCircle,
  XCircle,
  Plus,
  Copy,
  Check,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

interface Doctor {
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

interface CreateForm {
  email: string;
  name: string;
  specialty: string;
  languages: string;
  phone: string;
}

const SPECIALTIES = [
  "General Practice",
  "HIV/AIDS & Infectious Diseases",
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Psychiatry",
  "Oncology",
  "Radiology",
  "Surgery",
  "Sexual Health",
];

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

const AdminDoctors = () => {
  const { setDashTitle, setBreadcrumb } = useNavbarContext();
  const { setActiveItem } = useSidebar();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Create doctor dialog
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState<CreateForm>({
    email: "",
    name: "",
    specialty: SPECIALTIES[0],
    languages: "English, Kinyarwanda",
    phone: "",
  });

  // Temporary password dialog
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDashTitle("Doctors");
    setBreadcrumb(undefined);
    setActiveItem("Doctors");
  }, [setActiveItem, setBreadcrumb, setDashTitle]);

  useEffect(() => {
    fetch(`${API_BASE}/admin/doctors`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((json) => {
        if (json.status === "success") setDoctors(json.data);
        else setError(json.message ?? "Failed to load doctors.");
      })
      .catch(() => setError("Network error."))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/admin/doctors`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          specialty: form.specialty,
          phone: form.phone,
          languages: form.languages
            .split(",")
            .map((l) => l.trim())
            .filter(Boolean),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setFormError(
          json.details?.join(", ") ?? json.message ?? "Failed to create doctor."
        );
        return;
      }
      setDoctors((prev) => [json.data.doctor, ...prev]);
      setTempPassword(json.data.temporaryPassword);
      setShowCreate(false);
      setForm({ email: "", name: "", specialty: SPECIALTIES[0], languages: "English, Kinyarwanda", phone: "" });
    } catch {
      setFormError("Network error.");
    } finally {
      setSaving(false);
    }
  };

  const copyPassword = () => {
    if (!tempPassword) return;
    navigator.clipboard.writeText(tempPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="size-full overflow-hidden space-y-6 bg-background rounded-md shadow-xl/5 p-4 sm:p-5 md:p-7">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative h-fit w-full max-w-[22rem]">
          <Search className="absolute inset-y-0 my-auto left-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or specialty…"
            className="pl-9 !ring-0 focus-visible:border-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{filtered.length} doctors</span>
          <Button size="sm" onClick={() => setShowCreate(true)}>
            <Plus className="size-4 mr-1" />
            Add Doctor
          </Button>
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-16 text-muted-foreground text-sm">
          Loading doctors…
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex justify-center py-16 text-muted-foreground text-sm">
          No doctors found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground text-left">
                <th className="pb-3 font-medium pl-2">Doctor</th>
                <th className="pb-3 font-medium">Specialty</th>
                <th className="pb-3 font-medium">Phone</th>
                <th className="pb-3 font-medium">Languages</th>
                <th className="pb-3 font-medium">Rating</th>
                <th className="pb-3 font-medium">Sessions</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc) => (
                <tr key={doc.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="py-3 pl-2">
                    <div className="flex items-center gap-3">
                      <figure className="size-9 rounded-full bg-muted overflow-hidden shrink-0">
                        <img src="/user-profile.png" alt={doc.name} className="size-full object-cover opacity-80" />
                      </figure>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-primary font-medium">{doc.specialty}</td>
                  <td className="py-3">
                    <a href={`tel:${doc.phone}`} className="flex items-center gap-1 hover:underline">
                      <Phone className="size-3.5" />{doc.phone}
                    </a>
                  </td>
                  <td className="py-3 text-muted-foreground">{doc.languages.join(", ")}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <Star className="size-3.5 fill-yellow-400 stroke-yellow-400" />
                      <span>{doc.rating}</span>
                    </div>
                  </td>
                  <td className="py-3">{doc.totalSessions}</td>
                  <td className="py-3">
                    {doc.isAvailable ? (
                      <span className="flex items-center gap-1 text-green-600 text-xs">
                        <CheckCircle className="size-3.5" /> Available
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-muted-foreground text-xs">
                        <XCircle className="size-3.5" /> Unavailable
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Doctor Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Doctor</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4 pt-1">
            {formError && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                {formError}
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1 block">Full Name</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Dr. Jane Mutesi"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="dr.jane@gencarehub.rw"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone</label>
              <Input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+250788100200"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Specialty</label>
              <select
                value={form.specialty}
                onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Languages</label>
              <Input
                value={form.languages}
                onChange={(e) => setForm({ ...form, languages: e.target.value })}
                placeholder="English, Kinyarwanda"
              />
              <p className="text-xs text-muted-foreground mt-1">Comma-separated</p>
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Creating…" : "Create Doctor"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Temporary Password Dialog */}
      <Dialog open={!!tempPassword} onOpenChange={() => setTempPassword(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Doctor Account Created</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-1">
            <p className="text-sm text-muted-foreground">
              Share this temporary password with the doctor. They should change it on first login.
            </p>
            <div className="flex items-center gap-2 bg-muted rounded-md px-3 py-2">
              <code className="flex-1 text-sm font-mono tracking-wider">
                {tempPassword}
              </code>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 shrink-0"
                onClick={copyPassword}
              >
                {copied ? (
                  <Check className="size-4 text-green-600" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
            <Button className="w-full" onClick={() => setTempPassword(null)}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDoctors;

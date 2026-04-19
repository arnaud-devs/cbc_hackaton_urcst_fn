import { useEffect, useState } from "react";
import { useNavbarContext } from "@/context/NavbarContext";
import { useSidebar } from "@/components/ui/sidebar";
import { Clock, CheckCircle, XCircle, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const API_BASE = import.meta.env.VITE_API_URL ?? "https://cbc-hackaton-urcst-bn.onrender.com/api";

interface Service {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  isActive: boolean;
  createdAt: string;
}

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

const ServiceForm = ({
  onSubmit,
  onCancel,
  loading,
}: {
  onSubmit: (data: Omit<Service, "id" | "createdAt">) => void;
  onCancel: () => void;
  loading: boolean;
}) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    durationMinutes: 30,
    isActive: true,
  });

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
      className="space-y-4"
    >
      <div>
        <label className="text-sm font-medium mb-1 block">Service Name</label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. HIV/STI Testing & Counseling"
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Description</label>
        <Textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Duration (minutes)</label>
        <Input
          type="number"
          min={5}
          step={5}
          value={form.durationMinutes}
          onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })}
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isActive"
          checked={form.isActive}
          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          className="size-4"
        />
        <label htmlFor="isActive" className="text-sm">Active</label>
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : "Save Service"}
        </Button>
      </div>
    </form>
  );
};

const Services = () => {
  const { setDashTitle, setBreadcrumb } = useNavbarContext();
  const { setActiveItem } = useSidebar();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setDashTitle("Services");
    setBreadcrumb(undefined);
    setActiveItem("Services");
  }, [setActiveItem, setBreadcrumb, setDashTitle]);

  useEffect(() => {
    fetch(`${API_BASE}/admin/services`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((json) => {
        if (json.status === "success") setServices(json.data);
        else setError(json.message ?? "Failed to load services.");
      })
      .catch(() => setError("Network error."))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (data: Omit<Service, "id" | "createdAt">) => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/admin/services`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.data) {
        setServices((prev) => [json.data, ...prev]);
        setShowCreate(false);
      } else {
        setError(json.message ?? "Failed to create service.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`${API_BASE}/admin/services/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch {
      setError("Failed to delete service.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="size-full overflow-hidden space-y-7 bg-background rounded-md shadow-xl/5 p-4 sm:p-5 md:p-7">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Health Services</h2>
        <Button onClick={() => setShowCreate(true)} size="sm">
          <Plus className="size-4 mr-1" />
          Add Service
        </Button>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16 text-muted-foreground text-sm">
          Loading services…
        </div>
      ) : services.length === 0 ? (
        <div className="flex justify-center py-16 text-muted-foreground text-sm">
          No services found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-[.95rem] leading-5">{service.name}</h3>
                {service.isActive ? (
                  <span className="flex items-center gap-1 text-green-600 text-xs shrink-0">
                    <CheckCircle className="size-3.5" /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-muted-foreground text-xs shrink-0">
                    <XCircle className="size-3.5" /> Inactive
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3.5" />
                  <span>{service.durationMinutes} min</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(service.id)}
                  disabled={deletingId === service.id}
                  className="h-7 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  {deletingId === service.id ? (
                    <div className="size-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <ServiceForm
            onSubmit={handleCreate}
            onCancel={() => setShowCreate(false)}
            loading={saving}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;

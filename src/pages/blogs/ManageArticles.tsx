import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useArticles } from "@/hooks/useArticles";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { ArticleListSkeleton } from "@/components/ui/loading-states";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CreateArticleRequest } from "@/types/article";

const CATEGORIES = [
  "Sexual Health", "Mental Health", "Nutrition", "Fitness",
  "Pediatrics", "Cardiology", "Diabetes", "General Wellness",
];

const ArticleForm = ({
  initial,
  onSubmit,
  onCancel,
  loading,
}: {
  initial?: Partial<CreateArticleRequest>;
  onSubmit: (data: CreateArticleRequest) => void;
  onCancel: () => void;
  loading: boolean;
}) => {
  const [form, setForm] = useState<CreateArticleRequest>({
    title: initial?.title ?? "",
    content: initial?.content ?? "",
    category: initial?.category ?? CATEGORIES[0],
  });

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
      className="space-y-4"
    >
      <div>
        <label className="text-sm font-medium mb-1 block">Title</label>
        <Input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Category</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Content</label>
        <Textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          rows={8}
          required
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : "Save"}
        </Button>
      </div>
    </form>
  );
};

const ManageArticles = () => {
  const { articles, loading, error, createArticle, updateArticle, deleteArticle } = useArticles();
  const [showCreate, setShowCreate] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();
  useDocumentTitle("Manage Articles");

  const handleCreate = async (data: CreateArticleRequest) => {
    await createArticle(data);
    setShowCreate(false);
  };

  const handleEdit = async (data: CreateArticleRequest) => {
    if (!editId) return;
    await updateArticle(editId, data);
    setEditId(null);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try { await deleteArticle(id); }
    finally { setDeletingId(null); }
  };

  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  if (loading && articles.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Manage Articles</h1>
            <p className="text-muted-foreground">Create, edit, and manage your health articles</p>
          </div>
        </div>
        <ArticleListSkeleton count={6} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  const editingArticle = editId ? articles.find((a) => a.id === editId) : undefined;

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Manage Articles</h1>
            <p className="text-muted-foreground">Create, edit, and manage your health articles</p>
          </div>
          <Button onClick={() => setShowCreate(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Article
          </Button>
        </div>

        {articles.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h3 className="text-lg font-semibold mb-2">No articles yet</h3>
              <p className="text-muted-foreground mb-4">Create your first article to get started</p>
              <Button onClick={() => setShowCreate(true)}>
                <Plus className="w-4 h-4 mr-2" />Create Article
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                    <Badge variant="outline">{article.category}</Badge>
                  </div>
                  <CardDescription>
                    By {article.admin.name} · {formatDate(article.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {article.content.replace(/<[^>]*>/g, "")}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">{article.views} views</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/health/${article.id}`)}>
                      <Eye className="w-4 h-4 mr-1" />View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditId(article.id)}>
                      <Edit className="w-4 h-4 mr-1" />Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(article.id)}
                      disabled={deletingId === article.id}
                      className="text-red-600 hover:text-red-700"
                    >
                      {deletingId === article.id ? (
                        <div className="w-4 h-4 mr-1 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                      ) : (
                        <Trash2 className="w-4 h-4 mr-1" />
                      )}
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Create New Article</DialogTitle></DialogHeader>
          <ArticleForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} loading={loading} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editId} onOpenChange={(open) => !open && setEditId(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Article</DialogTitle></DialogHeader>
          {editingArticle && (
            <ArticleForm
              initial={editingArticle}
              onSubmit={handleEdit}
              onCancel={() => setEditId(null)}
              loading={loading}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageArticles;

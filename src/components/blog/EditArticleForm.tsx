import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from "@/components/ui/rich-text-editor";
import { useArticles } from "@/hooks/useArticles";
import type { Article, CreateArticleRequest } from "@/types/article";
import { toast } from "sonner";

interface EditArticleFormProps {
  article: Article;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const EditArticleForm = ({ article, onSuccess, onCancel }: EditArticleFormProps) => {
  const { updateArticle } = useArticles();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateArticleRequest>({
    title: article.title,
    coverPhoto: article.coverPhoto,
    content: article.content,
    status: article.status,
    // Map categories by title; ArticleCategories contains full category objects
    categories: article.ArticleCategories.map((c) => c.title),
  });

  useEffect(() => {
    setFormData({
      title: article.title,
      coverPhoto: article.coverPhoto,
      content: article.content,
      status: article.status,
      categories: article.ArticleCategories.map((c) => c.title),
    });
  }, [article]);

  const availableCategories = [
    { id: "36501ecc-241b-4260-b175-718fd872cb7f", title: "programming" },
    { id: "8418f8a3-1359-4787-9d3b-5a4d5e37ec99", title: "tech" },
    { id: "cat4", title: "wellness" },
    { id: "cat5", title: "lifestyle" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    setLoading(true);
    try {
      console.log("[EditArticleForm] Submitting update payload:", formData);
      await updateArticle(article.id, formData);
      toast.success("Article updated successfully!");
      onSuccess?.();
    } catch (error) {
      console.error("[EditArticleForm] Article update failed:", error);
      toast.error("Failed to update article");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryTitle: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        categories: [...(prev.categories ?? []), categoryTitle],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        categories: (prev.categories ?? []).filter((title) => title !== categoryTitle),
      }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Article</CardTitle>
        <CardDescription>Update article details and categories.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter article title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverPhoto">Cover Photo URL</Label>
            <Input
              id="coverPhoto"
              value={formData.coverPhoto}
              onChange={(e) => setFormData((prev) => ({ ...prev, coverPhoto: e.target.value }))}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "DRAFT" | "PUBLISHED") =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="grid grid-cols-2 gap-2">
              {availableCategories.map((category) => (
                <label key={category.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={(formData.categories ?? []).includes(category.title)}
                    onChange={(e) => handleCategoryChange(category.title, e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">{category.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <RichTextEditor
              value={formData.content}
              onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
              placeholder="Write your article content here..."
              className="min-h-[300px]"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditArticleForm;



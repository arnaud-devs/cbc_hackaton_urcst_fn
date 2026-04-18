import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from "@/components/ui/rich-text-editor";
import { useArticles } from "@/hooks/useArticles";
import type { CreateArticleRequest } from "@/types/article";
import { toast } from "sonner";

interface CreateArticleFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CLOUDINARY_UPLOAD_PRESET = "first_using_cloudinary"; 
const CLOUDINARY_CLOUD_NAME = "dk60e7ajr";

const CreateArticleForm = ({ onSuccess, onCancel }: CreateArticleFormProps) => {
  const { createArticle } = useArticles();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateArticleRequest>({
    title: "",
    coverPhoto: "",
    content: "",
    status: "DRAFT",
    categories: [],
  });

  const availableCategories = [
    { id: "2", title: "programming" },
    { id: "3", title: "tech" },
    { id: "4", title: "wellness" },
    { id: "5", title: "lifestyle" },
  ];

  // Upload image to Cloudinary
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, coverPhoto: data.secure_url }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    if (!formData.coverPhoto) {
      toast.error("Please upload a cover image");
      return;
    }

    setLoading(true);
    try {
      await createArticle(formData);
      toast.success("Article created successfully!");
      onSuccess?.();
    } catch (error) {
      console.error("Article creation failed:", error);
      toast.error("Failed to create article");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryTitle: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      categories: checked
        ? [...(prev.categories ?? []), categoryTitle]
        : (prev.categories ?? []).filter((title) => title !== categoryTitle),
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Article</CardTitle>
        <CardDescription>Write and publish a new article for your audience.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
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

          {/* Image upload */}
          <div className="space-y-2">
            <Label htmlFor="coverPhoto">Cover Image</Label>
            <Input
              id="coverPhoto"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {uploading && <p className="text-sm text-muted-foreground">Uploading image...</p>}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md mt-2 border"
              />
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "DRAFT" | "PUBLISHED") =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Categories */}
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

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <RichTextEditor
              value={formData.content}
              onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
              placeholder="Write your article content here..."
              className="min-h-[300px]"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button type="submit" disabled={loading || uploading}>
              {loading ? "Creating..." : "Create Article"}
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

export default CreateArticleForm;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useArticles } from "@/hooks/useArticles";
import { default as CreateArticleForm } from "@/components/blog/CreateArticleForm";
import EditArticleForm from "@/components/blog/EditArticleForm";
import { ArticleListSkeleton } from "@/components/ui/loading-states";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const ManageArticles = () => {
  const { articles, loading, error, deleteArticle } = useArticles();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const navigate = useNavigate();

  useDocumentTitle("Manage Articles");

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      console.log('[ManageArticles] Requesting delete for article id:', id);
      await deleteArticle(id);
      console.log('[ManageArticles] Delete completed for article id:', id);
    } catch (error) {
      console.error("[ManageArticles] Failed to delete article:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };


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

  return (
    <>
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Articles</h1>
          <p className="text-muted-foreground">Create, edit, and manage your health articles</p>
        </div>
        
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Article</DialogTitle>
            </DialogHeader>
            <CreateArticleForm 
              onSuccess={() => setShowCreateForm(false)}
              onCancel={() => setShowCreateForm(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {articles.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">No articles yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first article to get started
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Article
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow pt-0
            ">
              <div className="aspect-video overflow-hidden rounded-t-lg ">
                <img
                  src={article.coverPhoto}
                  alt={article.title}
                  className="w-full h-full object-cover bg-center"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                  <Badge variant={article.status === "PUBLISHED" ? "default" : "secondary"}>
                    {article.status}
                  </Badge>
                </div>
                <CardDescription>
                  Created on {formatDate(article.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.content.replace(/<[^>]*>/g, '')}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.ArticleCategories.map((category) => (
                    <Badge key={category.id} variant="outline" className="text-xs">
                      {category.title}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/health/${article.id}`)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setSelectedArticleId(article.id); setShowEditForm(true); }}
                    disabled={deletingId === article.id}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
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

    {/* Edit Article Dialog */}
    <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Article</DialogTitle>
        </DialogHeader>
        {selectedArticleId && (
          <EditArticleForm
            article={articles.find(a => a.id === selectedArticleId)!}
            onSuccess={() => setShowEditForm(false)}
            onCancel={() => setShowEditForm(false)}
          />
        )}
      </DialogContent>
    </Dialog>
    </>
  );
};

export default ManageArticles;

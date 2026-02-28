import { useState, useEffect } from 'react';
import { Bot, Save, Trash2, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useLocalAgentDesigns } from '../hooks/useLocalAgentDesigns';
import { useBackendAgentDesigns } from '../hooks/useBackendAgentDesigns';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

interface AgentDesign {
  name: string;
  roleDescription: string;
}

export function AgentDesigner() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const [currentDesign, setCurrentDesign] = useState<AgentDesign>({
    name: '',
    roleDescription: '',
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const localDesigns = useLocalAgentDesigns();
  const backendDesigns = useBackendAgentDesigns();

  const designs = isAuthenticated ? backendDesigns.designs : localDesigns.designs;
  const isLoading = isAuthenticated ? backendDesigns.isLoading : false;

  const handleSave = () => {
    if (!currentDesign.name.trim()) {
      return;
    }

    if (editingIndex !== null) {
      if (isAuthenticated) {
        backendDesigns.updateDesign(editingIndex, currentDesign);
      } else {
        localDesigns.updateDesign(editingIndex, currentDesign);
      }
      setEditingIndex(null);
    } else {
      if (isAuthenticated) {
        backendDesigns.createDesign(currentDesign);
      } else {
        localDesigns.createDesign(currentDesign);
      }
    }

    setCurrentDesign({ name: '', roleDescription: '' });
  };

  const handleEdit = (index: number) => {
    setCurrentDesign(designs[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    if (isAuthenticated) {
      backendDesigns.deleteDesign(index);
    } else {
      localDesigns.deleteDesign(index);
    }
    if (editingIndex === index) {
      setCurrentDesign({ name: '', roleDescription: '' });
      setEditingIndex(null);
    }
  };

  const handleNew = () => {
    setCurrentDesign({ name: '', roleDescription: '' });
    setEditingIndex(null);
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/time-ai-background.dim_1920x1080.png)' }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 flex items-center gap-3">
              <Bot className="w-8 h-8 text-primary" />
              Design Your AI Agent
            </h1>
            <p className="text-muted-foreground">
              Customize your own AI agent with specific roles, goals, and capabilities
            </p>
            {!isAuthenticated && (
              <p className="text-sm text-accent mt-2">
                Note: Designs are saved locally. Log in to save them to the blockchain.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Designer Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{editingIndex !== null ? 'Edit Agent' : 'New Agent'}</span>
                  {editingIndex !== null && (
                    <Button variant="ghost" size="sm" onClick={handleNew}>
                      <Plus className="w-4 h-4 mr-1" />
                      New
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="agent-name">Agent Name</Label>
                  <Input
                    id="agent-name"
                    placeholder="e.g., Customer Support Agent"
                    value={currentDesign.name}
                    onChange={(e) =>
                      setCurrentDesign({ ...currentDesign, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role-description">Role & Description</Label>
                  <Textarea
                    id="role-description"
                    placeholder="Describe the agent's role, persona, goals, tone, and any constraints..."
                    value={currentDesign.roleDescription}
                    onChange={(e) =>
                      setCurrentDesign({ ...currentDesign, roleDescription: e.target.value })
                    }
                    rows={8}
                  />
                </div>

                <Button
                  onClick={handleSave}
                  disabled={!currentDesign.name.trim()}
                  className="w-full"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingIndex !== null ? 'Update Agent' : 'Save Agent'}
                </Button>
              </CardContent>
            </Card>

            {/* Preview & Saved Designs */}
            <div className="space-y-6">
              {/* Live Preview */}
              <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
                <CardHeader>
                  <CardTitle className="text-lg">Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentDesign.name.trim() ? (
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Agent Name</p>
                        <p className="font-semibold text-foreground">{currentDesign.name}</p>
                      </div>
                      {currentDesign.roleDescription.trim() && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Role & Description</p>
                          <p className="text-sm text-foreground whitespace-pre-wrap">
                            {currentDesign.roleDescription}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      Start designing your agent to see a preview
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Saved Designs */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Saved Designs</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      Loading designs...
                    </p>
                  ) : designs.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      No saved designs yet. Create your first agent above.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {designs.map((design, idx) => (
                        <Card
                          key={idx}
                          className={`${
                            editingIndex === idx ? 'border-accent' : ''
                          }`}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm text-foreground truncate">
                                  {design.name}
                                </h4>
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                  {design.roleDescription || 'No description'}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEdit(idx)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(idx)}
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

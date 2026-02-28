import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { useNextUpgradeSelection, UpgradeTheme } from '../hooks/useNextUpgradeSelection';

export function NextUpgrade() {
  const { getSelection, setSelection, clearSelection, upgradeThemes } = useNextUpgradeSelection();
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  useEffect(() => {
    const saved = getSelection();
    setSelectedThemeId(saved);
    setIsSelectionMode(saved === null);
  }, []);

  const handleSelectTheme = (themeId: string) => {
    setSelection(themeId);
    setSelectedThemeId(themeId);
    setIsSelectionMode(false);
  };

  const handleChangeSelection = () => {
    setIsSelectionMode(true);
  };

  const selectedTheme = upgradeThemes.find((t) => t.id === selectedThemeId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Platform Evolution</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Next Upgrade Planner
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the next strategic upgrade for your TIME AI platform. Your selection helps us
            prioritize development and tailor the roadmap to your needs.
          </p>
        </div>

        {/* Current Selection Summary */}
        {selectedTheme && !isSelectionMode && (
          <Card className="mb-8 border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Current Selection</CardTitle>
                    <CardDescription>Your chosen upgrade theme</CardDescription>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleChangeSelection}
                  className="gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Change
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-accent hover:bg-accent">
                    Selected
                  </Badge>
                  <h3 className="text-lg font-semibold text-foreground">{selectedTheme.title}</h3>
                </div>
                <p className="text-muted-foreground">{selectedTheme.description}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!selectedTheme && !isSelectionMode && (
          <Card className="mb-8 border-dashed">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No Upgrade Selected</h3>
              <p className="text-muted-foreground mb-6">
                Choose your next strategic upgrade to help shape the platform roadmap.
              </p>
              <Button onClick={() => setIsSelectionMode(true)} className="gap-2">
                Choose Upgrade Theme
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Selection Mode */}
        {isSelectionMode && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Available Upgrade Themes</h2>
              <p className="text-muted-foreground">
                Select the upgrade that best aligns with your strategic priorities.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {upgradeThemes.map((theme) => {
                const isSelected = theme.id === selectedThemeId;
                return (
                  <Card
                    key={theme.id}
                    className={`cursor-pointer transition-all hover:shadow-lg hover:border-accent/50 ${
                      isSelected ? 'border-accent bg-accent/5' : ''
                    }`}
                    onClick={() => handleSelectTheme(theme.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        {isSelected && (
                          <Badge variant="default" className="bg-accent hover:bg-accent">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Selected
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{theme.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {theme.description}
                      </CardDescription>
                      <Button
                        variant={isSelected ? 'default' : 'outline'}
                        size="sm"
                        className="w-full mt-4 gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectTheme(theme.id);
                        }}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Selected
                          </>
                        ) : (
                          <>
                            Select This Theme
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {selectedThemeId && (
              <div className="mt-8 text-center">
                <Button
                  variant="ghost"
                  onClick={() => setIsSelectionMode(false)}
                  className="gap-2"
                >
                  View Current Selection
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}

        {/* Info Section */}
        <Card className="mt-12 bg-muted/30">
          <CardContent className="py-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Strategic Priority</h3>
                <p className="text-sm text-muted-foreground">
                  Your selection influences our development roadmap and feature prioritization.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-accent/10 mx-auto mb-3 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Saved Locally</h3>
                <p className="text-sm text-muted-foreground">
                  Your preference is stored in your browser and can be changed anytime.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-secondary/10 mx-auto mb-3 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Flexible Choice</h3>
                <p className="text-sm text-muted-foreground">
                  Change your selection at any time as your priorities evolve.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

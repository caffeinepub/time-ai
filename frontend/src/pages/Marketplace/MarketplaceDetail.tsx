import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Lock, Unlock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { routes } from '../../router/routes';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useMarketplaceItem, useMyMarketplaceUnlocks, useUnlockMarketplaceItem } from '../../hooks/useQueries';

export function MarketplaceDetail() {
  const navigate = useNavigate();
  const { itemId } = useParams({ from: '/marketplace/$itemId' });
  const { identity, login } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: item, isLoading: itemLoading, isError: itemError } = useMarketplaceItem(itemId);
  const { data: unlocks, isLoading: unlocksLoading } = useMyMarketplaceUnlocks();
  const unlockMutation = useUnlockMarketplaceItem();

  const isUnlocked = unlocks?.some((unlock) => unlock.itemId.toString() === itemId);

  const handleUnlock = async () => {
    if (!item) return;
    try {
      await unlockMutation.mutateAsync(item.id);
    } catch (error) {
      console.error('Unlock failed:', error);
    }
  };

  if (itemLoading || unlocksLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse h-64 bg-muted rounded-lg" />
        </div>
      </div>
    );
  }

  if (itemError || !item) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-destructive/50">
            <CardContent className="p-6 text-center">
              <p className="text-destructive mb-4">Failed to load item. It may not exist or there was an error.</p>
              <Button onClick={() => navigate({ to: routes.marketplace.path })}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Marketplace
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate({ to: routes.marketplace.path })}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <CardTitle className="text-2xl flex items-center gap-2">
                {isUnlocked ? (
                  <Unlock className="w-6 h-6 text-accent" />
                ) : (
                  <Lock className="w-6 h-6 text-muted-foreground" />
                )}
                {item.title}
              </CardTitle>
              <Badge variant={isUnlocked ? 'default' : 'outline'} className="text-lg px-3 py-1">
                {item.price.toString()} tokens
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>

            {isUnlocked && (
              <Alert>
                <CheckCircle className="w-4 h-4" />
                <AlertDescription>
                  You have unlocked this item! Access granted.
                </AlertDescription>
              </Alert>
            )}

            {!isUnlocked && (
              <>
                {isAuthenticated ? (
                  <Button
                    onClick={handleUnlock}
                    disabled={unlockMutation.isPending}
                    size="lg"
                    className="w-full"
                  >
                    {unlockMutation.isPending ? 'Unlocking...' : `Unlock for ${item.price.toString()} tokens`}
                  </Button>
                ) : (
                  <Card className="border-accent/20">
                    <CardContent className="p-6 text-center">
                      <Lock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground mb-4">
                        Log in to unlock this item
                      </p>
                      <Button onClick={login} size="lg">
                        Log In
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

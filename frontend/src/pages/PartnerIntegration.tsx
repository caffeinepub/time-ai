import { useState, useEffect } from 'react';
import { Network } from 'lucide-react';
import { partnerIntegrations } from '@/data/partnerIntegrations';
import { PartnerCard } from '@/components/partners/PartnerCard';
import { PartnerDetailsDialog } from '@/components/partners/PartnerDetailsDialog';
import { PartnerFilters } from '@/components/partners/PartnerFilters';
import { usePartnerConnection } from '@/hooks/usePartnerConnection';
import { usePartnerFilters } from '@/hooks/usePartnerFilters';
import { Partner } from '@/types/partners';
import { EmptyState } from '@/components/common/EmptyState';

export function PartnerIntegration() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [enabledPartners, setEnabledPartners] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('enabled-partners');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  const [credentials, setCredentials] = useState<Record<string, Record<string, string>>>(() => {
    const stored = localStorage.getItem('partner-credentials');
    return stored ? JSON.parse(stored) : {};
  });

  const { getConnectionStatus, isConnecting, connectPartner } = usePartnerConnection();

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    filteredPartners,
    resultsCount,
    clearFilters,
  } = usePartnerFilters(partnerIntegrations);

  // Persist enabled partners to localStorage
  useEffect(() => {
    localStorage.setItem('enabled-partners', JSON.stringify([...enabledPartners]));
  }, [enabledPartners]);

  // Persist credentials to localStorage
  useEffect(() => {
    localStorage.setItem('partner-credentials', JSON.stringify(credentials));
  }, [credentials]);

  // Merge connection states with partner data
  const partnersWithStatus = filteredPartners.map((partner) => ({
    ...partner,
    connectionStatus: getConnectionStatus(partner.id),
  }));

  const handleConnect = (partner: Partner) => {
    connectPartner(partner.id, partner.name);
  };

  const handleViewDetails = (partner: Partner) => {
    setSelectedPartner(partner);
    setDialogOpen(true);
  };

  const handleDialogConnect = () => {
    if (selectedPartner) {
      connectPartner(selectedPartner.id, selectedPartner.name);
    }
  };

  const handleTogglePartner = (partnerId: string) => {
    setEnabledPartners((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(partnerId)) {
        newSet.delete(partnerId);
      } else {
        newSet.add(partnerId);
      }
      return newSet;
    });
  };

  const handleCredentialChange = (partnerId: string, fieldName: string, value: string) => {
    setCredentials((prev) => ({
      ...prev,
      [partnerId]: {
        ...(prev[partnerId] || {}),
        [fieldName]: value,
      },
    }));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Network className="w-10 h-10 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Partner Integration Layer
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Connect and manage external partner integrations, API connectors, and data synchronization services
        </p>
      </div>

      {/* Filters Section */}
      <div className="mb-8">
        <PartnerFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          resultsCount={resultsCount}
          totalCount={partnerIntegrations.length}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Integration Settings Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground">
          Integration Settings
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure API credentials for each partner integration below
        </p>
      </div>

      {/* Partner Cards Grid */}
      {partnersWithStatus.length === 0 ? (
        <EmptyState
          title="No partners found"
          description="Try adjusting your filters to see more results."
          icon={<Network className="w-12 h-12 text-muted-foreground" />}
          action={{
            label: 'Clear Filters',
            onClick: clearFilters,
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnersWithStatus.map((partner) => (
            <PartnerCard
              key={partner.id}
              partnerId={partner.id}
              name={partner.name}
              description={partner.description}
              icon={partner.icon}
              connectionStatus={partner.connectionStatus}
              category={partner.category}
              onConnect={() => handleConnect(partner)}
              onViewDetails={() => handleViewDetails(partner)}
              isConnecting={isConnecting(partner.id)}
              isEnabled={enabledPartners.has(partner.id)}
              onToggleEnabled={() => handleTogglePartner(partner.id)}
              apiCredentials={partner.apiCredentials}
              credentials={credentials[partner.id] || {}}
              onCredentialChange={(fieldName, value) => 
                handleCredentialChange(partner.id, fieldName, value)
              }
            />
          ))}
        </div>
      )}

      {/* Partner Details Dialog */}
      <PartnerDetailsDialog
        partner={selectedPartner ? { ...selectedPartner, connectionStatus: getConnectionStatus(selectedPartner.id) } : null}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConnect={handleDialogConnect}
        isConnecting={selectedPartner ? isConnecting(selectedPartner.id) : false}
      />
    </div>
  );
}

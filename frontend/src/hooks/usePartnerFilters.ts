import { useMemo, useState } from 'react';
import { Partner } from '@/types/partners';

export function usePartnerFilters(partners: Partner[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredPartners = useMemo(() => {
    return partners.filter((partner) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'All' || partner.category === selectedCategory;

      // Status filter
      const matchesStatus =
        selectedStatus === 'All' ||
        (selectedStatus === 'Connected' && partner.connectionStatus === 'connected') ||
        (selectedStatus === 'Not Connected' && partner.connectionStatus === 'not_connected');

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [partners, searchQuery, selectedCategory, selectedStatus]);

  const resultsCount = filteredPartners.length;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('All');
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    filteredPartners,
    resultsCount,
    clearFilters,
  };
}

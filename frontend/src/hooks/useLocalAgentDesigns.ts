import { useState, useEffect } from 'react';

interface AgentDesign {
  name: string;
  roleDescription: string;
}

const STORAGE_KEY = 'time-ai-agent-designs';

export function useLocalAgentDesigns() {
  const [designs, setDesigns] = useState<AgentDesign[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setDesigns(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored designs:', e);
      }
    }
  }, []);

  const saveToStorage = (newDesigns: AgentDesign[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDesigns));
    setDesigns(newDesigns);
  };

  const createDesign = (design: AgentDesign) => {
    const newDesigns = [...designs, design];
    saveToStorage(newDesigns);
  };

  const updateDesign = (index: number, design: AgentDesign) => {
    const newDesigns = [...designs];
    newDesigns[index] = design;
    saveToStorage(newDesigns);
  };

  const deleteDesign = (index: number) => {
    const newDesigns = designs.filter((_, idx) => idx !== index);
    saveToStorage(newDesigns);
  };

  return {
    designs,
    createDesign,
    updateDesign,
    deleteDesign,
  };
}

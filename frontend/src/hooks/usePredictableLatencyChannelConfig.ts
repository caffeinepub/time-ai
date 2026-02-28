import { useState, useEffect, useCallback } from 'react';

export interface PredictableLatencyChannelConfig {
  includePerSourceTiming: boolean;
}

export type PresetKey = 'minimal' | 'standard' | 'diagnostics' | 'custom';

export interface Preset {
  key: PresetKey;
  label: string;
  config: PredictableLatencyChannelConfig;
}

const PRESETS: Preset[] = [
  {
    key: 'minimal',
    label: 'Minimal',
    config: {
      includePerSourceTiming: false,
    },
  },
  {
    key: 'standard',
    label: 'Standard',
    config: {
      includePerSourceTiming: false,
    },
  },
  {
    key: 'diagnostics',
    label: 'Diagnostics',
    config: {
      includePerSourceTiming: true,
    },
  },
];

const CONFIG_STORAGE_KEY = 'predictable-latency-channel-config';
const PRESET_STORAGE_KEY = 'predictable-latency-channel-preset';

const DEFAULT_CONFIG: PredictableLatencyChannelConfig = {
  includePerSourceTiming: false,
};

function loadConfigFromStorage(): PredictableLatencyChannelConfig {
  try {
    const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...DEFAULT_CONFIG,
        ...parsed,
      };
    }
  } catch (error) {
    console.error('Failed to load channel config from localStorage:', error);
  }
  return DEFAULT_CONFIG;
}

function saveConfigToStorage(config: PredictableLatencyChannelConfig): void {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Failed to save channel config to localStorage:', error);
  }
}

function loadPresetFromStorage(): PresetKey {
  try {
    const stored = localStorage.getItem(PRESET_STORAGE_KEY);
    if (stored) {
      return stored as PresetKey;
    }
  } catch (error) {
    console.error('Failed to load preset from localStorage:', error);
  }
  return 'standard';
}

function savePresetToStorage(preset: PresetKey): void {
  try {
    localStorage.setItem(PRESET_STORAGE_KEY, preset);
  } catch (error) {
    console.error('Failed to save preset to localStorage:', error);
  }
}

function determinePresetForConfig(config: PredictableLatencyChannelConfig): PresetKey {
  for (const preset of PRESETS) {
    if (
      preset.config.includePerSourceTiming === config.includePerSourceTiming
    ) {
      return preset.key;
    }
  }
  return 'custom';
}

export function usePredictableLatencyChannelConfig() {
  const [config, setConfig] = useState<PredictableLatencyChannelConfig>(() => {
    const loadedConfig = loadConfigFromStorage();
    return loadedConfig;
  });

  const [currentPreset, setCurrentPreset] = useState<PresetKey>(() => {
    const loadedConfig = loadConfigFromStorage();
    const storedPreset = loadPresetFromStorage();
    const determinedPreset = determinePresetForConfig(loadedConfig);
    
    // If stored preset matches the config, use it; otherwise use determined preset
    if (storedPreset !== 'custom') {
      const presetConfig = PRESETS.find(p => p.key === storedPreset)?.config;
      if (presetConfig && 
          presetConfig.includePerSourceTiming === loadedConfig.includePerSourceTiming) {
        return storedPreset;
      }
    }
    
    return determinedPreset;
  });

  useEffect(() => {
    saveConfigToStorage(config);
  }, [config]);

  useEffect(() => {
    savePresetToStorage(currentPreset);
  }, [currentPreset]);

  const updateConfig = useCallback((updates: Partial<PredictableLatencyChannelConfig>) => {
    setConfig((prev) => {
      const newConfig = {
        ...prev,
        ...updates,
      };
      
      // Determine if the new config matches a preset
      const matchedPreset = determinePresetForConfig(newConfig);
      setCurrentPreset(matchedPreset);
      
      return newConfig;
    });
  }, []);

  const applyPreset = useCallback((presetKey: PresetKey) => {
    if (presetKey === 'custom') {
      // Don't change config when selecting custom
      setCurrentPreset('custom');
      return;
    }

    const preset = PRESETS.find((p) => p.key === presetKey);
    if (preset) {
      setConfig(preset.config);
      setCurrentPreset(preset.key);
    }
  }, []);

  return {
    config,
    updateConfig,
    currentPreset,
    applyPreset,
    presets: PRESETS,
  };
}

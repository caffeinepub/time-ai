import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Settings2 } from 'lucide-react';
import { PredictableLatencyChannelConfig, PresetKey, Preset } from '../../hooks/usePredictableLatencyChannelConfig';

export interface PresetPickerProps {
  presets: Preset[];
  currentPreset: PresetKey;
  channelConfig: PredictableLatencyChannelConfig;
  onPresetChange: (preset: PresetKey) => void;
  disabled?: boolean;
}

export function PresetPicker({
  presets,
  currentPreset,
  channelConfig,
  onPresetChange,
  disabled = false,
}: PresetPickerProps) {
  // Helper to get description for each preset
  const getPresetDescription = (key: PresetKey): string => {
    switch (key) {
      case 'minimal':
        return 'Lightweight monitoring with essential metrics only';
      case 'standard':
        return 'Balanced monitoring for typical production workloads';
      case 'diagnostics':
        return 'Comprehensive telemetry including per-source timing';
      case 'custom':
        return 'User-defined configuration';
      default:
        return '';
    }
  };

  // Helper to get key settings preview for each preset
  const getPresetSettings = (preset: Preset): string => {
    const settings: string[] = [];
    if (preset.config.includePerSourceTiming) {
      settings.push('Per-source timing');
    } else {
      settings.push('Aggregate timing only');
    }
    return settings.join(' • ');
  };

  // Helper to determine differences when in custom mode
  const getCustomDiff = (): string[] => {
    const diffs: string[] = [];
    
    for (const preset of presets) {
      const matches = preset.config.includePerSourceTiming === channelConfig.includePerSourceTiming;
      if (matches) {
        return [`Matches ${preset.label} preset`];
      }
    }

    // Show what differs from each preset
    if (channelConfig.includePerSourceTiming) {
      diffs.push('Per-source timing enabled (differs from Minimal/Standard)');
    } else {
      diffs.push('Per-source timing disabled (differs from Diagnostics)');
    }

    return diffs;
  };

  return (
    <div className="space-y-4">
      {currentPreset === 'custom' ? (
        // Custom state panel
        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start gap-3">
              <Settings2 className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm">Custom Configuration</h4>
                  <Badge variant="outline" className="text-xs">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  You've modified settings from the predefined presets. Your current configuration:
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  {getCustomDiff().map((diff, idx) => (
                    <li key={idx} className="text-muted-foreground">• {diff}</li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground mt-3">
                  Select a preset below to return to a predefined configuration.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Preset tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {presets.map((preset) => {
          const isActive = currentPreset === preset.key;
          return (
            <button
              key={preset.key}
              onClick={() => !disabled && onPresetChange(preset.key)}
              disabled={disabled}
              className={`
                relative text-left rounded-lg border-2 transition-all
                ${isActive 
                  ? 'border-primary bg-primary/5 shadow-md' 
                  : 'border-border hover:border-primary/50 hover:bg-accent/50 hover:shadow-sm'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {/* Fixed-height tile structure */}
              <div className="flex flex-col h-full min-h-[140px] p-4">
                {/* Header row with reserved space for active indicator */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h4 className="font-semibold text-sm leading-tight">{preset.label}</h4>
                  <div className="shrink-0 w-4 h-4 flex items-center justify-center">
                    <Check 
                      className={`h-4 w-4 text-primary transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>
                </div>
                
                {/* Description block with controlled wrapping */}
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">
                  {getPresetDescription(preset.key)}
                </p>
                
                {/* Key settings row with consistent separator */}
                <div className="pt-3 border-t border-border/60">
                  <p className="text-xs font-medium text-muted-foreground">
                    {getPresetSettings(preset)}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

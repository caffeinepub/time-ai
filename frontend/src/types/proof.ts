/**
 * TypeScript type definitions for proof verification
 */

export interface ProofData {
  signature: string;
  agentName: string;
  agentType: string;
  capabilities: string[];
  timestamp: string;
  proofFormat: 'pdf' | 'json' | 'text';
  verificationStatus?: string;
}

export interface VerificationResult {
  isValid: boolean;
  originalSignature: string;
  recomputedSignature: string;
  proofData: ProofData;
  verifiedAt: string;
  message: string;
}

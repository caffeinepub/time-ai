/**
 * Utility module for verifying proof documents
 */

import { ProofData, VerificationResult } from '@/types/proof';
import { computeTextHash, hashToHex } from './HashUtils';

/**
 * Verifies a proof document by recomputing its signature
 */
export async function verifyProof(proofData: ProofData): Promise<VerificationResult> {
  try {
    // Parse timestamp to Date object
    const timestamp = new Date(proofData.timestamp);
    
    // Map agent type display names back to type codes if needed
    const agentTypeCode = mapAgentTypeToCode(proofData.agentType);
    
    // Map verification status display names back to status codes if needed
    const verificationStatusCode = mapVerificationStatusToCode(proofData.verificationStatus);
    
    // Create canonical string from proof data (must match generation logic)
    const canonicalData = [
      `agentName:${proofData.agentName}`,
      `agentType:${agentTypeCode}`,
      `capabilities:${proofData.capabilities.sort().join(',')}`,
      `verificationStatus:${verificationStatusCode}`,
      `timestamp:${timestamp.toISOString()}`,
    ].join('|');
    
    // Compute SHA-256 hash
    const hashBytes = await computeTextHash(canonicalData);
    const recomputedSignature = hashToHex(hashBytes);
    
    // Compare signatures
    const isValid = recomputedSignature === proofData.signature;
    
    const message = isValid
      ? 'Proof is valid. The digital signature matches the document content.'
      : 'Proof is invalid. The digital signature does not match the document content. The document may have been tampered with.';
    
    return {
      isValid,
      originalSignature: proofData.signature,
      recomputedSignature,
      proofData,
      verifiedAt: new Date().toISOString(),
      message,
    };
  } catch (error) {
    throw new Error(`Verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Maps agent type display names to type codes
 */
function mapAgentTypeToCode(agentType: string): string {
  const typeMap: Record<string, string> = {
    'TIME Orchestrator': 'time-orchestrator',
    'TRAV Navigator': 'trav-navigator',
    'Policy Sentinel': 'policy-sentinel',
    'Custom Agent': 'custom-agent',
  };
  
  return typeMap[agentType] || agentType;
}

/**
 * Maps verification status display names to status codes
 */
function mapVerificationStatusToCode(status: string | undefined): string {
  if (!status) return 'pending';
  
  const statusMap: Record<string, string> = {
    'Verified': 'verified',
    'Pending Verification': 'pending',
    'Suspended': 'suspended',
    'Unverified': 'unverified',
  };
  
  return statusMap[status] || status;
}

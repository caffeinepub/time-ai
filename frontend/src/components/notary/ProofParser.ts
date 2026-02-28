/**
 * Utility module for parsing proof documents in different formats
 */

import { ProofData } from '@/types/proof';

/**
 * Parses text format proof document
 */
export function parseTextProof(content: string): ProofData {
  try {
    const lines = content.split('\n').map(line => line.trim());
    
    // Extract agent name
    const nameLine = lines.find(line => line.startsWith('Agent Name:'));
    if (!nameLine) throw new Error('Agent name not found in proof document');
    const agentName = nameLine.replace('Agent Name:', '').trim();
    
    // Extract agent type
    const typeLine = lines.find(line => line.startsWith('Agent Type:'));
    if (!typeLine) throw new Error('Agent type not found in proof document');
    const agentType = typeLine.replace('Agent Type:', '').trim();
    
    // Extract verification status
    const statusLine = lines.find(line => line.startsWith('Verification Status:'));
    const verificationStatus = statusLine ? statusLine.replace('Verification Status:', '').trim() : undefined;
    
    // Extract capabilities
    const capabilitiesStartIndex = lines.findIndex(line => line === 'CAPABILITIES');
    const metadataStartIndex = lines.findIndex(line => line === 'DOCUMENT METADATA');
    const capabilities: string[] = [];
    
    if (capabilitiesStartIndex !== -1 && metadataStartIndex !== -1) {
      for (let i = capabilitiesStartIndex + 2; i < metadataStartIndex; i++) {
        const line = lines[i];
        if (line && line.match(/^\d+\./)) {
          const capability = line.replace(/^\d+\.\s*/, '').trim();
          if (capability && capability !== 'No capabilities selected') {
            capabilities.push(capability);
          }
        }
      }
    }
    
    // Extract timestamp
    const timestampLine = lines.find(line => line.startsWith('Generated On:'));
    if (!timestampLine) throw new Error('Timestamp not found in proof document');
    const timestamp = timestampLine.replace('Generated On:', '').trim();
    
    // Extract signature
    const signatureStartIndex = lines.findIndex(line => line === 'DIGITAL SIGNATURE');
    if (signatureStartIndex === -1) throw new Error('Digital signature not found in proof document');
    const signature = lines[signatureStartIndex + 2]?.trim();
    if (!signature) throw new Error('Digital signature is empty');
    
    return {
      signature,
      agentName,
      agentType,
      capabilities,
      timestamp,
      proofFormat: 'text',
      verificationStatus,
    };
  } catch (error) {
    throw new Error(`Failed to parse text proof: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Parses JSON format proof document
 */
export function parseJSONProof(content: string): ProofData {
  try {
    const json = JSON.parse(content);
    
    if (!json.agent?.name) throw new Error('Agent name not found in JSON proof');
    if (!json.agent?.typeCode) throw new Error('Agent type not found in JSON proof');
    if (!json.metadata?.generatedAt) throw new Error('Timestamp not found in JSON proof');
    if (!json.signature) throw new Error('Digital signature not found in JSON proof');
    
    return {
      signature: json.signature,
      agentName: json.agent.name,
      agentType: json.agent.typeCode,
      capabilities: Array.isArray(json.capabilities) ? json.capabilities : [],
      timestamp: json.metadata.generatedAt,
      proofFormat: 'json',
      verificationStatus: json.verification?.status,
    };
  } catch (error) {
    throw new Error(`Failed to parse JSON proof: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Parses PDF format proof document by extracting text content
 */
export async function parsePDFProof(file: File): Promise<ProofData> {
  try {
    // For PDF files, we'll extract text content and parse it as text
    // In a real implementation, you would use a PDF parsing library
    // For now, we'll read the file as text and attempt to parse it
    const text = await file.text();
    
    // Try to extract the signature from the HTML content
    const signatureMatch = text.match(/<div class="signature">([a-f0-9]+)<\/div>/);
    if (!signatureMatch) throw new Error('Digital signature not found in PDF');
    const signature = signatureMatch[1];
    
    // Extract agent name
    const nameMatch = text.match(/<span class="info-label">Agent Name:<\/span>\s*<span class="info-value">([^<]+)<\/span>/);
    if (!nameMatch) throw new Error('Agent name not found in PDF');
    const agentName = nameMatch[1].trim();
    
    // Extract agent type
    const typeMatch = text.match(/<span class="info-label">Agent Type:<\/span>\s*<span class="info-value">([^<]+)<\/span>/);
    if (!typeMatch) throw new Error('Agent type not found in PDF');
    const agentType = typeMatch[1].trim();
    
    // Extract verification status
    const statusMatch = text.match(/<span class="info-label">Verification Status:<\/span>\s*<span class="info-value">([^<]+)<\/span>/);
    const verificationStatus = statusMatch ? statusMatch[1].trim() : undefined;
    
    // Extract capabilities
    const capabilitiesMatch = text.match(/<h2>Capabilities<\/h2>\s*<ul>([\s\S]*?)<\/ul>/);
    const capabilities: string[] = [];
    if (capabilitiesMatch) {
      const capabilityMatches = capabilitiesMatch[1].matchAll(/<li>\d+\.\s*([^<]+)<\/li>/g);
      for (const match of capabilityMatches) {
        const capability = match[1].trim();
        if (capability && capability !== 'No capabilities selected') {
          capabilities.push(capability);
        }
      }
    }
    
    // Extract timestamp
    const timestampMatch = text.match(/<span class="info-label">Generated On:<\/span>\s*<span class="info-value">([^<]+)<\/span>/);
    if (!timestampMatch) throw new Error('Timestamp not found in PDF');
    const timestamp = timestampMatch[1].trim();
    
    return {
      signature,
      agentName,
      agentType,
      capabilities,
      timestamp,
      proofFormat: 'pdf',
      verificationStatus,
    };
  } catch (error) {
    throw new Error(`Failed to parse PDF proof: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

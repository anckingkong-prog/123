const PINATA_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlODQwZGYxYi0yMjRiLWViNzUtMmQ5OC0wMThlZDgyNDBkMDYiLCJlbWFpbCI6InNpbmhhYXl1c2htYW40NDRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE3Y2FjZjM5NzRlYmY1N2JhMjQ1Iiwic2NvcGVkS2V5U2VjcmV0IjoiYTIwNTAzYmI4Y2M2Njk2NjFhODVlNzEwYmZlYjcxNiIsImV4cCI6MTc2ODU3NDAwNX0.T01cP3EKKTvgz-Xt0N1hMnN3xG-C-Mts7SElXyGYD1E';

export interface IPFSUploadResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export const uploadToIPFS = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const metadata = JSON.stringify({
      name: file.name,
      keyvalues: {
        type: 'academic-credential',
        uploadedAt: new Date().toISOString(),
      },
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 1,
    });
    formData.append('pinataOptions', options);

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`IPFS upload failed: ${response.statusText}`);
    }

    const data: IPFSUploadResponse = await response.json();
    return data.IpfsHash;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};

export const getIPFSUrl = (hash: string): string => {
  return `https://gateway.pinata.cloud/ipfs/${hash}`;
};

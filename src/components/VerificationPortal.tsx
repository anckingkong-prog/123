import { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, ExternalLink, Calendar, Building2, User, Loader2 } from 'lucide-react';
import { Credential } from '../types/credential';
import { verifyCredential } from '../utils/blockchain';
import { getIPFSUrl } from '../utils/ipfs';

export default function VerificationPortal() {
  const [tokenId, setTokenId] = useState('');
  const [credential, setCredential] = useState<Credential | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const verifyParam = urlParams.get('verify');
    if (verifyParam) {
      setTokenId(verifyParam);
      handleVerify(verifyParam);
    }
  }, []);

  const handleVerify = async (id?: string) => {
    const idToVerify = id || tokenId;
    if (!idToVerify.trim()) {
      setError('Please enter a token ID');
      return;
    }

    setLoading(true);
    setError(null);
    setCredential(null);
    setSearched(true);

    try {
      const result = await verifyCredential(idToVerify);
      if (result) {
        setCredential(result);
      } else {
        setError('Credential not found or invalid token ID');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to verify credential');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Verify Academic Credential</h2>

        <div className="flex gap-3">
          <input
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="Enter Token ID or scan QR code"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
          />
          <button
            onClick={() => handleVerify()}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Verify
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <XCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
      </div>

      {searched && credential && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div
            className={`p-6 ${
              credential.revoked
                ? 'bg-gradient-to-br from-red-500 to-red-700'
                : 'bg-gradient-to-br from-green-500 to-green-700'
            } text-white`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {credential.revoked ? (
                  <XCircle className="w-8 h-8 mr-3" />
                ) : (
                  <CheckCircle className="w-8 h-8 mr-3" />
                )}
                <h3 className="text-2xl font-bold">
                  {credential.revoked ? 'Credential Revoked' : 'Verified Credential'}
                </h3>
              </div>
            </div>
            {credential.revoked && (
              <p className="text-white text-sm">
                This credential has been revoked and is no longer valid
              </p>
            )}
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Building2 className="w-4 h-4 mr-2" />
                    Institution
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{credential.institution}</p>
                </div>

                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    Degree / Program
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{credential.degree}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Issue Date
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatDate(credential.issueDate)}
                  </p>
                </div>

                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <User className="w-4 h-4 mr-2" />
                    Student Address
                  </div>
                  <p className="text-lg font-semibold text-gray-900 font-mono">
                    {shortenAddress(credential.student)}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Blockchain Proof</h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Token ID:</span>
                  <span className="font-mono text-gray-900">{credential.tokenId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">IPFS Hash:</span>
                  <a
                    href={getIPFSUrl(credential.ipfsHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    {credential.ipfsHash.slice(0, 10)}...
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={getIPFSUrl(credential.ipfsHash)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View Document
              </a>
              <a
                href={`https://mumbai.polygonscan.com/token/${credential.tokenId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                View on Explorer
              </a>
            </div>
          </div>
        </div>
      )}

      {!searched && (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Enter Token ID to Verify</h3>
          <p className="text-gray-600">
            Enter a credential token ID or scan a QR code to verify its authenticity
          </p>
        </div>
      )}
    </div>
  );
}

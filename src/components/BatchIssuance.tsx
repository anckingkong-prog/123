import { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { issueCredential } from '../utils/blockchain';
import { uploadToIPFS } from '../utils/ipfs';
import { saveCredential } from '../utils/supabase';

interface BatchCredential {
  studentName: string;
  studentAddress: string;
  degree: string;
  graduationYear: string;
  status: 'pending' | 'processing' | 'success' | 'error';
  error?: string;
  tokenId?: string;
}

interface BatchIssuanceProps {
  institutionName: string;
  institutionAddress: string;
}

export default function BatchIssuance({ institutionName, institutionAddress }: BatchIssuanceProps) {
  const [credentials, setCredentials] = useState<BatchCredential[]>([]);
  const [processing, setProcessing] = useState(false);
  const [csvText, setCsvText] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvText(text);
      parseCsv(text);
    };
    reader.readAsText(file);
  };

  const parseCsv = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

    const nameIdx = headers.indexOf('name') !== -1 ? headers.indexOf('name') : headers.indexOf('student name');
    const addressIdx = headers.indexOf('address') !== -1 ? headers.indexOf('address') : headers.indexOf('wallet address');
    const degreeIdx = headers.indexOf('degree');
    const yearIdx = headers.indexOf('year') !== -1 ? headers.indexOf('year') : headers.indexOf('graduation year');

    if (nameIdx === -1 || addressIdx === -1 || degreeIdx === -1 || yearIdx === -1) {
      alert('CSV must have columns: Name (or Student Name), Address (or Wallet Address), Degree, Year (or Graduation Year)');
      return;
    }

    const parsedCredentials: BatchCredential[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length >= 4) {
        parsedCredentials.push({
          studentName: values[nameIdx],
          studentAddress: values[addressIdx],
          degree: values[degreeIdx],
          graduationYear: values[yearIdx],
          status: 'pending',
        });
      }
    }

    setCredentials(parsedCredentials);
  };

  const processBatch = async () => {
    if (credentials.length === 0) return;

    setProcessing(true);

    for (let i = 0; i < credentials.length; i++) {
      const cred = credentials[i];

      setCredentials(prev => prev.map((c, idx) =>
        idx === i ? { ...c, status: 'processing' } : c
      ));

      try {
        const metadata = {
          studentName: cred.studentName,
          degree: cred.degree,
          institution: institutionName,
          graduationYear: cred.graduationYear,
          issueDate: new Date().toISOString(),
        };

        const ipfsHash = await uploadToIPFS(JSON.stringify(metadata));

        const { tokenId } = await issueCredential(
          cred.studentAddress,
          ipfsHash,
          cred.degree,
          institutionName
        );

        await saveCredential(
          tokenId,
          cred.studentAddress,
          institutionName,
          institutionAddress,
          cred.degree,
          ipfsHash,
          new Date()
        );

        setCredentials(prev => prev.map((c, idx) =>
          idx === i ? { ...c, status: 'success', tokenId } : c
        ));
      } catch (error) {
        setCredentials(prev => prev.map((c, idx) =>
          idx === i ? {
            ...c,
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error'
          } : c
        ));
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setProcessing(false);
  };

  const getStatusIcon = (status: BatchCredential['status']) => {
    switch (status) {
      case 'pending':
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>;
      case 'processing':
        return <Loader className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Upload className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Batch Credential Issuance</h3>
      </div>

      <div className="mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <label className="cursor-pointer">
            <span className="text-blue-600 hover:text-blue-700 font-medium">
              Upload CSV file
            </span>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              disabled={processing}
            />
          </label>
          <p className="text-sm text-gray-500 mt-2">
            CSV should have columns: Name, Address, Degree, Year
          </p>
        </div>
      </div>

      {credentials.length > 0 && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {credentials.length} credential{credentials.length !== 1 ? 's' : ''} ready to process
            </p>
            <button
              onClick={processBatch}
              disabled={processing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {processing ? 'Processing...' : 'Issue All Credentials'}
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Degree</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {credentials.map((cred, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          {getStatusIcon(cred.status)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{cred.studentName}</td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-600">
                        {cred.studentAddress.substring(0, 10)}...
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{cred.degree}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{cred.graduationYear}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {credentials.some(c => c.status === 'success') && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                Successfully issued {credentials.filter(c => c.status === 'success').length} credential(s)
              </p>
            </div>
          )}

          {credentials.some(c => c.status === 'error') && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 font-medium mb-2">
                Failed to issue {credentials.filter(c => c.status === 'error').length} credential(s)
              </p>
              <ul className="text-xs text-red-700 space-y-1">
                {credentials.filter(c => c.status === 'error').map((cred, idx) => (
                  <li key={idx}>
                    {cred.studentName}: {cred.error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

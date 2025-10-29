import { useEffect, useState } from 'react';
import { Clock, Activity } from 'lucide-react';
import { getAuditLogs, AuditLog } from '../utils/supabase';

interface AuditTrailProps {
  credentialId: string;
}

export default function AuditTrail({ credentialId }: AuditTrailProps) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuditLogs();
  }, [credentialId]);

  const loadAuditLogs = async () => {
    setLoading(true);
    const auditLogs = await getAuditLogs(credentialId);
    setLogs(auditLogs);
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'issued':
        return 'bg-green-100 text-green-800';
      case 'verified':
        return 'bg-blue-100 text-blue-800';
      case 'shared':
        return 'bg-purple-100 text-purple-800';
      case 'revoked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Activity className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Audit Trail</h3>
      </div>

      {logs.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No audit logs available</p>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-0"
            >
              <div className="flex-shrink-0">
                <Clock className="w-5 h-5 text-gray-400 mt-1" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getActionColor(
                      log.action
                    )}`}
                  >
                    {log.action.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(log.created_at)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  Actor: <span className="font-mono text-xs">{log.actor_address}</span>
                </p>
                {Object.keys(log.metadata).length > 0 && (
                  <details className="mt-2">
                    <summary className="text-xs text-blue-600 cursor-pointer hover:text-blue-700">
                      View details
                    </summary>
                    <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                      {JSON.stringify(log.metadata, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

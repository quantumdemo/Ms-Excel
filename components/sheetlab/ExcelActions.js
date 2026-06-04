"use client";

import { useState, useRef } from 'react';
import { Upload, Download, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ExcelActions({ onImport, getGridData, isRegistryReady }) {
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation
    if (!file.name.endsWith('.xlsx')) {
      setError("Invalid file format. Only .xlsx files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large. Max size is 5MB.");
      return;
    }

    setError(null);
    setIsImporting(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/import-excel', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Import failed");
      }

      if (result.sheets && result.sheets.length > 0) {
        onImport(result.sheets[0].data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleExport = async () => {
    if (!isRegistryReady) return;
    setIsExporting(true);
    setError(null);

    try {
      const data = getGridData();
      const response = await fetch('/api/export-excel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "SheetLab_Export.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {error && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs animate-in fade-in slide-in-from-right-2">
          <AlertCircle size={14} />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-2 hover:text-white">&times;</button>
        </div>
      )}

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isImporting}
        title="Import Excel"
        className={cn(
          "flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5",
          isImporting && "opacity-50 cursor-not-allowed"
        )}
      >
        {isImporting ? <Loader2 size={20} className="animate-spin text-excel-green" /> : <Upload size={20} className="text-excel-green" />}
      </button>

      <button
        onClick={handleExport}
        disabled={isExporting || !isRegistryReady}
        title="Export Excel"
        className={cn(
          "flex items-center justify-center w-10 h-10 bg-excel-green hover:bg-excel-green-dark text-bg-dark rounded-xl transition-all shadow-lg shadow-excel-green/20",
          (isExporting || !isRegistryReady) && "opacity-50 cursor-not-allowed"
        )}
      >
        {isExporting ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xlsx"
        className="hidden"
      />
    </div>
  );
}

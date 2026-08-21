import { useState } from 'react';
import { Table, Binary, BarChart3, Layers, FileSpreadsheet, User } from 'lucide-react';
import '../Dashboard.css';

import { Operacion1 } from './Operacion1';
import { Operacion2 } from './Operacion2';
import { Operacion3 } from './Operacion3';
import { Operacion4 } from './Operacion4';

export type RecordRow = Record<string, string | number>;

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'pandas' | 'numpy' | 'reportes' | 'pn'>('pandas');
  const [data, setData] = useState<RecordRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleDataLoaded = (parsedData: RecordRow[], cleanHeaders: string[]) => {
    setData(parsedData);
    setHeaders(cleanHeaders);
  };

  const handleTabChange = (tab: 'pandas' | 'numpy' | 'reportes' | 'pn') => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
      {/* BOTÓN MÓVIL Y FONDO OSCURO (OVERLAY) */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* SIDEBAR ADAPTABLE */}
      <aside className={`sidebar-left ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-top">
          <div className="brand-header">
            <div className="brand-logo-bg">
              <FileSpreadsheet size={20} className="brand-icon" />
            </div>
            <div className="brand-text">
              <span className="brand-title">CENTRO DE CONTROL:</span><br></br>
              <span className="brand-subtitle">BUSINESS INTELLIGENCE</span><br></br><br></br>
            </div>
          </div>

          <span className="sidebar-section-label">Módulos Principales</span>

          <nav className="sidebar-nav">
            <button 
              className={`tab-btn ${activeTab === 'pandas' ? 'active' : ''}`} 
              onClick={() => handleTabChange('pandas')}
            >
              <Table size={18} /> <span>1. Pandas (CSV)</span>
            </button>

            <button 
              className={`tab-btn ${activeTab === 'numpy' ? 'active' : ''}`} 
              onClick={() => handleTabChange('numpy')}
            >
              <Binary size={18} /> <span>2. NumPy (Métricas)</span>
            </button>

            <button 
              className={`tab-btn ${activeTab === 'reportes' ? 'active' : ''}`} 
              onClick={() => handleTabChange('reportes')}
            >
              <BarChart3 size={18} /> <span>3. Reportes Gráficos</span>
            </button>

            <button 
              className={`tab-btn ${activeTab === 'pn' ? 'active' : ''}`} 
              onClick={() => handleTabChange('pn')}
            >
              <Layers size={18} /> <span>4. Pandas & NumPy</span>
            </button>
          </nav>
        </div>

        {/* PARTE INFERIOR DEL SIDEBAR (PERFIL) */}
        <div className="sidebar-bottom">
          <div className="sidebar-user-card">
            <div className="user-avatar-small">
              <User size={30} />
            </div>
            <div className="user-details">
              <span className="user-name-small">GRUPO 4</span> <br></br>
              <span className="user-status-online">En línea</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL CON BOTÓN MENÚ MÓVIL */}
      <div className="content-wrapper">
        <header className="mobile-header">
          <span className="mobile-header-title">Control</span>
        </header>

        <main className="main-viewport">
          {activeTab === 'pandas' && <Operacion1 data={data} headers={headers} onDataLoaded={handleDataLoaded} />}
          {activeTab === 'numpy' && <Operacion2 data={data} />}
          {activeTab === 'reportes' && <Operacion3 data={data} headers={headers} />}
          {activeTab === 'pn' && <Operacion4 data={data} headers={headers} />}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
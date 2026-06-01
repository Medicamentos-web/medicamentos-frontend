import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getMedicinesByDate } from './services/medService';
import { updateMedStock } from './services/stockService';
import LoginUI from './components/LoginUI';

export default function App() {
  // Manejo de sesión Platinum con recuperación de LocalStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('userSession');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [meds, setMeds] = useState({});
  const [loading, setLoading] = useState(false);
  const dateInputRef = useRef(null);

  // Reloj en tiempo real
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Carga de datos desde el puerto 5002
  const loadData = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      // Llamada al servicio modularizado
      const data = await getMedicinesByDate(user.id, selectedDate);
      
      if (!data || !Array.isArray(data)) { 
        setMeds({}); 
        return; 
      }

      // Normalización de datos para la UI
      const rawMeds = data.map(m => ({ ...m, completado: m.estado === 'tomado' }));
      
      const parseHora = (h) => {
        if (!h) return 0;
        return parseInt(h.split(':')[0], 10);
      };

      // Clasificación por franjas horarias
      const groups = {
        "Mañana": { icon: "🌅", color: "text-orange-400", data: rawMeds.filter(m => parseHora(m.hora) >= 5 && parseHora(m.hora) < 12) },
        "Mediodía": { icon: "☀️", color: "text-yellow-500", data: rawMeds.filter(m => parseHora(m.hora) >= 12 && parseHora(m.hora) < 16) },
        "Tarde": { icon: "🌇", color: "text-blue-400", data: rawMeds.filter(m => parseHora(m.hora) >= 16 && parseHora(m.hora) < 21) },
        "Noche": { icon: "🌙", color: "text-indigo-400", data: rawMeds.filter(m => parseHora(m.hora) >= 21 || parseHora(m.hora) < 5) }
      };

      setMeds(groups);
    } catch (e) { 
      console.error("🚨 Error de conexión con el Backend (Puerto 5002):", e); 
      setMeds({});
    } finally {
      setLoading(false);
    }
  }, [user, selectedDate]);

  useEffect(() => { loadData(); }, [loadData]);

  // Lógica del Carrusel de Días
  const daysArray = useMemo(() => {
    const days = [];
    const today = new Date();
    today.setHours(0,0,0,0);
    for (let i = -7; i <= 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      d.setHours(0,0,0,0);
      const isSelected = d.toDateString() === selectedDate.toDateString();
      const isPast = d < today;
      let style = "bg-white/5 border border-white/10 text-slate-500"; 
      if (isSelected) style = "bg-[#007AFF] text-white scale-110 z-10 shadow-[0_10px_20px_rgba(0,122,255,0.3)] border-white/40";
      else if (isPast) style = "bg-[#10B981] text-white opacity-60"; 
      days.push({ date: d, style });
    }
    return days;
  }, [selectedDate]);

  const handleToggleMed = async (medId, currentStatus) => {
    const newStatus = currentStatus ? 'pendiente' : 'tomado';
    const success = await updateMedStock(medId, newStatus);
    if (success) loadData(); // Recargar datos tras actualizar
  };

  if (!user) return <LoginUI setUser={setUser} />;

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans text-slate-900 pb-32 overflow-x-hidden">
      {/* HEADER TIPO TITAN */}
      <header className="bg-[#0a0c0e] text-white pt-6 pb-36 px-6 rounded-b-[3.5rem] relative shadow-2xl border-b border-emerald-500/20">
        <div className="max-w-md mx-auto flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h1 className="text-[10px] font-black italic text-[#10B981] uppercase tracking-[0.2em]">ElderCare_V39</h1>
            <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest mt-1">
               User: {user.nombre} • {loading ? 'Sincronizando...' : 'Online'}
            </span>
          </div>
          <button 
            onClick={() => { localStorage.removeItem('userSession'); setUser(null); }} 
            className="text-[9px] font-black uppercase text-red-400 bg-red-400/10 px-3 py-1.5 rounded-lg border border-red-400/20 hover:bg-red-400 transition-all"
          >
            Cerrar ✕
          </button>
        </div>

        <div className="max-w-md mx-auto text-center">
          <h2 className="text-7xl font-light tracking-tighter mb-4 text-white/90">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </h2>
          
          <div onClick={() => dateInputRef.current.showPicker()} className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 cursor-pointer">
            <span className="text-base">📅</span>
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest italic">
              {selectedDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
            <input type="date" ref={dateInputRef} className="absolute opacity-0 pointer-events-none" 
              onChange={(e) => setSelectedDate(new Date(e.target.value + 'T00:00:00'))} />
          </div>
        </div>

        {/* CAROUSEL DE DÍAS */}
        <div className="absolute -bottom-10 left-0 right-0 px-8">
          <div className="max-w-md mx-auto bg-slate-900/80 backdrop-blur-2xl p-3 rounded-[2.5rem] border border-white/10 flex gap-2 overflow-x-auto scrollbar-hide">
            {daysArray.map((item, i) => (
              <button key={i} onClick={() => setSelectedDate(new Date(item.date))}
                className={`flex-none w-14 h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${item.style}`}>
                <span className="text-[7px] font-black uppercase opacity-60 mb-0.5">{item.date.toLocaleDateString('es-ES', { weekday: 'short' })}</span>
                <span className="text-xl font-black italic">{item.date.getDate()}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* LISTADO DE MEDICAMENTOS */}
      <main className="max-w-md mx-auto px-6 mt-20 space-y-10">
        {Object.values(meds).some(group => group.data.length > 0) ? (
          Object.entries(meds).map(([bloque, info]) => (
            info.data.length > 0 && (
              <section key={bloque} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-3 mb-5 px-2">
                  <span className="text-xl">{info.icon}</span>
                  <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] italic ${info.color}`}>{bloque}</h3>
                  <div className="h-[1px] flex-1 bg-slate-200/50"></div>
                </div>
                <div className="space-y-4">
                  {info.data.map(m => (
                    <div key={m.id} 
                      onClick={() => handleToggleMed(m.id, m.completado)} 
                      className={`w-full p-5 bg-white rounded-[2.5rem] flex justify-between items-center shadow-xl border-2 transition-all active:scale-95 cursor-pointer ${m.completado ? 'border-emerald-500/50 bg-emerald-50/30' : 'border-white'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${m.completado ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-100 text-slate-300'}`}>
                          {m.completado ? '✓' : '💊'}
                        </div>
                        <div>
                          <p className={`text-base font-black uppercase italic leading-none tracking-tighter truncate w-32 ${m.completado ? 'text-emerald-700' : 'text-slate-800'}`}>{m.nombre}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-tight">
                            {m.hora.substring(0,5)} • Stock: {m.stock}
                          </p>
                        </div>
                      </div>
                      <div className={`w-10 h-6 rounded-full p-1 transition-all ${m.completado ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${m.completado ? 'translate-x-4' : 'translate-x-0'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          ))
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="text-5xl mb-4 grayscale opacity-20">🏥</div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em] italic">No hay registros hoy</p>
          </div>
        )}
      </main>

      {/* NAV INFERIOR */}
      <nav className="fixed bottom-8 left-0 right-0 px-8 z-50">
        <div className="max-w-md mx-auto flex justify-around items-center bg-slate-900/90 backdrop-blur-xl py-4 rounded-[2.5rem] shadow-2xl border border-white/10">
          <button onClick={() => window.location.href='tel:112'} className="w-12 h-12 bg-red-500 rounded-2xl shadow-lg flex items-center justify-center text-white text-xl active:scale-90 transition-transform">📞</button>
          <button className="w-12 h-12 bg-emerald-500 rounded-2xl shadow-lg flex items-center justify-center text-white text-xl">📊</button>
          <button className="w-12 h-12 bg-white/10 rounded-2xl shadow-lg flex items-center justify-center text-white text-xl">⚙️</button>
        </div>
      </nav>
    </div>
  );
}
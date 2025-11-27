import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  UserPlus, 
  FileText, 
  Users, 
  Menu, 
  X, 
  CheckCircle, 
  Search, 
  BarChart2, 
  TrendingUp,
  Microscope,
  Shield,
  Trash2,
  Lock,
  Unlock,
  MoreVertical,
  User,
  UploadCloud,
  FileCheck,
  AlertOctagon,
  Droplet,
  MapPin,
  Phone,
  Calendar,
  Ruler,
  FilePlus // Importado novo ícone
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// --- MOCK DATA & UTILS ---

const INITIAL_PATIENTS = [
  {
    id: 1,
    name: 'Ana Silva',
    age: 45,
    lastExam: '2023-11-25',
    status: 'Alto Risco',
    riskScore: 95,
    history: [
      { date: 'Set', risk: 10, promielocitos: 5 },
      { date: 'Out', risk: 45, promielocitos: 15 },
      { date: 'Nov', risk: 95, promielocitos: 35 },
    ]
  },
  {
    id: 2,
    name: 'Carlos Ferreira',
    age: 32,
    lastExam: '2023-11-24',
    status: 'Normal',
    riskScore: 12,
    history: [
      { date: 'Set', risk: 10, promielocitos: 2 },
      { date: 'Out', risk: 12, promielocitos: 3 },
      { date: 'Nov', risk: 12, promielocitos: 2 },
    ]
  },
  {
    id: 3,
    name: 'Maria Oliveira',
    age: 58,
    lastExam: '2023-11-23',
    status: 'Investigar',
    riskScore: 45,
    history: [
      { date: 'Set', risk: 20, promielocitos: 8 },
      { date: 'Out', risk: 30, promielocitos: 12 },
      { date: 'Nov', risk: 45, promielocitos: 18 },
    ]
  }
];

const INITIAL_USERS = [
  { id: 1, name: 'Jannderson', role: 'Administrador', email: 'jannderson@vectorhemo.com', status: 'active', avatar: 'JA' },
  { id: 2, name: 'Joao Gabriel Silva', role: 'Médico Hematologista', email: 'joao.silva@vectorhemo.com', status: 'active', avatar: 'JG' },
  { id: 3, name: 'Chintia Soares Santos', role: 'Enfermeira', email: 'chintia.santos@vectorhemo.com', status: 'active', avatar: 'CS' },
];

const MOCK_IMPORTED_REPORT = {
  id: 'IMP-2023-884',
  patientName: 'Roberto Almeida Jr.',
  examDate: '27/11/2023',
  lab: 'Laboratório Central',
  items: [
    { parameter: 'Hemoglobina', value: '8.2 g/dL', ref: '13.0 - 17.0', status: 'low' },
    { parameter: 'Hematócrito', value: '25.0 %', ref: '40.0 - 50.0', status: 'low' },
    { parameter: 'Leucócitos Globais', value: '2.100 /mm³', ref: '4.000 - 10.000', status: 'low' },
    { parameter: 'Neutrófilos', value: '18 %', ref: '45 - 70', status: 'low' },
    { parameter: 'Linfócitos', value: '45 %', ref: '20 - 45', status: 'normal' },
    { parameter: 'Promielócitos Anômalos', value: '72 %', ref: '0 %', status: 'critical', isLPA: true }, // Marcador LPA
    { parameter: 'Bastonetes de Auer', value: 'PRESENTE (Múltiplos)', ref: 'Ausente', status: 'critical', isLPA: true }, // Marcador LPA
    { parameter: 'Plaquetas', value: '18.000 /mm³', ref: '150.000 - 450.000', status: 'critical' },
  ]
};

// --- COMPONENTS ---

// 1. Stat Card Component
const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        <span className="text-emerald-500 font-medium flex items-center">
          <TrendingUp size={16} className="mr-1" /> {trend}
        </span>
        <span className="text-slate-400 ml-2">vs. mês anterior</span>
      </div>
    )}
  </div>
);

// 2. Patient History Chart
const PatientChart = ({ data }) => (
  <div className="h-64 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="date" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Area 
          type="monotone" 
          dataKey="risk" 
          stroke="#ef4444" 
          fillOpacity={1} 
          fill="url(#colorRisk)" 
          name="Risco (%)"
        />
        <Line type="monotone" dataKey="promielocitos" stroke="#3b82f6" strokeWidth={2} name="Promielócitos (%)" dot={{r: 4}} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

// 3. Modal for New Exam (COMPLETE HEMOGRAM)
const NewExamModal = ({ isOpen, onClose, onSubmit, initialPatientName }) => {
  const [formData, setFormData] = useState({
    // Dados Pessoais
    name: '',
    age: '',
    
    // Eritrograma
    hemacias: '',
    hemoglobina: '',
    hematocrito: '',
    vcm: '',
    hcm: '',
    chcm: '',
    rdw: '',

    // Leucograma
    leucocitos: '',
    neutrofilos: '',
    linfocitos: '',
    monocitos: '',
    eosinofilos: '',
    basofilos: '',
    blastos: '',
    promielocitos: '', // CRÍTICO LPA
    
    // Plaquetas
    plaquetas: '',
    vpm: '',

    // Marcadores Específicos
    auerBastonetes: 'AUSENTE' // CRÍTICO LPA
  });

  // Atualiza o nome quando a prop initialPatientName muda ou o modal abre
  useEffect(() => {
    if (isOpen && initialPatientName) {
        setFormData(prev => ({ ...prev, name: initialPatientName }));
    } else if (isOpen && !initialPatientName) {
        setFormData(prev => ({ ...prev, name: '' }));
    }
  }, [isOpen, initialPatientName]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form is optional, keeping it simple here
  };

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Microscope className="text-blue-400" size={24} />
            <h2 className="text-xl font-bold text-white">Novo Hemograma Completo</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        {/* Scrollable Form Area */}
        <div className="overflow-y-auto p-6 flex-1">
          <form id="examForm" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Seção 1: Dados do Paciente */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 border-b border-slate-100">
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Paciente</label>
                <input 
                  required
                  name="name"
                  type="text" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Idade</label>
                <input 
                  required
                  name="age"
                  type="number" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Anos"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Coluna Esquerda: Eritrograma e Plaquetas */}
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-3">
                            <Droplet size={18} className="text-red-500" />
                            Eritrograma (Série Vermelha)
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                                <label className="text-xs text-slate-500">Hemoglobina (g/dL)</label>
                                <input name="hemoglobina" type="number" step="0.1" className="w-full p-2 border rounded text-sm" placeholder="Ex: 13.5" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500">Hemácias (milhões/mm³)</label>
                                <input name="hemacias" type="number" step="0.01" className="w-full p-2 border rounded text-sm" placeholder="Ex: 4.50" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500">Hematócrito (%)</label>
                                <input name="hematocrito" type="number" step="0.1" className="w-full p-2 border rounded text-sm" placeholder="Ex: 40.0" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500">VCM (fL)</label>
                                <input name="vcm" type="number" step="0.1" className="w-full p-2 border rounded text-sm" placeholder="80-100" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500">HCM (pg)</label>
                                <input name="hcm" type="number" step="0.1" className="w-full p-2 border rounded text-sm" placeholder="27-32" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500">CHCM (g/dL)</label>
                                <input name="chcm" type="number" step="0.1" className="w-full p-2 border rounded text-sm" placeholder="32-36" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500">RDW (%)</label>
                                <input name="rdw" type="number" step="0.1" className="w-full p-2 border rounded text-sm" placeholder="11-14" onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-3">
                            <Activity size={18} className="text-purple-500" />
                            Plaquetograma
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-bold text-slate-700">Plaquetas (/µL)*</label>
                                <input required name="plaquetas" type="number" className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-200" placeholder="Ex: 150000" onChange={handleChange} value={formData.plaquetas} />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500">VPM (fL)</label>
                                <input name="vpm" type="number" step="0.1" className="w-full p-2 border rounded text-sm" placeholder="Ex: 9.0" onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coluna Direita: Leucograma e Marcadores Especiais */}
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-3">
                            <Shield size={18} className="text-blue-500" />
                            Leucograma (Série Branca)
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-bold text-slate-700">Leucócitos Totais (/µL)*</label>
                                <input required name="leucocitos" type="number" className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-200" placeholder="Ex: 6000" onChange={handleChange} value={formData.leucocitos} />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <label className="text-xs text-slate-500">Neutrófilos (%)</label>
                                    <input name="neutrofilos" type="number" className="w-full p-2 border rounded text-sm" placeholder="%" onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500">Linfócitos (%)</label>
                                    <input name="linfocitos" type="number" className="w-full p-2 border rounded text-sm" placeholder="%" onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500">Monócitos (%)</label>
                                    <input name="monocitos" type="number" className="w-full p-2 border rounded text-sm" placeholder="%" onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500">Eosinófilos (%)</label>
                                    <input name="eosinofilos" type="number" className="w-full p-2 border rounded text-sm" placeholder="%" onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500">Basófilos (%)</label>
                                    <input name="basofilos" type="number" className="w-full p-2 border rounded text-sm" placeholder="%" onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700">Blastos (%)</label>
                                    <input name="blastos" type="number" className="w-full p-2 border border-orange-200 bg-orange-50 rounded text-sm" placeholder="%" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-3 text-sm uppercase tracking-wide">
                            <AlertOctagon size={16} className="text-red-600" />
                            Marcadores Críticos (LPA)
                        </h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Promielócitos Anômalos (%)</label>
                                <input 
                                required
                                name="promielocitos"
                                type="number" 
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none bg-white"
                                placeholder="Valor crítico > 30%"
                                value={formData.promielocitos}
                                onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Bastonetes de Auer Múltiplos</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg bg-white hover:bg-slate-50 w-full transition-colors">
                                    <input 
                                        type="radio" 
                                        name="auerBastonetes" 
                                        value="AUSENTE"
                                        checked={formData.auerBastonetes === 'AUSENTE'}
                                        onChange={handleChange}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium">Ausente</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg bg-white hover:bg-red-50 border-slate-200 hover:border-red-200 w-full transition-colors">
                                    <input 
                                        type="radio" 
                                        name="auerBastonetes" 
                                        value="PRESENTE"
                                        checked={formData.auerBastonetes === 'PRESENTE'}
                                        onChange={handleChange}
                                        className="text-red-600 focus:ring-red-500"
                                    />
                                    <span className="text-sm font-bold text-red-700">Presente</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          </form>
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3 shrink-0">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              form="examForm"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-lg shadow-blue-600/20"
            >
              Processar com IA
            </button>
        </div>
      </div>
    </div>
  );
};

// 4. Modal for New User
const NewUserModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Médico Hematologista',
    email: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', role: 'Médico Hematologista', email: '' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="text-purple-400" size={24} />
            <h2 className="text-xl font-bold text-white">Novo Usuário</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              placeholder="Ex: Dr. Fulano"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
            <input 
              required
              type="email" 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              placeholder="email@vectorhemo.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Cargo / Função</label>
             <select 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
             >
                <option value="Administrador">Administrador</option>
                <option value="Médico Hematologista">Médico Hematologista</option>
                <option value="Enfermeira">Enfermeira</option>
                <option value="Técnico de Laboratório">Técnico de Laboratório</option>
             </select>
          </div>

          <div className="flex gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors shadow-lg shadow-purple-600/20"
            >
              Criar Acesso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 5. Modal for Registering Only Patient (Without Exam)
const RegisterPatientModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      name: '',
      cpf: '',
      birthDate: '',
      gender: '',
      weight: '',
      height: '',
      bloodType: '',
      phone: '',
      email: '',
      zipCode: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: ''
    });
  
    if (!isOpen) return null;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Calculates approximate age for display purposes if not provided
      const age = formData.birthDate 
          ? new Date().getFullYear() - new Date(formData.birthDate).getFullYear()
          : '';
      
      onSubmit({ ...formData, age });
      
      // Reset form
      setFormData({
        name: '', cpf: '', birthDate: '', gender: '', weight: '', height: '',
        bloodType: '', phone: '', email: '', zipCode: '', street: '',
        number: '', neighborhood: '', city: '', state: ''
      });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="bg-slate-900 px-6 py-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <UserPlus className="text-emerald-400" size={24} />
              <h2 className="text-xl font-bold text-white">Cadastrar Paciente Completo</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          
          {/* Scrollable Form Area */}
          <div className="overflow-y-auto p-6 flex-1">
            <form id="patientForm" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section 1: Dados Pessoais */}
              <div>
                  <h3 className="text-emerald-600 font-bold flex items-center gap-2 mb-3 border-b border-emerald-100 pb-2">
                      <User size={18} /> Dados Pessoais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">Nome Completo</label>
                          <input required name="name" type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Ex: Maria da Silva" value={formData.name} onChange={handleChange} />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">CPF</label>
                          <input name="cpf" type="text" className="w-full px-3 py-2 border rounded-lg outline-none" placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Data de Nascimento</label>
                          <input required name="birthDate" type="date" className="w-full px-3 py-2 border rounded-lg outline-none" value={formData.birthDate} onChange={handleChange} />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Sexo Biológico</label>
                          <select name="gender" className="w-full px-3 py-2 border rounded-lg outline-none bg-white" value={formData.gender} onChange={handleChange}>
                              <option value="">Selecione...</option>
                              <option value="Feminino">Feminino</option>
                              <option value="Masculino">Masculino</option>
                              <option value="Intersexo">Intersexo</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Tipo Sanguíneo</label>
                          <select name="bloodType" className="w-full px-3 py-2 border rounded-lg outline-none bg-white" value={formData.bloodType} onChange={handleChange}>
                              <option value="">Selecione...</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                          </select>
                      </div>
                  </div>
              </div>

              {/* Section 2: Dados Antropométricos */}
              <div>
                  <h3 className="text-blue-600 font-bold flex items-center gap-2 mb-3 border-b border-blue-100 pb-2">
                      <Ruler size={18} /> Dados Físicos
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Peso (kg)</label>
                          <input name="weight" type="number" step="0.1" className="w-full px-3 py-2 border rounded-lg outline-none" placeholder="Ex: 70.5" value={formData.weight} onChange={handleChange} />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Altura (cm)</label>
                          <input name="height" type="number" className="w-full px-3 py-2 border rounded-lg outline-none" placeholder="Ex: 175" value={formData.height} onChange={handleChange} />
                      </div>
                  </div>
              </div>

              {/* Section 3: Endereço e Contato */}
              <div>
                  <h3 className="text-purple-600 font-bold flex items-center gap-2 mb-3 border-b border-purple-100 pb-2">
                      <MapPin size={18} /> Contato e Endereço
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Celular / Telefone</label>
                          <input name="phone" type="tel" className="w-full px-3 py-2 border rounded-lg outline-none" placeholder="(00) 00000-0000" value={formData.phone} onChange={handleChange} />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">E-mail</label>
                          <input name="email" type="email" className="w-full px-3 py-2 border rounded-lg outline-none" placeholder="paciente@email.com" value={formData.email} onChange={handleChange} />
                      </div>
                      <div className="md:col-span-2 grid grid-cols-3 gap-3">
                          <div className="col-span-1">
                              <label className="block text-xs font-bold text-slate-700 mb-1">CEP</label>
                              <input name="zipCode" type="text" className="w-full px-3 py-2 border rounded-lg outline-none" placeholder="00000-000" value={formData.zipCode} onChange={handleChange} />
                          </div>
                          <div className="col-span-2">
                              <label className="block text-xs font-bold text-slate-700 mb-1">Cidade / UF</label>
                              <div className="flex gap-2">
                                  <input name="city" type="text" className="w-full px-3 py-2 border rounded-lg outline-none" placeholder="Cidade" value={formData.city} onChange={handleChange} />
                                  <input name="state" type="text" className="w-20 px-3 py-2 border rounded-lg outline-none" placeholder="UF" value={formData.state} onChange={handleChange} />
                              </div>
                          </div>
                      </div>
                      <div className="md:col-span-2 flex gap-3">
                           <div className="flex-1">
                              <label className="block text-xs font-bold text-slate-700 mb-1">Endereço (Rua/Av)</label>
                              <input name="street" type="text" className="w-full px-3 py-2 border rounded-lg outline-none" placeholder="Logradouro" value={formData.street} onChange={handleChange} />
                           </div>
                           <div className="w-24">
                              <label className="block text-xs font-bold text-slate-700 mb-1">Número</label>
                              <input name="number" type="text" className="w-full px-3 py-2 border rounded-lg outline-none" placeholder="Nº" value={formData.number} onChange={handleChange} />
                           </div>
                      </div>
                      <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">Bairro</label>
                          <input name="neighborhood" type="text" className="w-full px-3 py-2 border rounded-lg outline-none" placeholder="Bairro" value={formData.neighborhood} onChange={handleChange} />
                      </div>
                  </div>
              </div>

            </form>
          </div>
          
          {/* Footer Buttons */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3 shrink-0">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 font-medium transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                form="patientForm"
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors shadow-lg shadow-emerald-600/20"
              >
                Salvar Cadastro
              </button>
            </div>
        </div>
      </div>
    );
};

// 6. Double Confirmation Delete Modal (NOVO)
const DeleteConfirmationModal = ({ isOpen, step, patientName, onClose, onNextStep, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="text-red-600" size={32} />
          </div>
          
          {step === 1 ? (
            <>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Excluir Paciente?</h3>
              <p className="text-slate-500 mb-6">
                Você solicitou a exclusão de <strong>{patientName}</strong>. Deseja continuar?
              </p>
              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors">
                  Cancelar
                </button>
                <button onClick={onNextStep} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium shadow-lg shadow-red-600/20 transition-colors">
                  Sim, continuar
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-red-600 mb-2">Confirmação Final</h3>
              <p className="text-slate-500 mb-6">
                Esta ação é <strong>irreversível</strong>. Todo o histórico clínico e dados do paciente serão apagados permanentemente. Tem certeza absoluta?
              </p>
              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors">
                  Não, manter
                </button>
                <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold shadow-lg shadow-red-600/20 transition-colors">
                  SIM, EXCLUIR
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


// --- MAIN APP COMPONENT ---

export default function App() {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  
  // Estado para o Modal de Exclusão
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, step: 1, patientId: null, patientName: '' });
  // Novo estado para o nome do paciente no modal de exame
  const [examModalInitialName, setExamModalInitialName] = useState('');

  const [notification, setNotification] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // State for Reports Tab
  const [report, setReport] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // IA Logic Simulation
  const handleNewExam = (data) => {
    const promielocitos = parseFloat(data.promielocitos);
    const hasAuer = data.auerBastonetes === 'PRESENTE';
    
    // LPA Logic (Patognomonic)
    let risk = 0;
    let status = 'Normal';
    
    if (promielocitos > 30 && hasAuer) {
      risk = 99;
      status = 'Alto Risco';
    } else if (promielocitos > 15 || hasAuer) {
      risk = 65;
      status = 'Investigar';
    } else {
      risk = Math.floor(Math.random() * 20);
    }

    const newPatient = {
      id: patients.length + 1,
      name: data.name,
      age: data.age,
      lastExam: new Date().toISOString().split('T')[0],
      status: status,
      riskScore: risk,
      history: [
        { date: 'Set', risk: Math.max(0, risk - 20), promielocitos: Math.max(0, promielocitos - 10) },
        { date: 'Out', risk: Math.max(0, risk - 10), promielocitos: Math.max(0, promielocitos - 5) },
        { date: 'Nov', risk: risk, promielocitos: promielocitos },
      ]
    };

    setPatients([newPatient, ...patients]);
    setIsModalOpen(false);

    // Notification Logic
    if (risk >= 80) {
      setNotification({
        type: 'error',
        title: 'ALERTA DE LPA DETECTADO',
        message: `O paciente ${data.name} apresenta 99% de compatibilidade com Leucemia Promielocítica Aguda.`
      });
    } else {
      setNotification({
        type: 'success',
        title: 'Análise Concluída',
        message: `Exame de ${data.name} processado com sucesso.`
      });
    }

    setTimeout(() => setNotification(null), 5000);
  };

  // User Management Logic
  const handleAddUser = (data) => {
    const initials = data.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const newUser = {
      id: users.length + 1,
      name: data.name,
      role: data.role,
      email: data.email,
      status: 'active',
      avatar: initials
    };
    setUsers([...users, newUser]);
    setIsUserModalOpen(false);
    setNotification({
        type: 'success',
        title: 'Usuário Criado',
        message: `${data.name} agora tem acesso ao sistema.`
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleToggleUserStatus = (id) => {
    setUsers(users.map(u => {
        if (u.id === id) {
            const newStatus = u.status === 'active' ? 'blocked' : 'active';
            return { ...u, status: newStatus };
        }
        return u;
    }));
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
        setUsers(users.filter(u => u.id !== id));
    }
  };

  // Patient Management Logic
  const handleAddPatient = (data) => {
    const newPatient = {
        id: patients.length + 1,
        name: data.name,
        age: data.age,
        // Store all details even if not used in the main table yet
        fullData: data,
        lastExam: '-',
        status: 'Pendente',
        riskScore: 0,
        history: []
    };
    setPatients([newPatient, ...patients]);
    setIsPatientModalOpen(false);
    setNotification({
        type: 'success',
        title: 'Paciente Cadastrado',
        message: `${data.name} foi adicionado à base de dados.`
    });
    setTimeout(() => setNotification(null), 3000);
  };

  // === INICIAR PROCESSO DE EXCLUSÃO (Abre Modal Passo 1) ===
  const initiateDeletePatient = (patient) => {
    setDeleteModal({
        isOpen: true,
        step: 1,
        patientId: patient.id,
        patientName: patient.name
    });
  };

  // === CONFIRMAR EXCLUSÃO (Executa após Passo 2) ===
  const confirmDeletePatient = () => {
    const id = deleteModal.patientId;
    setPatients(patients.filter(p => p.id !== id));
    
    // Limpa seleção se o paciente excluído estava selecionado
    if (selectedPatient?.id === id) setSelectedPatient(null);
    
    // Fecha Modal e Reseta
    setDeleteModal({ isOpen: false, step: 1, patientId: null, patientName: '' });

    setNotification({
        type: 'success',
        title: 'Paciente Excluído',
        message: 'O registro foi removido permanentemente.'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  // === NOVO: Abrir modal de exame com nome do paciente ===
  const handleNewExamForPatient = (name) => {
    setExamModalInitialName(name);
    setIsModalOpen(true);
  };

  // Mock Upload Handler
  const handleFileUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
        setReport(MOCK_IMPORTED_REPORT);
        setIsUploading(false);
        setNotification({
            type: 'error', // Error type because we found a high risk
            title: 'ANÁLISE DE LAUDO CONCLUÍDA',
            message: 'Atenção: Marcadores críticos de LPA identificados no arquivo importado.'
        });
    }, 1500);
  };

  const highRiskCount = patients.filter(p => p.status === 'Alto Risco').length;

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col z-20`}>
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          {sidebarOpen ? (
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xl">
              <Activity />
              <span>VectorHemo</span>
            </div>
          ) : (
            <Activity className="mx-auto text-blue-400" />
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-3">
          <button 
            onClick={() => { setActiveTab('dashboard'); setSelectedPatient(null); }}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <BarChart2 size={20} />
            {sidebarOpen && <span>Dashboard</span>}
          </button>
          <button 
            onClick={() => setActiveTab('patients')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${activeTab === 'patients' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Users size={20} />
            {sidebarOpen && <span>Pacientes</span>}
          </button>
          <button 
             onClick={() => setActiveTab('reports')}
             className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${activeTab === 'reports' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <FileText size={20} />
            {sidebarOpen && <span>Relatórios</span>}
          </button>
          
          <div className="pt-4 mt-4 border-t border-slate-800">
             <button 
                onClick={() => setActiveTab('access')}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${activeTab === 'access' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
             >
                <Shield size={20} />
                {sidebarOpen && <span>Acessos</span>}
             </button>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">DR</div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium">Dr. Almeida</p>
                <p className="text-xs text-slate-400">Hematologista</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {activeTab === 'dashboard' && 'Painel de Controle'}
              {activeTab === 'patients' && 'Gerenciamento de Pacientes'}
              {activeTab === 'access' && 'Gestão de Acessos'}
              {activeTab === 'reports' && 'Importação e Laudos'}
            </h1>
            <p className="text-slate-500 text-sm">Atualizado em tempo real • Versão 1.0.5</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
              />
            </div>
            <button 
              onClick={() => {
                  setExamModalInitialName(''); // Limpa nome ao criar novo
                  setIsModalOpen(true);
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              <FileText size={18} />
              <span>Novo Exame</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          
          {/* Notification Toast */}
          {notification && (
            <div className={`mb-6 p-4 rounded-xl border-l-4 flex items-center justify-between shadow-md animate-in slide-in-from-top-2 ${
              notification.type === 'error' 
                ? 'bg-red-50 border-red-500 text-red-800' 
                : 'bg-emerald-50 border-emerald-500 text-emerald-800'
            }`}>
              <div className="flex items-center gap-3">
                {notification.type === 'error' ? <AlertTriangle className="text-red-500" /> : <CheckCircle className="text-emerald-500" />}
                <div>
                  <h4 className="font-bold">{notification.title}</h4>
                  <p className="text-sm opacity-90">{notification.message}</p>
                </div>
              </div>
              <button onClick={() => setNotification(null)} className="opacity-60 hover:opacity-100">
                <X size={18} />
              </button>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Total de Pacientes" 
                  value={patients.length} 
                  icon={Users} 
                  color="bg-blue-500" 
                  trend="+12%"
                />
                <StatCard 
                  title="Alto Risco (LPA)" 
                  value={highRiskCount} 
                  icon={AlertTriangle} 
                  color="bg-red-500" 
                  trend="+2"
                />
                <StatCard 
                  title="Exames Hoje" 
                  value="14" 
                  icon={FileText} 
                  color="bg-indigo-500" 
                />
                <StatCard 
                  title="Precisão da IA" 
                  value="98.2%" 
                  icon={Activity} 
                  color="bg-emerald-500" 
                  trend="+0.4%"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Patients List */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-800">Casos Recentes</h3>
                    <button onClick={() => setActiveTab('patients')} className="text-blue-600 text-sm font-medium hover:underline">Ver todos</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                          <th className="p-4 font-semibold">Paciente</th>
                          <th className="p-4 font-semibold">Data</th>
                          <th className="p-4 font-semibold">Risco IA</th>
                          <th className="p-4 font-semibold">Status</th>
                          <th className="p-4 font-semibold">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {patients.slice(0, 5).map((patient) => (
                          <tr 
                            key={patient.id} 
                            onClick={() => setSelectedPatient(patient)}
                            className={`hover:bg-blue-50 cursor-pointer transition-colors ${selectedPatient?.id === patient.id ? 'bg-blue-50' : ''}`}
                          >
                            <td className="p-4 font-medium text-slate-800">{patient.name}</td>
                            <td className="p-4 text-slate-500 text-sm">{patient.lastExam}</td>
                            <td className="p-4">
                              <div className="w-full bg-slate-200 rounded-full h-2 w-24 overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${patient.riskScore > 80 ? 'bg-red-500' : patient.riskScore > 40 ? 'bg-yellow-500' : patient.riskScore > 0 ? 'bg-emerald-500' : 'bg-slate-300'}`} 
                                  style={{ width: `${patient.riskScore}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-slate-500 mt-1 block">{patient.riskScore}%</span>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                patient.status === 'Alto Risco' 
                                  ? 'bg-red-100 text-red-700' 
                                  : patient.status === 'Investigar' 
                                    ? 'bg-yellow-100 text-yellow-700' 
                                    : patient.status === 'Pendente'
                                        ? 'bg-slate-100 text-slate-700'
                                        : 'bg-emerald-100 text-emerald-700'
                              }`}>
                                {patient.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <button className="text-slate-400 hover:text-blue-600">
                                <FileText size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Patient Details / Chart Side Panel */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
                  {selectedPatient ? (
                    <>
                      <div className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                           <div>
                              <h3 className="font-bold text-lg text-slate-800">{selectedPatient.name}</h3>
                              <p className="text-slate-500 text-sm">Idade: {selectedPatient.age} anos</p>
                           </div>
                           {selectedPatient.status === 'Alto Risco' && (
                             <div className="bg-red-500 text-white p-2 rounded-lg animate-pulse">
                               <AlertTriangle size={20} />
                             </div>
                           )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                           <div className="bg-slate-50 p-3 rounded-lg">
                              <span className="text-xs text-slate-500 block">Risco Atual</span>
                              <span className={`text-xl font-bold ${selectedPatient.riskScore > 80 ? 'text-red-600' : 'text-slate-800'}`}>
                                {selectedPatient.riskScore}%
                              </span>
                           </div>
                           <div className="bg-slate-50 p-3 rounded-lg">
                              <span className="text-xs text-slate-500 block">Último Exame</span>
                              <span className="text-sm font-bold text-slate-800">{selectedPatient.lastExam}</span>
                           </div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                          <Activity size={16} /> Evolução Clínica
                        </h4>
                        {selectedPatient.history && selectedPatient.history.length > 0 ? (
                           <PatientChart data={selectedPatient.history} />
                        ) : (
                           <div className="h-32 flex items-center justify-center text-slate-400 text-sm bg-slate-50 rounded-lg">
                               Sem histórico suficiente
                           </div>
                        )}
                      </div>

                      <button className="w-full mt-6 bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors">
                        Ver Prontuário Completo
                      </button>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Search size={32} />
                      </div>
                      <p>Selecione um paciente na lista para ver os detalhes e a evolução histórica.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'patients' && (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Base de Pacientes</h2>
                        <p className="text-slate-500">Gerencie os cadastros e histórico clínico.</p>
                    </div>
                    <button 
                        onClick={() => setIsPatientModalOpen(true)}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-emerald-600/20 transition-all"
                    >
                        <UserPlus size={18} />
                        <span>Cadastrar Paciente</span>
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                   <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                         <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                               <th className="p-4 font-semibold">Nome</th>
                               <th className="p-4 font-semibold">Idade</th>
                               <th className="p-4 font-semibold">Último Exame</th>
                               <th className="p-4 font-semibold">Status</th>
                               <th className="p-4 font-semibold text-right">Ações</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {patients.map(patient => (
                               <tr key={patient.id} className="hover:bg-slate-50">
                                  <td className="p-4">
                                     <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                            <User size={16} />
                                        </div>
                                        <span className="font-medium text-slate-800">{patient.name}</span>
                                     </div>
                                  </td>
                                  <td className="p-4 text-slate-600">{patient.age} anos</td>
                                  <td className="p-4 text-slate-600">{patient.lastExam}</td>
                                  <td className="p-4">
                                     <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                        patient.status === 'Alto Risco' ? 'bg-red-100 text-red-700' :
                                        patient.status === 'Investigar' ? 'bg-yellow-100 text-yellow-700' :
                                        patient.status === 'Pendente' ? 'bg-slate-100 text-slate-700' :
                                        'bg-emerald-100 text-emerald-700'
                                     }`}>
                                        {patient.status}
                                     </span>
                                  </td>
                                  <td className="p-4">
                                     <div className="flex items-center justify-end gap-2">
                                        {/* NOVO: Botão Adicionar Exame Movido Para Cá */}
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleNewExamForPatient(patient.name);
                                            }}
                                            className="p-2 text-blue-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                                            title="Adicionar Novo Exame"
                                        >
                                            <FilePlus size={18} />
                                        </button>

                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                initiateDeletePatient(patient);
                                            }}
                                            className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
                                            title="Excluir Paciente"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                     </div>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                   {patients.length === 0 && (
                       <div className="p-8 text-center text-slate-500">
                           <Users size={48} className="mx-auto mb-2 opacity-20" />
                           <p>Nenhum paciente encontrado.</p>
                       </div>
                   )}
                </div>
            </div>
          )}

          {activeTab === 'access' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Usuários do Sistema</h2>
                        <p className="text-slate-500">Gerencie quem tem acesso à plataforma Vector Hemo.</p>
                    </div>
                    <button 
                        onClick={() => setIsUserModalOpen(true)}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-purple-600/20 transition-all"
                    >
                        <UserPlus size={18} />
                        <span>Novo Usuário</span>
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                   <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                         <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                               <th className="p-4 font-semibold">Usuário</th>
                               <th className="p-4 font-semibold">Cargo</th>
                               <th className="p-4 font-semibold">Status</th>
                               <th className="p-4 font-semibold text-right">Ações</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {users.map(user => (
                               <tr key={user.id} className="hover:bg-slate-50">
                                  <td className="p-4">
                                     <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                                            {user.avatar}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800">{user.name}</p>
                                            <p className="text-xs text-slate-500">{user.email}</p>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="p-4">
                                     <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                        user.role === 'Administrador' ? 'bg-purple-100 text-purple-700' :
                                        user.role === 'Médico Hematologista' ? 'bg-blue-100 text-blue-700' :
                                        'bg-emerald-100 text-emerald-700'
                                     }`}>
                                        {user.role}
                                     </span>
                                  </td>
                                  <td className="p-4">
                                     <span className={`flex items-center gap-1.5 text-sm font-medium ${
                                        user.status === 'active' ? 'text-emerald-600' : 'text-red-500'
                                     }`}>
                                        <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                        {user.status === 'active' ? 'Ativo' : 'Bloqueado'}
                                     </span>
                                  </td>
                                  <td className="p-4">
                                     <div className="flex items-center justify-end gap-2">
                                        <button 
                                            onClick={() => handleToggleUserStatus(user.id)}
                                            title={user.status === 'active' ? "Bloquear Acesso" : "Desbloquear Acesso"}
                                            className={`p-2 rounded-lg transition-colors ${
                                                user.status === 'active' 
                                                ? 'text-slate-400 hover:bg-red-50 hover:text-red-500' 
                                                : 'text-red-500 bg-red-50 hover:bg-emerald-50 hover:text-emerald-600'
                                            }`}
                                        >
                                            {user.status === 'active' ? <Lock size={18} /> : <Unlock size={18} />}
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteUser(user.id)}
                                            title="Excluir Usuário"
                                            className="p-2 text-slate-400 hover:bg-slate-100 hover:text-red-600 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                     </div>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                   {users.length === 0 && (
                       <div className="p-8 text-center text-slate-500">
                           <Users size={48} className="mx-auto mb-2 opacity-20" />
                           <p>Nenhum usuário cadastrado.</p>
                       </div>
                   )}
                </div>
             </div>
          )}

          {activeTab === 'reports' && (
             <div className="space-y-6">
                 <div>
                    <h2 className="text-xl font-bold text-slate-800">Análise de Relatórios</h2>
                    <p className="text-slate-500">Importe arquivos de hemograma (PDF/CSV) para análise automática.</p>
                 </div>

                 {/* Upload Area */}
                 {!report && (
                     <div 
                        onClick={handleFileUpload}
                        className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group"
                     >
                        {isUploading ? (
                            <div className="flex flex-col items-center animate-pulse">
                                <Activity size={48} className="text-blue-500 mb-4 animate-spin" />
                                <h3 className="text-lg font-bold text-slate-700">Analisando Arquivo...</h3>
                                <p className="text-slate-400">Processando parâmetros hematológicos via IA</p>
                            </div>
                        ) : (
                            <>
                                <div className="p-4 bg-slate-100 rounded-full mb-4 group-hover:bg-blue-200 group-hover:text-blue-600 transition-colors">
                                    <UploadCloud size={32} className="text-slate-500 group-hover:text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700 mb-2">Clique para importar exame</h3>
                                <p className="text-slate-400 text-center max-w-sm">
                                    Suporte para arquivos PDF de laboratórios (Sysmex, Abbott) e CSV padronizado.
                                </p>
                            </>
                        )}
                     </div>
                 )}

                 {/* Report Display */}
                 {report && (
                     <div className="animate-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                            {/* Report Header */}
                            <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <FileCheck size={18} className="text-emerald-500" />
                                        <h3 className="font-bold text-slate-800">Resultado da Análise - ID {report.id}</h3>
                                    </div>
                                    <p className="text-sm text-slate-500">Laboratório: {report.lab} • Data: {report.examDate}</p>
                                </div>
                                <div className="text-right">
                                    <h4 className="font-bold text-slate-800">{report.patientName}</h4>
                                    <button 
                                        onClick={() => setReport(null)}
                                        className="text-xs text-red-500 hover:underline mt-1"
                                    >
                                        Fechar Relatório
                                    </button>
                                </div>
                            </div>

                            {/* Warning Banner if High Risk detected */}
                            <div className="bg-red-50 border-b border-red-100 p-4 flex items-center gap-3">
                                <AlertOctagon className="text-red-600" size={24} />
                                <div>
                                    <h4 className="font-bold text-red-800">Alta Suspeita de Leucemia Promielocítica Aguda (LPA)</h4>
                                    <p className="text-sm text-red-700">Parâmetros críticos detectados. Recomendado contato urgente com hematologista.</p>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="p-0">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                        <tr>
                                            <th className="p-4 border-b">Parâmetro</th>
                                            <th className="p-4 border-b">Resultado</th>
                                            <th className="p-4 border-b">Referência</th>
                                            <th className="p-4 border-b text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {report.items.map((item, index) => (
                                            <tr 
                                                key={index} 
                                                className={`
                                                    ${item.isLPA ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-slate-50'}
                                                    transition-colors
                                                `}
                                            >
                                                <td className="p-4 font-medium text-slate-800 flex items-center gap-2">
                                                    {item.parameter}
                                                    {item.isLPA && <AlertTriangle size={14} className="text-red-600" />}
                                                </td>
                                                <td className={`p-4 font-bold ${item.isLPA ? 'text-red-700' : 'text-slate-700'}`}>
                                                    {item.value}
                                                </td>
                                                <td className="p-4 text-slate-500 text-sm">
                                                    {item.ref}
                                                </td>
                                                <td className="p-4 text-center">
                                                    {item.isLPA ? (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-200 text-red-800 text-xs font-bold border border-red-300 shadow-sm">
                                                            <Activity size={12} /> CRÍTICO (LPA)
                                                        </span>
                                                    ) : item.status === 'low' ? (
                                                        <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                                                            Baixo
                                                        </span>
                                                    ) : item.status === 'critical' ? (
                                                        <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                                                            Crítico
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                                                            Normal
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                     </div>
                 )}
             </div>
          )}
        </div>
      </main>

      {/* Modal New Exam */}
      <NewExamModal 
        isOpen={isModalOpen} 
        onClose={() => {
            setIsModalOpen(false);
            setExamModalInitialName(''); // Limpar ao fechar
        }} 
        onSubmit={handleNewExam} 
        initialPatientName={examModalInitialName} // Passa o nome para o modal
      />

      {/* Modal New User */}
      <NewUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSubmit={handleAddUser}
      />

      {/* Modal New Patient */}
      <RegisterPatientModal 
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
        onSubmit={handleAddPatient}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        step={deleteModal.step}
        patientName={deleteModal.patientName}
        onClose={() => setDeleteModal({ isOpen: false, step: 1, patientId: null, patientName: '' })}
        onNextStep={() => setDeleteModal(prev => ({ ...prev, step: 2 }))}
        onConfirm={confirmDeletePatient}
      />

    </div>
  );
}
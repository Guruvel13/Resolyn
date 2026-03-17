import { Activity, Users, AlertTriangle, Clock, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const chartData = [
  { name: 'MON', value: 400 },
  { name: 'TUE', value: 700 },
  { name: 'WED', value: 500 },
  { name: 'THU', value: 900 },
  { name: 'FRI', value: 650 },
  { name: 'SAT', value: 1100 },
  { name: 'SUN', value: 850 },
];

const performanceData = [
  { name: 'Transportation & Infrastructure', status: 'Optimal', open: 243, rate: '92%', trend: 'up' },
  { name: 'Public Health & Safety', status: 'High Load', open: 512, rate: '84%', trend: 'neutral' },
  { name: 'Urban Planning', status: 'Optimal', open: 88, rate: '96%', trend: 'up' },
  { name: 'Environment & Waste', status: 'Critical', open: 1024, rate: '62%', trend: 'down' },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="System Health" 
          value="99.98%" 
          trend="+0.02%" 
          trendType="up" 
          description="All modules operational" 
          icon={<Activity size={20} />}
        />
        <StatCard 
          label="Total Active Admins" 
          value="1,428" 
          description="Online now: 84" 
          icon={<Users size={20} />}
        />
        <StatCard 
          label="Pending Escalations" 
          value="32" 
          trend="+12%" 
          trendType="down" 
          description="Requires immediate action" 
          icon={<AlertTriangle size={20} />}
        />
        <StatCard 
          label="Avg. Response Time" 
          value="2.4h" 
          trend="-15%" 
          trendType="up" 
          description="Global benchmark: 4.0h" 
          icon={<Clock size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Column */}
        <div className="lg:col-span-2 card-paper p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 leading-none">Ticket Volume Trends</h3>
              <p className="text-xs text-slate-500 mt-1">Aggregated daily complaints across all systems</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold px-3 py-1.5 outline-none focus:ring-2 focus:ring-brand-100">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#3b82f6' : '#bfdbfe'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts Column */}
        <div className="card-paper p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Critical Alerts</h3>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-pulse"></span>
              Live
            </span>
          </div>
          
          <div className="space-y-4">
            {[
              { title: 'Database latency spike', desc: 'Node DB-04 reporting > 500ms response time in Region North.', time: '2 MINS AGO', type: 'error' },
              { title: 'High Login Failures', desc: 'Detected unusual auth activity on Admin Portal (IP 192.168.x.x).', time: '14 MINS AGO', type: 'warning' },
              { title: 'Executive Escalation', desc: 'Complaint #4429 moved to priority tier 1 by Dept Head.', time: '1 HR AGO', type: 'info' },
            ].map((alert, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all cursor-pointer group">
                <div className={`w-1 h-auto rounded-full ${alert.type === 'error' ? 'bg-rose-500' : alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-0.5">{alert.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed truncate-2-lines">{alert.desc}</p>
                  <span className="text-[9px] font-bold text-slate-400 mt-2 block">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-2 content-center text-[11px] font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            View System Audit Log
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="card-paper overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-slate-900">Department Performance Metrics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department Name</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Open Cases</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resolution Rate</th>
                <th className="px-6 py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {performanceData.map((dept, i) => (
                <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-900">{dept.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      dept.status === 'Optimal' ? 'bg-emerald-50 text-emerald-600' :
                      dept.status === 'High Load' ? 'bg-amber-50 text-amber-600' :
                      'bg-rose-50 text-rose-600'
                    }`}>
                      • {dept.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-600">{dept.open}</td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-600">{dept.rate}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      {dept.trend === 'up' && <ArrowUpRight className="text-emerald-500" size={16} />}
                      {dept.trend === 'down' && <ArrowDownRight className="text-rose-500" size={16} />}
                      {dept.trend === 'neutral' && <Minus className="text-slate-300" size={16} />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', tasks: 4, efficiency: 65 },
  { name: 'Tue', tasks: 7, efficiency: 78 },
  { name: 'Wed', tasks: 5, efficiency: 72 },
  { name: 'Thu', tasks: 12, efficiency: 90 },
  { name: 'Fri', tasks: 9, efficiency: 85 },
  { name: 'Sat', tasks: 3, efficiency: 60 },
  { name: 'Sun', tasks: 2, efficiency: 50 },
];

const StatsChart: React.FC = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} />
          <YAxis stroke="#94a3b8" tick={{fontSize: 12}} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f8fafc' }}
            itemStyle={{ color: '#e2e8f0' }}
          />
          <Area type="monotone" dataKey="tasks" stroke="#818cf8" fillOpacity={1} fill="url(#colorTasks)" />
          <Area type="monotone" dataKey="efficiency" stroke="#a855f7" fillOpacity={1} fill="url(#colorEff)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;
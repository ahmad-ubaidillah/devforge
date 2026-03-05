import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', tenants: 40, users: 240 },
  { name: 'Tue', tenants: 45, users: 310 },
  { name: 'Wed', tenants: 50, users: 400 },
  { name: 'Thu', tenants: 52, users: 430 },
  { name: 'Fri', tenants: 60, users: 500 },
  { name: 'Sat', tenants: 65, users: 520 },
  { name: 'Sun', tenants: 75, users: 600 },
];

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            dy={10} 
        />
        <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            dx={-10} 
        />
        <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }} 
        />
        <Line 
            type="monotone" 
            dataKey="users" 
            stroke="#4F46E5" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#4F46E5', strokeWidth: 2, stroke: '#fff' }} 
            activeDot={{ r: 6 }} 
        />
        <Line 
            type="monotone" 
            dataKey="tenants" 
            stroke="#10B981" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

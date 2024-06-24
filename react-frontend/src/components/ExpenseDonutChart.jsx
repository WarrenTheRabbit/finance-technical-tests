import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Text } from 'recharts';
import { useTheme, useMediaQuery } from '@mui/material';

const COLORS = ['#6760f1', '#e39de0', '#ffe7ed', '#f9c818'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const ex = cx + (outerRadius + 15) * Math.cos(-midAngle * RADIAN);
  const ey = cy + (outerRadius + 15) * Math.sin(-midAngle * RADIAN);
  const textAnchor = x > cx ? 'start' : 'end';

  const isLeft = x < cx;
  const sign = isLeft ? -1 : 1;

  return (
    <g>
      <path d={`M${x},${y}L${x + 10 * sign},${y}L${x + 10 * sign},${ey}`} stroke="#333" fill="none" /> {/* Right angle line */}
      <circle cx={x + 10 * sign} cy={ey} r={2} fill="#333" stroke="none" /> {/* Adjusted position */}
      <text x={ex + (isLeft ? -10 : 10)} y={ey} textAnchor={textAnchor} fill="#333" fontFamily="Inria Sans" fontSize={14}>
        {value}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div variant="h6" style={{ fontFamily: 'Inria Sans' }}>{`${payload[0].payload.category} : $${payload[0].value.toLocaleString()}`}</div>
    );
  }
  return null;
};

const ExpenseDonutChart = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
      <PieChart>
        <Pie 
          data={data} 
          cx="50%" 
          cy="50%" 
          fill="#8884d8" 
          dataKey="amount" 
          labelLine={false} 
          label={({ index, ...rest }) => renderCustomizedLabel({ ...rest, value: data[index].category })}
          outerRadius={isMobile ? 100 : 150} 
          innerRadius={isMobile ? 50 : 70}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseDonutChart;
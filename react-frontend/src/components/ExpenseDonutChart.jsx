import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme, useMediaQuery } from '@mui/material';

const COLORS = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'];

const ExpenseDonutChart = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const CustomTooltip = ({ active, payload }) => { 
    if (active && payload && payload.length) {
      return (
        <div variant="h6">{`${payload[0].payload.category} : $${payload[0].value.toLocaleString()}`}</div>
      );
    }
  
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
      <PieChart>
        <Pie 
          data={data} cx="50%" cy="50%" fill="#8884d8" 
          dataKey="amount" 
          label={(entry) => entry.category} 
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
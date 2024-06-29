import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme, useMediaQuery } from '@mui/material';

const COLORS = ['#6760f1', '#a36fe9', '#c984e3', '#e39de0', '#f4b9e2', '#fdd7ea', '#fff7f9', '#ffe7ed', '#ffd7d3', '#ffcbb0', '#ffc486', '#ffc356', '#f9c818'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div variant="h6" style={{ fontFamily: 'Inria Sans' }}>{`${payload[0].payload.subcategory} : $${payload[0].value.toLocaleString()}`}</div>
    );
  }
  return null;
};

const PersonalDonutChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onPieClick = (_, index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
    if (index === activeIndex) {
      const subcategory = data[index].subcategory;
      const color = COLORS[index % COLORS.length];
      return (
        <g>
          <rect x={cx - 40} y={cy - 10} rx={5} ry={5} width={80} height={20} fill="#fff" stroke={color} strokeWidth={2} />
          <text x={cx} y={cy} textAnchor="middle" fill={color} fontFamily="Inria Sans" fontSize={14} dominantBaseline="middle">
            {subcategory}
          </text>
        </g>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          fill="#8884d8"
          dataKey="amount"
          outerRadius={isMobile ? 100 : 150}
          innerRadius={isMobile ? 50 : 70}
          onClick={onPieClick}
          labelLine={false}
          label={({ index, ...rest }) => renderCustomizedLabel({ ...rest, index })}
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

export default PersonalDonutChart;

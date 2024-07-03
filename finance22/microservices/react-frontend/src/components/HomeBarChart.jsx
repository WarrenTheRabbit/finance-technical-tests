import React from 'react';
import { BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, Cell, LabelList } from 'recharts';
import { useTheme, useMediaQuery } from '@mui/material';

// Colors from the palette, in order from top to bottom
const colors = [
  "#6760f1", "#a36fe9", "#c984e3", "#e39de0", "#f4b9e2", 
  "#fdd7ea", "#ffe7ed", "#ffd7d3", "#ffcbb0", 
  "#ffc486", "#ffc356", "#f9c818"
];

const HomeBarChart = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Formatting the data as required by Recharts and sorting it
  const formattedData = data
    .map(item => ({
      category: item.subcategory,
      amount: item.amount
    }))
    .sort((a, b) => b.amount - a.amount); // Sort data by amount descending

  return (
    <div style={{ width: isMobile ? "100%" : "400px" }}>
      <ResponsiveContainer width="100%" height={450}> {/* Adjust height as needed */}
        <BarChart 
          layout="vertical" 
          data={formattedData} 
          margin={{ top: 20, bottom: 20, left: 20, right: 35 }} // Adjust right margin for label space
          barCategoryGap="10%" // Increased gap between bars
        >
          <XAxis type="number" hide={true} />
          <YAxis
            type="category"
            dataKey="category"
            tickLine={false}
            axisLine={false}
            tick={{ fontFamily: 'Inria Sans', fontSize: 13, fill: '#384049', fontWeight: 'bold', whiteSpace: 'nowrap' }} // Updated text styles
            width={75} // Adjust width to fit text properly
          />
          <Tooltip />
          <Bar 
            dataKey="amount" 
            radius={[0, 25, 25, 0]} 
            barSize={45} // Adjust bar width to make them wider
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
            <LabelList 
              dataKey="amount" 
              position="right" 
              formatter={(value) => `$${value}`} 
              style={{ fontFamily: 'Inria Sans', fontSize: 13, fontWeight: 'bold', fill: '#384049' }} 
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HomeBarChart;

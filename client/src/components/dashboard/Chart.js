import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import Title from './Title';

const data = [
  { Species: 'P. weihenstes', Reads: 853 },
  { Species: 'E. marmotae', Reads: 625 },
  { Species: 'B. uniformis', Reads: 151 },
  { Species: 'B. timonensis', Reads: 532 },
  { Species: 'B. fragilis', Reads: 366 },
  { Species: 'P. caspiana', Reads: 231 },
  { Species: 'P. johnsonii', Reads: 65 },
  { Species: 'D. simplex', Reads: 300 },
  { Species: 'E. coli', Reads: 52 },
  { Species: 'L. muris', Reads: 94 },
  { Species: 'B. vulgatus', Reads: 46 }
];

export default function Chart() {
  return (
    <React.Fragment>
      <Title>My Results</Title>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 50,
            left: 24
          }}
        >
          <XAxis interval={0} dataKey="Species" angle={-45} textAnchor="end" />
          <YAxis></YAxis>
          <Tooltip />
          <Bar dataKey="Reads" fill="#3257a8" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

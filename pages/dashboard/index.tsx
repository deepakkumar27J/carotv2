// /pages/rota/index.tsx
import React from 'react';
import RotaLayout from '../layout';

type Rota = {
  day: string;
  shift: string;
};

const sampleRotas: Rota[] = [
  { day: 'Monday', shift: 'Morning' },
  { day: 'Tuesday', shift: 'Evening' },
];

export default function RotaPage() {
  return (
    <RotaLayout>
      <h2>Your Rota for the Week</h2>
      <ul>
        {sampleRotas.map((rota, index) => (
          <li key={index}>
            <strong>{rota.day}:</strong> {rota.shift}
          </li>
        ))}
      </ul>
    </RotaLayout>
  );
}
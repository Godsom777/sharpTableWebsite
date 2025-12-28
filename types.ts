import React from 'react';

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  colSpan?: string;
}

export interface Role {
  title: string;
  subtitle: string;
  features: string[];
  impact: string;
}

export interface DataPoint {
  name: string;
  visits: number;
  spent: number;
}
import React from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'n8n';
  image?: string; // For web
  stats?: { // For n8n
    hoursSaved: number;
    lastRun: string;
    nodes: number;
  };
  technologies: string[];
  link?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}
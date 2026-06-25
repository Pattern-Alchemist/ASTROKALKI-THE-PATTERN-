'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SPRING } from './utils/animation';

/**
 * LineageTree — Generational Shadow Map & Lineage Tree
 * 
 * Interactive SVG hierarchical tree mapping ancestral behavioral
 * scripts and inherited defense archetypes.
 */

interface LineageNode {
  id: string;
  label: string;
  role: string;
  shadow: string;
  defense: string;
  children?: LineageNode[];
}

const LINEAGE_DATA: LineageNode = {
  id: 'self',
  label: 'You',
  role: 'The Pattern Bearer',
  shadow: 'Carrying unresolved scripts from both lineages. The intersection of two unresolved histories.',
  defense: 'Recognition — seeing the pattern is the first override.',
  children: [
    {
      id: 'mother',
      label: 'Mother',
      role: 'The Emotional Inheritor',
      shadow: 'Absorption of maternal anxiety — "I must hold everyone together or I am nothing."',
      defense: 'Over-responsibility → Emotional collapse → Resentment cycle',
      children: [
        { id: 'mgm', label: 'Maternal GM', role: 'The Sacrificial Martyr', shadow: 'Self-erasure as love. "My needs don\'t exist."', defense: 'Compulsive caregiving → Burnout → Abandonment projection' },
        { id: 'mgf', label: 'Maternal GF', role: 'The Absent Provider', shadow: 'Presence through provision only. Emotional famine disguised as stability.', defense: 'Work addiction → Emotional unavailability → Generational repetition' },
      ],
    },
    {
      id: 'father',
      label: 'Father',
      role: 'The Authority Wound',
      shadow: 'Unprocessed masculine shadow — "Power means never being vulnerable."',
      defense: 'Rigidity → Control → Explosive release or silent withdrawal',
      children: [
        { id: 'pgm', label: 'Paternal GM', role: 'The Unseen Matriarch', shadow: 'Power exercised through withdrawal. Love conditional on compliance.', defense: 'Conditional acceptance → Perfectionism → Self-rejection' },
        { id: 'pgf', label: 'Paternal GF', role: 'The Dominant Shadow', shadow: 'Authority without vulnerability. The template for the inner critic.', defense: 'Criticism → Shame → Overcompensation or collapse' },
      ],
    },
  ],
};

interface NodeProps {
  node: LineageNode;
  x: number;
  y: number;
  onClick: (node: LineageNode) => void;
  selected: string | null;
}

function TreeNode({ node, x, y, onClick, selected }: NodeProps) {
  const isSelected = selected === node.id;
  return (
    <g onClick={() => onClick(node)} style={{ cursor: 'pointer' }}>
      <circle
        cx={x} cy={y} r={isSelected ? 16 : 12}
        fill={isSelected ? '#c9a96e' : '#0a0a0a'}
        stroke={isSelected ? '#c9a96e' : '#3a3530'}
        strokeWidth={isSelected ? 2 : 1}
        className="transition-all duration-300"
      />
      <text
        x={x} y={y + 4}
        textAnchor="middle"
        fill={isSelected ? '#050505' : '#8a8078'}
        fontSize="7"
        fontFamily="var(--font-inter)"
        fontWeight={isSelected ? '600' : '400'}
        letterSpacing="0.05em"
      >
        {node.label}
      </text>
    </g>
  );
}

export default function LineageTree() {
  const [selected, setSelected] = useState<string | null>('self');
  const [selectedNode, setSelectedNode] = useState<LineageNode>(LINEAGE_DATA);

  const handleNodeClick = (node: LineageNode) => {
    setSelected(node.id);
    setSelectedNode(node);
  };

  // Tree layout positions (manual for 7 nodes)
  const positions: Record<string, { x: number; y: number }> = {
    self: { x: 350, y: 40 },
    mother: { x: 175, y: 120 },
    father: { x: 525, y: 120 },
    mgm: { x: 100, y: 200 },
    mgf: { x: 250, y: 200 },
    pgm: { x: 450, y: 200 },
    pgf: { x: 600, y: 200 },
  };

  // Edges
  const edges = [
    ['self', 'mother'], ['self', 'father'],
    ['mother', 'mgm'], ['mother', 'mgf'],
    ['father', 'pgm'], ['father', 'pgf'],
  ];

  return (
    <div>
      {/* SVG Tree */}
      <svg viewBox="0 0 700 240" className="w-full" role="img" aria-label="Generational Shadow Map — click nodes to explore inherited behavioral scripts">
        {/* Edges */}
        {edges.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            x1={positions[from].x} y1={positions[from].y}
            x2={positions[to].x} y2={positions[to].y}
            stroke="#1a1815"
            strokeWidth={1}
          />
        ))}

        {/* Nodes */}
        {Object.entries(LINEAGE_DATA).length === 0 ? null : (
          <>
            <TreeNode node={LINEAGE_DATA} {...positions.self} onClick={handleNodeClick} selected={selected} />
            {LINEAGE_DATA.children!.map(parent => (
              <g key={parent.id}>
                <TreeNode node={parent} {...positions[parent.id]} onClick={handleNodeClick} selected={selected} />
                {parent.children!.map(grandparent => (
                  <TreeNode key={grandparent.id} node={grandparent} {...positions[grandparent.id]} onClick={handleNodeClick} selected={selected} />
                ))}
              </g>
            ))}
          </>
        )}
      </svg>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={SPRING.snappy}
          className="mt-4 border border-white/[0.04] p-4 bg-[#0a0a0a]/50"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#c9a96e]" />
            <span className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold">{selectedNode.label}</span>
            <span className="text-[9px] tracking-[0.15em] uppercase text-[#c9a96e]/50 font-[var(--font-inter)]">{selectedNode.role}</span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-0.5">Shadow Pattern</span>
              <p className="text-[11px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed">{selectedNode.shadow}</p>
            </div>
            <div>
              <span className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-0.5">Defense Cascade</span>
              <p className="text-[11px] text-[#c9a96e]/60 font-[var(--font-inter)] font-light">{selectedNode.defense}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

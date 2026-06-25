'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

/**
 * SankeyFlow — Cognitive Bottleneck Sankey Flow Diagram
 * 
 * Visualizes how emotional inputs funnel through neural bottlenecks
 * to produce somatic symptoms. Shows "nervous system hijack."
 */

interface FlowNode {
  id: string;
  label: string;
  category: 'input' | 'bottleneck' | 'symptom';
  color: string;
}

interface FlowLink {
  source: string;
  target: string;
  value: number;
}

const NODES: FlowNode[] = [
  { id: 'sensory', label: 'Sensory Overload', category: 'input', color: '#8a8078' },
  { id: 'ancestral', label: 'Ancestral Scripts', category: 'input', color: '#8a8078' },
  { id: 'attachment', label: 'Attachment Alarm', category: 'input', color: '#8a8078' },
  { id: 'identity', label: 'Identity Threat', category: 'input', color: '#8a8078' },
  { id: 'amygdala', label: 'Amygdala Hijack', category: 'bottleneck', color: '#c9a96e' },
  { id: 'prefrontal', label: 'Prefrontal Override Failure', category: 'bottleneck', color: '#c9a96e' },
  { id: 'freeze', label: 'Freeze Response', category: 'symptom', color: '#a07050' },
  { id: 'dissociation', label: 'Dissociation', category: 'symptom', color: '#a07050' },
  { id: 'compulsion', label: 'Compulsive Reenactment', category: 'symptom', color: '#a07050' },
];

const LINKS: FlowLink[] = [
  { source: 'sensory', target: 'amygdala', value: 35 },
  { source: 'ancestral', target: 'amygdala', value: 25 },
  { source: 'attachment', target: 'amygdala', value: 30 },
  { source: 'identity', target: 'prefrontal', value: 20 },
  { source: 'amygdala', target: 'prefrontal', value: 40 },
  { source: 'amygdala', target: 'freeze', value: 25 },
  { source: 'amygdala', target: 'dissociation', value: 25 },
  { source: 'prefrontal', target: 'dissociation', value: 15 },
  { source: 'prefrontal', target: 'compulsion', value: 25 },
  { source: 'attachment', target: 'compulsion', value: 15 },
];

const COLUMN_X = [0, 250, 500];

export default function SankeyFlow() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 640;
    const height = 280;
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const nodePositions: Record<string, { x: number; y: number }> = {
      sensory: { x: COLUMN_X[0], y: 30 },
      ancestral: { x: COLUMN_X[0], y: 100 },
      attachment: { x: COLUMN_X[0], y: 170 },
      identity: { x: COLUMN_X[0], y: 240 },
      amygdala: { x: COLUMN_X[1], y: 80 },
      prefrontal: { x: COLUMN_X[1], y: 190 },
      freeze: { x: COLUMN_X[2], y: 50 },
      dissociation: { x: COLUMN_X[2], y: 140 },
      compulsion: { x: COLUMN_X[2], y: 230 },
    };

    // Draw links as curved paths
    LINKS.forEach(link => {
      const source = nodePositions[link.source];
      const target = nodePositions[link.target];
      if (!source || !target) return;

      const midX = (source.x + target.x) / 2;
      const path = d3.path();
      path.moveTo(source.x + 60, source.y);
      path.bezierCurveTo(midX, source.y, midX, target.y, target.x - 10, target.y);

      svg.append('path')
        .attr('d', path.toString())
        .attr('fill', 'none')
        .attr('stroke', link.target === 'amygdala' || link.target === 'prefrontal' ? '#c9a96e' : '#3a3530')
        .attr('stroke-width', Math.max(1, link.value / 10))
        .attr('stroke-opacity', hoveredNode === link.source || hoveredNode === link.target ? 0.6 : 0.15)
        .attr('class', 'sankey-link');
    });

    // Draw nodes
    NODES.forEach(node => {
      const pos = nodePositions[node.id];
      if (!pos) return;

      const isHovered = hoveredNode === node.id;
      const nodeWidth = node.category === 'bottleneck' ? 80 : 60;
      const nodeHeight = 24;

      svg.append('rect')
        .attr('x', pos.x - (node.category === 'input' ? 0 : node.category === 'bottleneck' ? 0 : 0))
        .attr('y', pos.y - nodeHeight / 2)
        .attr('width', nodeWidth)
        .attr('height', nodeHeight)
        .attr('fill', isHovered ? node.color : '#0a0a0a')
        .attr('stroke', node.color)
        .attr('stroke-width', isHovered ? 1.5 : 0.5)
        .attr('stroke-opacity', isHovered ? 1 : 0.4)
        .attr('rx', 2)
        .style('cursor', 'pointer')
        .on('mouseenter', () => setHoveredNode(node.id))
        .on('mouseleave', () => setHoveredNode(null));

      svg.append('text')
        .attr('x', pos.x + nodeWidth / 2)
        .attr('y', pos.y + 3)
        .attr('text-anchor', 'middle')
        .attr('fill', isHovered ? '#050505' : '#8a8078')
        .attr('font-size', node.category === 'bottleneck' ? '7' : '6')
        .attr('font-family', 'var(--font-inter)')
        .attr('font-weight', isHovered ? '600' : '400')
        .attr('letter-spacing', '0.05em')
        .text(node.label.length > 16 ? node.label.slice(0, 15) + '…' : node.label)
        .style('cursor', 'pointer')
        .style('pointer-events', 'none');
    });

    // Column labels
    svg.append('text').attr('x', COLUMN_X[0] + 30).attr('y', 14).attr('text-anchor', 'middle')
      .attr('fill', '#3a3530').attr('font-size', '7').attr('font-family', 'var(--font-inter)')
      .attr('letter-spacing', '0.15em').text('EMOTIONAL INPUT');
    svg.append('text').attr('x', COLUMN_X[1] + 40).attr('y', 14).attr('text-anchor', 'middle')
      .attr('fill', '#c9a96e').attr('font-size', '7').attr('font-family', 'var(--font-inter)')
      .attr('letter-spacing', '0.15em').attr('font-weight', '600').text('BOTTLENECK');
    svg.append('text').attr('x', COLUMN_X[2] + 30).attr('y', 14).attr('text-anchor', 'middle')
      .attr('fill', '#3a3530').attr('font-size', '7').attr('font-family', 'var(--font-inter)')
      .attr('letter-spacing', '0.15em').text('SOMATIC OUTPUT');

  }, [hoveredNode]);

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Neural Flow Analysis
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">
        Cognitive Bottleneck Diagram
      </p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        How emotional floodwaters bypass cognitive containment. Hover nodes to trace the flow.
      </p>
      <svg ref={svgRef} className="w-full" style={{ minHeight: 280 }} role="img" aria-label="Cognitive bottleneck sankey flow diagram" />
    </div>
  );
}

'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { useReducedMotion } from './hooks/useReducedMotion';
import { SPRING, EASE } from './utils/animation';

/**
 * ShadowTimeline — Interactive Shadow Integration Timeline
 * 
 * D3.js visualization showing the lifecycle of behavioral blockages.
 * Users can hover over events to see detailed diagnostic information.
 * The timeline represents the progression from pattern activation
 * through crisis to integration.
 */

interface TimelineEvent {
  id: number;
  phase: 'activation' | 'escalation' | 'crisis' | 'recognition' | 'integration';
  label: string;
  description: string;
  intensity: number; // 0-1
  duration: string;
  archetype: string;
}

const TIMELINE_DATA: TimelineEvent[] = [
  { id: 1, phase: 'activation', label: 'The Trigger', description: 'A nervous system response activates before conscious awareness. The old pattern begins its cycle — the body remembers what the mind tries to forget.', intensity: 0.3, duration: '0-200ms', archetype: 'Wounded Child' },
  { id: 2, phase: 'escalation', label: 'The Spiral', description: 'The pattern intensifies through projection and reactivity. Unprocessed emotion floods the system. You begin reacting to the ghost, not the present.', intensity: 0.55, duration: '200ms-72hrs', archetype: 'Shadow Self' },
  { id: 3, phase: 'crisis', label: 'The Collapse', description: 'The pattern reaches its peak destructive force. Relationships fracture. Self-trust evaporates. This is not failure — this is the pattern showing itself completely.', intensity: 0.95, duration: '72hrs-2weeks', archetype: 'Destroyer' },
  { id: 4, phase: 'recognition', label: 'The Seeing', description: 'The moment the pattern is named. When you see the architecture, it begins to lose its invisible power. Recognition is the first act of liberation.', intensity: 0.6, duration: 'Instant', archetype: 'Witness' },
  { id: 5, phase: 'integration', label: 'The Override', description: 'New neural pathways form. The pattern still exists but no longer runs automatically. Choice replaces compulsion. The warrior walks with eyes open.', intensity: 0.25, duration: 'Ongoing', archetype: 'Warrior' },
];

const PHASE_COLORS: Record<string, string> = {
  activation: '#8a8078',
  escalation: '#a07050',
  crisis: '#c9a96e',
  recognition: '#d4b87a',
  integration: '#e8e0d4',
};

export default function ShadowTimeline() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!svgRef.current || prefersReduced) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous renders

    const width = svgRef.current.clientWidth;
    const height = 160;
    const margin = { top: 30, right: 20, bottom: 30, left: 20 };
    const innerWidth = width - margin.left - margin.right;

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // X scale — event positions evenly spaced
    const xScale = d3.scalePoint<number>()
      .domain(TIMELINE_DATA.map(d => d.id))
      .range([0, innerWidth])
      .padding(0.5);

    // Y scale — intensity
    const yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([80, 0]);

    // Draw the intensity curve
    const line = d3.line<TimelineEvent>()
      .x(d => xScale(d.id)!)
      .y(d => yScale(d.intensity))
      .curve(d3.curveCatmullRom.alpha(0.5));

    // Gradient fill under curve
    const gradient = svg.append('defs').append('linearGradient')
      .attr('id', 'intensity-gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#c9a96e').attr('stop-opacity', 0.3);
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#c9a96e').attr('stop-opacity', 0.02);

    // Area fill
    const area = d3.area<TimelineEvent>()
      .x(d => xScale(d.id)!)
      .y0(80)
      .y1(d => yScale(d.intensity))
      .curve(d3.curveCatmullRom.alpha(0.5));

    g.append('path')
      .datum(TIMELINE_DATA)
      .attr('fill', 'url(#intensity-gradient)')
      .attr('d', area);

    // Line path
    g.append('path')
      .datum(TIMELINE_DATA)
      .attr('fill', 'none')
      .attr('stroke', '#c9a96e')
      .attr('stroke-width', 1.5)
      .attr('stroke-opacity', 0.6)
      .attr('d', line);

    // Data points
    g.selectAll('.point')
      .data(TIMELINE_DATA)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.id)!)
      .attr('cy', d => yScale(d.intensity))
      .attr('r', 5)
      .attr('fill', '#050505')
      .attr('stroke', d => PHASE_COLORS[d.phase])
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition().duration(200)
          .attr('r', 8)
          .attr('stroke-width', 3);
        setHoveredEvent(d);
      })
      .on('mouseleave', function() {
        d3.select(this)
          .transition().duration(200)
          .attr('r', 5)
          .attr('stroke-width', 2);
        setHoveredEvent(null);
      });

    // Phase labels below
    g.selectAll('.phase-label')
      .data(TIMELINE_DATA)
      .enter()
      .append('text')
      .attr('x', d => xScale(d.id)!)
      .attr('y', 100)
      .attr('text-anchor', 'middle')
      .attr('fill', d => PHASE_COLORS[d.phase])
      .attr('font-size', '8px')
      .attr('font-family', 'var(--font-inter)')
      .attr('letter-spacing', '0.1em')
      .attr('text-transform', 'uppercase')
      .text(d => d.phase);

    // Archetype labels
    g.selectAll('.archetype-label')
      .data(TIMELINE_DATA)
      .enter()
      .append('text')
      .attr('x', d => xScale(d.id)!)
      .attr('y', 115)
      .attr('text-anchor', 'middle')
      .attr('fill', '#8a8078')
      .attr('font-size', '7px')
      .attr('font-family', 'var(--font-cormorant)')
      .attr('font-style', 'italic')
      .text(d => d.archetype);

  }, [prefersReduced]);

  return (
    <div className="w-full">
      {/* D3 SVG Timeline */}
      <svg
        ref={svgRef}
        className="w-full"
        style={{ minHeight: 160 }}
        aria-label="Shadow Integration Timeline — shows the lifecycle of behavioral blockages from activation to integration"
        role="img"
      />

      {/* Hover detail panel */}
      <motion.div
        initial={false}
        animate={{ opacity: hoveredEvent ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="mt-2 min-h-[60px]"
      >
        {hoveredEvent && (
          <div className="border border-white/[0.04] p-3 bg-[#0a0a0a]/50">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PHASE_COLORS[hoveredEvent.phase] }} />
              <span className="text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium" style={{ color: PHASE_COLORS[hoveredEvent.phase] }}>
                {hoveredEvent.phase} — {hoveredEvent.duration}
              </span>
            </div>
            <p className="font-[var(--font-cormorant)] text-base text-[#f5f3f0] font-bold">
              {hoveredEvent.label}
            </p>
            <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed mt-1">
              {hoveredEvent.description}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

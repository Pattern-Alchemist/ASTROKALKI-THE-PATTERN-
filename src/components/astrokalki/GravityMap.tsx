'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

/**
 * GravityMap — Interactive Cognitive Gravity Mapping (D3.js Force-Directed Graph)
 * 
 * Visualizes the gravitational pull between psychological patterns.
 * Each node is a pattern/construct; links show how strongly they attract
 * and reinforce each other. Larger nodes = stronger gravitational pull.
 * 
 * Click nodes to see diagnostic relationships.
 * Drag nodes to rearrange the gravitational field.
 */

interface GravityNode {
  id: string;
  label: string;
  category: 'core' | 'shadow' | 'defense' | 'somatic';
  gravity: number; // 1-10 — how strongly this pattern pulls others
  description: string;
  prescription: string;
}

interface GravityLink {
  source: string;
  target: string;
  strength: number; // 1-5 — how tightly coupled
  type: 'reinforces' | 'triggers' | 'suppresses';
}

const NODES: GravityNode[] = [
  { id: 'core-pattern', label: 'Core Pattern', category: 'core', gravity: 10, description: 'The root behavioral loop generating all downstream patterns. This is the gravitational center of your psychological architecture — everything orbits around it.', prescription: 'Stage 2 — Diagnosis: The Deep Dive maps the core pattern architecture.' },
  { id: 'attachment-wound', label: 'Attachment Wound', category: 'shadow', gravity: 8, description: 'The original breach in secure bonding. Creates a gravitational field that pulls relationships into repetitive collapse patterns.', prescription: 'Stage 1 — Recognition: Pattern Snapshot identifies the attachment adaptation.' },
  { id: 'inner-critic', label: 'Inner Critic', category: 'defense', gravity: 7, description: 'The internalized voice of authority that judges before you can act. Suppresses authentic expression and keeps the core pattern running.', prescription: 'Stage 2 — Diagnosis: Shadow confrontation reveals the critic\'s origin.' },
  { id: 'nervous-dysregulation', label: 'Nervous Dysregulation', category: 'somatic', gravity: 9, description: 'The autonomic nervous system stuck in sympathetic dominance. Creates the somatic environment where patterns thrive — anxiety feeds the loop.', prescription: 'Breath Pacer + Stage 1 — Begin with nervous system regulation.' },
  { id: 'compulsive-caregiving', label: 'Compulsive Caregiving', category: 'defense', gravity: 6, description: 'Over-responsibility as a defense against the terror of being unlovable. The pattern: save others → neglect self → resent → collapse → save again.', prescription: 'Stage 3 — Realignment: Dharma Navigation reclaims sovereign boundaries.' },
  { id: 'emotional-flooding', label: 'Emotional Flooding', category: 'somatic', gravity: 7, description: 'Apas excess — the inability to contain emotional intensity. When flooded, cognitive function collapses and the core pattern takes over entirely.', prescription: 'Breath Pacer (Vayu 4-7-8) + Stage 1 — Regulate before analyzing.' },
  { id: 'ancestral-script', label: 'Ancestral Script', category: 'shadow', gravity: 6, description: 'Inherited behavioral programs running unconsciously. The gravity of generational trauma pulls you into patterns you never chose.', prescription: 'Generational Shadow Map — Identify the inherited architecture.' },
  { id: 'self-abandonment', label: 'Self-Abandonment', category: 'shadow', gravity: 8, description: 'The deepest pattern: the surrender of self to maintain connection. Underlies every other shadow pattern — you abandon yourself before anyone else can.', prescription: 'Stage 4 — Integration: The Warrior\'s Journey rebuilds the sovereign self.' },
  { id: 'perfectionism', label: 'Perfectionism', category: 'defense', gravity: 5, description: 'The armor against criticism. If everything is perfect, no one can find the flaw. But perfectionism is itself the flaw — it prevents authentic engagement.', prescription: 'Stage 2 — Diagnosis: Map the perfectionism-avoidance cycle.' },
  { id: 'identity-fragility', label: 'Identity Fragility', category: 'core', gravity: 7, description: 'An unstable sense of self that collapses under pressure. When identity is fragile, any challenge feels like annihilation — triggering the entire defense cascade.', prescription: 'Stage 3 — Realignment: Build identity scaffolding through dharma alignment.' },
];

const LINKS: GravityLink[] = [
  { source: 'core-pattern', target: 'attachment-wound', strength: 5, type: 'reinforces' },
  { source: 'core-pattern', target: 'nervous-dysregulation', strength: 4, type: 'reinforces' },
  { source: 'core-pattern', target: 'identity-fragility', strength: 4, type: 'reinforces' },
  { source: 'attachment-wound', target: 'compulsive-caregiving', strength: 5, type: 'triggers' },
  { source: 'attachment-wound', target: 'self-abandonment', strength: 5, type: 'reinforces' },
  { source: 'inner-critic', target: 'perfectionism', strength: 4, type: 'reinforces' },
  { source: 'inner-critic', target: 'self-abandonment', strength: 3, type: 'triggers' },
  { source: 'nervous-dysregulation', target: 'emotional-flooding', strength: 5, type: 'triggers' },
  { source: 'nervous-dysregulation', target: 'inner-critic', strength: 3, type: 'reinforces' },
  { source: 'ancestral-script', target: 'attachment-wound', strength: 4, type: 'reinforces' },
  { source: 'ancestral-script', target: 'self-abandonment', strength: 3, type: 'triggers' },
  { source: 'compulsive-caregiving', target: 'self-abandonment', strength: 4, type: 'reinforces' },
  { source: 'perfectionism', target: 'identity-fragility', strength: 3, type: 'suppresses' },
  { source: 'emotional-flooding', target: 'identity-fragility', strength: 4, type: 'triggers' },
  { source: 'self-abandonment', target: 'nervous-dysregulation', strength: 3, type: 'reinforces' },
];

const CATEGORY_COLORS: Record<string, string> = {
  core: '#c9a96e',
  shadow: '#a07050',
  defense: '#8a8078',
  somatic: '#5090c0',
};

const LINK_TYPE_COLORS: Record<string, string> = {
  reinforces: '#c9a96e',
  triggers: '#a07050',
  suppresses: '#5090c0',
};

export default function GravityMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<GravityNode | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = 450;

    // D3 force simulation
    const simulation = d3.forceSimulation(NODES.map(n => ({ ...n })))
      .force('link', d3.forceLink(LINKS.map(l => ({ ...l }))).id((d: any) => d.id).distance(80).strength((d: any) => d.strength * 0.06))
      .force('charge', d3.forceManyBody().strength((d: any) => -d.gravity * 40))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => d.gravity * 3 + 10));

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    // Links
    const link = svg.append('g')
      .selectAll('line')
      .data(LINKS)
      .join('line')
      .attr('stroke', (d: any) => LINK_TYPE_COLORS[d.type])
      .attr('stroke-opacity', 0.2)
      .attr('stroke-width', (d: any) => d.strength * 0.5);

    // Nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(NODES)
      .join('g')
      .style('cursor', 'pointer')
      .call(d3.drag<SVGGElement, any>()
        .on('start', (event, d) => { if (!event.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
        .on('end', (event, d) => { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; })
      );

    node.append('circle')
      .attr('r', (d: any) => d.gravity * 2.5 + 4)
      .attr('fill', (d: any) => CATEGORY_COLORS[d.category] + '20')
      .attr('stroke', (d: any) => CATEGORY_COLORS[d.category])
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.6)
      .on('mouseenter', function(event: any, d: any) {
        d3.select(this).attr('stroke-width', 2).attr('stroke-opacity', 1);
        setSelectedNode(d);
      })
      .on('mouseleave', function() {
        d3.select(this).attr('stroke-width', 1).attr('stroke-opacity', 0.6);
      });

    node.append('text')
      .attr('dy', (d: any) => d.gravity * 2.5 + 16)
      .attr('text-anchor', 'middle')
      .attr('fill', '#8a8078')
      .attr('font-size', '7')
      .attr('font-family', 'var(--font-inter)')
      .attr('letter-spacing', '0.05em')
      .text((d: any) => d.label.length > 14 ? d.label.slice(0, 13) + '…' : d.label);

    // Tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

  }, []);

  return (
    <section className="bg-[#050505] py-14 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3">
            Cognitive Field Topology
          </p>
          <h2 className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0]">
            Pattern <span className="italic font-light">Gravity Map</span>
          </h2>
          <p className="mt-2 text-xs text-[#8a8078] font-[var(--font-inter)] font-light max-w-xl">
            Every pattern exerts gravitational pull on others. The stronger the pull, the harder it is to escape the orbit.
            Drag nodes to rearrange. Hover for diagnostics.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4">
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[8px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">
                {cat}
              </span>
            </div>
          ))}
          {Object.entries(LINK_TYPE_COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5">
              <span className="w-4 h-px" style={{ backgroundColor: color }} />
              <span className="text-[8px] tracking-[0.1em] uppercase text-[#8a8078]/40 font-[var(--font-inter)]">
                {type}
              </span>
            </div>
          ))}
        </div>

        {/* D3 Force Graph */}
        <svg
          ref={svgRef}
          className="w-full border border-white/[0.04] bg-[#050505]"
          style={{ minHeight: 450 }}
          role="img"
          aria-label="Cognitive Gravity Map — force-directed graph showing pattern interconnections"
        />

        {/* Selected node detail */}
        {selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 border border-white/[0.04] p-4 bg-[#0a0a0a]/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[selectedNode.category] }} />
              <span className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold">{selectedNode.label}</span>
              <span className="text-[8px] tracking-[0.15em] uppercase font-[var(--font-inter)]"
                style={{ color: CATEGORY_COLORS[selectedNode.category] + 'aa' }}>
                {selectedNode.category} · gravity {selectedNode.gravity}/10
              </span>
            </div>
            <p className="text-[11px] text-[#f5f3f0]/60 font-[var(--font-inter)] font-light leading-relaxed mb-2">
              {selectedNode.description}
            </p>
            <div className="border-t border-[#c9a96e]/10 pt-2">
              <span className="text-[8px] tracking-[0.15em] uppercase text-[#c9a96e]/50 font-[var(--font-inter)] block mb-0.5">Prescription</span>
              <p className="text-[10px] text-[#c9a96e]/70 font-[var(--font-inter)] font-medium">{selectedNode.prescription}</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

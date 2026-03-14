import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { IChordDiagramProps } from './ChordDiagram.types';
import { chordDiagramStyles as styles } from './ChordDiagram.styles';
import { theme } from '../../../theme';

const CHORD_COLORS: string[] = [
  theme.colors.accent.primary,
  theme.colors.accent.success,
  theme.colors.accent.error,
  theme.colors.accent.warning,
  theme.colors.accent.info,
  theme.colors.border.focus,
  theme.colors.text.primary,
  theme.colors.text.secondary,
  theme.colors.border.secondary,
];

const MOCK_DATA_NODES = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Charlie' },
  { name: 'Diana' },
];

const MOCK_DATA_LINKS = [
  { source: 'Alice', target: 'Bob', value: 5 },
  { source: 'Bob', target: 'Charlie', value: 3 },
  { source: 'Charlie', target: 'Alice', value: 2 },
  { source: 'Alice', target: 'Diana', value: 4 },
  { source: 'Diana', target: 'Bob', value: 1 },
];

function ChordDiagram({
  nodes = MOCK_DATA_NODES,
  links = MOCK_DATA_LINKS,
  title = 'Relationships',
  width = 760,
  height = 500,
}: IChordDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [relationshipTooltip, setRelationshipTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    source: '',
    target: '',
    value: 0,
  });

  const { nodeNames, matrix, hasData } = useMemo(() => {
    const seenNames = new Set<string>();
    const uniqueNodeNames: string[] = [];

    nodes.forEach((node) => {
      const name = node.name?.trim();
      if (!name || seenNames.has(name)) {
        return;
      }

      seenNames.add(name);
      uniqueNodeNames.push(name);
    });

    const nodeIndexes = new Map<string, number>();
    uniqueNodeNames.forEach((name, index) => {
      nodeIndexes.set(name, index);
    });

    const nextMatrix = Array.from({ length: uniqueNodeNames.length }, () =>
      Array.from({ length: uniqueNodeNames.length }, () => 0),
    );

    links.forEach((link) => {
      const sourceIndex = nodeIndexes.get(link.source);
      const targetIndex = nodeIndexes.get(link.target);

      if (
        sourceIndex === undefined ||
        targetIndex === undefined ||
        !Number.isFinite(link.value) ||
        link.value <= 0
      ) {
        return;
      }

      nextMatrix[sourceIndex][targetIndex] += link.value;
    });

    const hasAnyLink = nextMatrix.some((row) => row.some((value) => value > 0));

    return {
      nodeNames: uniqueNodeNames,
      matrix: nextMatrix,
      hasData: uniqueNodeNames.length > 1 && hasAnyLink,
    };
  }, [nodes, links]);

  useEffect(() => {
    if (!svgRef.current || !hasData) {
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const outerRadius = Math.min(width, height) * 0.5 - 30;
    const innerRadius = outerRadius - 26;

    const chord = d3
      .chordDirected()
      .padAngle(0.035)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending);

    const chords = chord(matrix);

    const color = d3
      .scaleOrdinal<string, string>()
      .domain(nodeNames)
      .range(
        nodeNames.map((_, index) => CHORD_COLORS[index % CHORD_COLORS.length]),
      );

    const arc = d3
      .arc<d3.ChordGroup>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const ribbon = d3
      .ribbonArrow<d3.Chord, d3.ChordSubgroup>()
      .radius(innerRadius);

    svg
      .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)
      .attr('aria-label', 'Chord diagram');

    const groupsRoot = svg
      .append('g')
      .attr('stroke', theme.colors.border.primary)
      .attr('stroke-width', 1.2);

    const group = groupsRoot
      .selectAll<SVGGElement, d3.ChordGroup>('g')
      .data(chords.groups)
      .join('g');

    const groupPath = group
      .append('path')
      .attr('fill', (d) => color(nodeNames[d.index]))
      .attr('d', arc)
      .attr('opacity', 1);

    group
      .append('text')
      .attr('dy', '0.35em')
      .attr('font-size', 12)
      .attr('font-family', theme.fonts.primary)
      .attr('stroke', theme.colors.text.primary)
      .attr('transform', (d) => {
        const groupAngle = (d.startAngle + d.endAngle) / 2;
        const angle = (groupAngle * 180) / Math.PI - 90;
        const rotate = `rotate(${angle})`;
        const translate = `translate(${outerRadius + 14},0)`;
        const flip = groupAngle > Math.PI ? 'rotate(180)' : '';

        return `${rotate} ${translate} ${flip}`;
      })
      .attr('text-anchor', (d) => {
        const groupAngle = (d.startAngle + d.endAngle) / 2;
        return groupAngle > Math.PI ? 'end' : 'start';
      })
      .text((d) => nodeNames[d.index]);

    const ribbons = svg
      .append('g')
      .attr('fill-opacity', 0.78)
      .selectAll<SVGPathElement, d3.Chord>('path')
      .data(chords)
      .join('path')
      .attr('d', ribbon)
      .attr('fill', (d) => color(nodeNames[d.source.index]))
      .attr('stroke', theme.colors.border.primary)
      .attr('stroke-width', 0.7)
      .attr('opacity', 0.78);

    groupPath
      .append('title')
      .text((d) => `${nodeNames[d.index]}: ${Math.round(d.value)}`);

    ribbons
      .append('title')
      .text(
        (d) =>
          `${nodeNames[d.source.index]} → ${nodeNames[d.target.index]}: ${Math.round(d.source.value)}`,
      );

    function setHoverState(activeIndex: number | null) {
      groupPath.attr('opacity', (d) =>
        activeIndex === null || d.index === activeIndex ? 1 : 0.2,
      );

      ribbons.attr('opacity', (d) => {
        if (activeIndex === null) {
          return 0.78;
        }

        return d.source.index === activeIndex || d.target.index === activeIndex
          ? 0.95
          : 0.08;
      });

      ribbons
        .attr('stroke-width', 0.7)
        .attr('stroke', theme.colors.border.primary);
    }

    function setRelationshipHoverState(activeChord: d3.Chord | null) {
      if (!activeChord) {
        groupPath.attr('opacity', 1);
        ribbons
          .attr('opacity', 0.78)
          .attr('stroke-width', 0.7)
          .attr('stroke', theme.colors.border.primary);
        return;
      }

      groupPath.attr('opacity', (d) =>
        d.index === activeChord.source.index ||
        d.index === activeChord.target.index
          ? 1
          : 0.2,
      );

      ribbons
        .attr('opacity', (d) => (d === activeChord ? 1 : 0.08))
        .attr('stroke-width', (d) => (d === activeChord ? 1.8 : 0.7))
        .attr('stroke', (d) =>
          d === activeChord
            ? theme.colors.accent.primary
            : theme.colors.border.primary,
        );
    }

    function updateRelationshipTooltipPosition(
      event: MouseEvent,
      chordData: d3.Chord,
    ) {
      if (!containerRef.current) {
        return;
      }

      const bounds = containerRef.current.getBoundingClientRect();
      const source = nodeNames[chordData.source.index];
      const target = nodeNames[chordData.target.index];

      setRelationshipTooltip({
        visible: true,
        x: event.clientX - bounds.left + 12,
        y: event.clientY - bounds.top + 12,
        source,
        target,
        value: Math.round(chordData.source.value),
      });
    }

    group
      .on('mouseenter', (_event, d) => {
        setRelationshipHoverState(null);
        setRelationshipTooltip((previousTooltip) => ({
          ...previousTooltip,
          visible: false,
        }));
        setHoverState(d.index);
      })
      .on('mouseleave', () => {
        setHoverState(null);
      });

    ribbons
      .on('mouseenter', (event, d) => {
        setHoverState(null);
        setRelationshipHoverState(d);
        updateRelationshipTooltipPosition(event as MouseEvent, d);
      })
      .on('mousemove', (event, d) => {
        updateRelationshipTooltipPosition(event as MouseEvent, d);
      })
      .on('mouseleave', () => {
        setRelationshipHoverState(null);
        setRelationshipTooltip((previousTooltip) => ({
          ...previousTooltip,
          visible: false,
        }));
      });

    svg.on('mouseleave', () => {
      setHoverState(null);
      setRelationshipHoverState(null);
      setRelationshipTooltip((previousTooltip) => ({
        ...previousTooltip,
        visible: false,
      }));
    });
  }, [hasData, matrix, nodeNames, width, height]);

  if (!hasData) {
    return (
      <div style={styles.container}>
        <div style={styles.title}>{title}</div>
        <div style={styles.emptyState}>
          Provide at least 2 unique nodes and valid links to render the diagram.
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={styles.container}>
      <div style={styles.title}>{title}</div>
      <svg ref={svgRef} style={styles.svg} role="img" />
      {relationshipTooltip.visible && (
        <div
          style={{
            ...styles.tooltip,
            left: relationshipTooltip.x,
            top: relationshipTooltip.y,
          }}
        >
          {relationshipTooltip.source} → {relationshipTooltip.target}:{' '}
          {relationshipTooltip.value}
        </div>
      )}
    </div>
  );
}

export default ChordDiagram;

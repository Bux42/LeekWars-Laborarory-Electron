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

const LABEL_TRANSLATE_OFFSET = 14;
const LABEL_CHAR_PIXEL_WIDTH = 6;
const LABEL_MIN_RESERVED_SPACE = 80;
const LABEL_MAX_VISIBLE_CHARS = 24;

const MOCK_DATA_NODES = [
  { name: 'Alice', id: '1' },
  { name: 'Bob', id: '2' },
  { name: 'Charlie', id: '3' },
  { name: 'Diana', id: '4' },
];

const MOCK_DATA_LINKS = [
  { source: '1', target: '2', value: 5 },
  { source: '2', target: '3', value: 3 },
  { source: '3', target: '1', value: 2 },
  { source: '1', target: '4', value: 4 },
  { source: '4', target: '2', value: 1 },
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

  const { nodeIds, nodeLabels, matrix, hasData } = useMemo(() => {
    const seenNodeIds = new Set<string>();
    const uniqueNodes: { id: string; name: string }[] = [];

    nodes.forEach((node) => {
      const nodeId = node.id?.trim();
      if (!nodeId || seenNodeIds.has(nodeId)) {
        return;
      }

      seenNodeIds.add(nodeId);
      uniqueNodes.push({
        id: nodeId,
        name: node.name?.trim() || nodeId,
      });
    });

    const nodeIndexesById = new Map<string, number>();
    const nodeIndexesByName = new Map<string, number>();
    uniqueNodes.forEach((node, index) => {
      nodeIndexesById.set(node.id, index);
      nodeIndexesByName.set(node.name, index);
    });

    const nextMatrix = uniqueNodes.map(() =>
      Array.from({ length: uniqueNodes.length }, () => 0),
    );

    links.forEach((link) => {
      const sourceIndex =
        nodeIndexesById.get(link.source) ?? nodeIndexesByName.get(link.source);
      const targetIndex =
        nodeIndexesById.get(link.target) ?? nodeIndexesByName.get(link.target);

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
      nodeIds: uniqueNodes.map((node) => node.id),
      nodeLabels: uniqueNodes.map((node) => node.name),
      matrix: nextMatrix,
      hasData: uniqueNodes.length > 1 && hasAnyLink,
    };
  }, [nodes, links]);

  useEffect(() => {
    if (!svgRef.current || !hasData) {
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const maxLabelLength = nodeLabels.reduce(
      (maxLength, label) => Math.max(maxLength, label.length),
      0,
    );
    const reservedLabelSpace = Math.max(
      LABEL_MIN_RESERVED_SPACE,
      maxLabelLength * LABEL_CHAR_PIXEL_WIDTH,
    );
    const outerRadius = Math.max(
      70,
      Math.min(width, height) * 0.5 - reservedLabelSpace - 16,
    );
    const innerRadius = Math.max(40, outerRadius - 26);

    function getDisplayLabel(label: string) {
      if (label.length <= LABEL_MAX_VISIBLE_CHARS) {
        return label;
      }

      return `${label.slice(0, LABEL_MAX_VISIBLE_CHARS - 1)}…`;
    }

    const chord = d3
      .chordDirected()
      .padAngle(0.035)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending);

    const chords = chord(matrix);

    const color = d3
      .scaleOrdinal<string, string>()
      .domain(nodeIds)
      .range(
        nodeIds.map((_, index) => CHORD_COLORS[index % CHORD_COLORS.length]),
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
      .attr('fill', (d) => color(nodeIds[d.index]))
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
        const translate = `translate(${outerRadius + LABEL_TRANSLATE_OFFSET},0)`;
        const flip = groupAngle > Math.PI ? 'rotate(180)' : '';

        return `${rotate} ${translate} ${flip}`;
      })
      .attr('text-anchor', (d) => {
        const groupAngle = (d.startAngle + d.endAngle) / 2;
        return groupAngle > Math.PI ? 'end' : 'start';
      })
      .text((d) => getDisplayLabel(nodeLabels[d.index]))
      .append('title')
      .text((d) => nodeLabels[d.index]);

    const ribbons = svg
      .append('g')
      .attr('fill-opacity', 0.78)
      .selectAll<SVGPathElement, d3.Chord>('path')
      .data(chords)
      .join('path')
      .attr('d', ribbon)
      .attr('fill', (d) => color(nodeIds[d.source.index]))
      .attr('stroke', theme.colors.border.primary)
      .attr('stroke-width', 0.7)
      .attr('opacity', 0.78);

    groupPath
      .append('title')
      .text((d) => `${nodeLabels[d.index]}: ${Math.round(d.value)}`);

    ribbons
      .append('title')
      .text(
        (d) =>
          `${nodeLabels[d.source.index]} → ${nodeLabels[d.target.index]}: ${Math.round(d.source.value)}`,
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
      const source = nodeLabels[chordData.source.index];
      const target = nodeLabels[chordData.target.index];

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
  }, [hasData, matrix, nodeIds, nodeLabels, width, height]);

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

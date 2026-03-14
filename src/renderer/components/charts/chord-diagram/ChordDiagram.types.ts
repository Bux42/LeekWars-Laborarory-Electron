export interface IChordDiagramNode {
  name: string;
}

export interface IChordDiagramLink {
  source: string;
  target: string;
  value: number;
}

export interface IChordDiagramProps {
  nodes?: IChordDiagramNode[];
  links?: IChordDiagramLink[];
  title?: string;
  width?: number;
  height?: number;
}

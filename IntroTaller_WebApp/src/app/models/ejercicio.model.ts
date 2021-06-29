export interface Ejercicio {
  call: string;
  creator: string;
  code: number;
  examples: Ejemplo[];
  solution: Solucion;
  level: number;
  created: string;
  name: string;
  section: string;
  details: string;
}

export interface Ejemplo{
    call: string;
    result: string;
    comment: string;
}

export interface IOdata{
    name: string;
    type: string;
}

export interface Solucion{
    outputs: IOdata[];
    code: string;
    inputs: IOdata[];
}
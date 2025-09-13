export type ProgrammingArea = {
  name: string;
  color: string;
  hidden?: boolean;
};

function define<T extends Record<string, ProgrammingArea>>(t: T) {
  return t;
}

const programmingAreas = define({
  FRONTEND: {
    name: 'Frontend',
    color: '#ffcc00',
  },
  BACKEND: {
    name: 'Backend',
    color: '#5856d6',
  },
  FULLSTACK: {
    name: 'Fullstack',
    color: '#22ecce',
    hidden: true,
  },
  MOBILE: {
    name: 'Mobile',
    color: '#ff2d55',
  },
  DESKTOP: {
    name: 'Desktop',
    color: '#34c759',
  },
  DEVOPS: {
    name: 'DevOps',
    color: '#ff6a00',
  },
  DATABASES: {
    name: 'Databases',
    color: '#ff3b30',
  },
  CLOUD: {
    name: 'Cloud',
    color: '#5ac8fa',
  }
});

type ProgrammingAreasKey = keyof typeof programmingAreas;
export function useProgrammingAreas(): Record<ProgrammingAreasKey, ProgrammingArea> {
  return programmingAreas;
}

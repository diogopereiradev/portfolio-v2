export type Technology = {
  name: string;
  icon: string;
  size: string;
  color: string;
  hidden?: boolean;
  priority?: number;
  areas: ProgrammingArea[];
  startAt?: string;
  endAt?: string;
  description: () => string;
  knowledges: () => string[];
};

const areas = useProgrammingAreas();
export const technologies = (t: (path: string) => string, tm: (path: string) => unknown) => {
  const techs = {
    VUE: {
      name: 'Vue.js',
      icon: 'uim:vuejs',
      size: '20',
      color: '#42b883',
      priority: 1,
      areas: [areas.FRONTEND],
      startAt: '2023-01-01',
    },
    REACT: {
      name: 'React.js',
      icon: 'mdi:react',
      size: '24',
      color: '#61DAFB',
      priority: 2,
      areas: [areas.FRONTEND],
      startAt: '2019-01-01',
    },
    NUXT: {
      name: 'Nuxt.js',
      icon: 'lineicons:nuxt',
      size: '24',
      color: '#00C58E',
      priority: 6,
      areas: [areas.FRONTEND],
      startAt: '2023-01-01',
    },
    NEXT: {
      name: 'Next.js',
      icon: 'tabler:brand-nextjs',
      size: '20',
      color: '#ffffff',
      areas: [areas.FRONTEND],
      startAt: '2019-01-01',
    },
    VITE: {
      name: 'Vite',
      icon: 'tabler:brand-vite',
      size: '20',
      color: '#646CFF',
      areas: [areas.FRONTEND],
      startAt: '2019-01-01',
    },
    TAILWIND: {
      name: 'Tailwind',
      icon: 'teenyicons:tailwind-solid',
      size: '22',
      color: '#38B2AC',
      areas: [areas.FRONTEND],
      startAt: '2020-01-01',
    },
    STYLED_COMPONENTS: {
      name: 'Styled Components',
      icon: 'devicon-plain:styledcomponents',
      size: '20',
      color: '#DB7093',
      areas: [areas.FRONTEND],
      startAt: '2019-01-01',
    },
    SASS: {
      name: 'Sass',
      icon: 'famicons:logo-sass',
      size: '20',
      color: '#CC6699',
      areas: [areas.FRONTEND],
      startAt: '2019-01-01',
    },
    PRIMEVUE: {
      name: 'PrimeVue',
      icon: 'simple-icons:primevue',
      size: '20',
      color: '#00C58E',
      hidden: true,
      areas: [areas.FRONTEND],
      startAt: '2022-01-01',
      endAt: '2022-03-01',
    },
    REDUX: {
      name: 'Redux',
      icon: 'tabler:brand-redux',
      size: '20',
      color: '#764ABC',
      areas: [areas.FRONTEND],
      startAt: '2019-01-01',
    },
    GOLANG: {
      name: 'Golang',
      icon: 'fa7-brands:golang',
      size: '24',
      color: '#00ADD8',
      priority: 5,
      areas: [areas.BACKEND],
      startAt: '2025-05-01',
    },
    RUST: {
      name: 'Rust',
      icon: 'mdi:language-rust',
      size: '24',
      color: '#f95009',
      priority: 5,
      areas: [areas.BACKEND],
      startAt: '2024-01-01',
    },
    JAVA: {
      name: 'Java',
      icon: 'mdi:language-java',
      size: '20',
      color: '#F38020',
      areas: [areas.BACKEND],
      startAt: '2017-01-01',
      endAt: '2019-01-01',
    },
    NODE: {
      name: 'Node.js',
      icon: 'streamline-ultimate:nodesj-logo-bold',
      size: '20',
      color: '#8CC84B',
      priority: 3,
      areas: [areas.BACKEND],
      startAt: '2019-01-01',
    },
    NESTJS: {
      name: 'NestJS',
      icon: 'file-icons:nestjs',
      size: '20',
      color: '#E0234E',
      priority: 4,
      areas: [areas.BACKEND],
      startAt: '2021-01-01',
    },
    EXPRESS: {
      name: 'Express.js',
      icon: 'simple-icons:express',
      size: '20',
      color: '#E0234E',
      areas: [areas.BACKEND],
      startAt: '2019-01-01',
    },
    FASTIFY: {
      name: 'Fastify',
      icon: 'simple-icons:fastify',
      size: '20',
      color: '#FF4B4B',
      areas: [areas.BACKEND],
      startAt: '2022-01-01',
    },
    MICROSERVICES: {
      name: 'Microservices',
      icon: 'carbon:microservices-1',
      size: '20',
      color: '#4CAF50',
      areas: [areas.BACKEND, areas.DEVOPS, areas.CLOUD],
      startAt: '2022-01-01',
    },
    WEBSOCKET: {
      name: 'WebSocket',
      icon: 'simple-icons:socketdotio',
      size: '20',
      color: '#F7DF1E',
      areas: [areas.BACKEND],
      startAt: '2020-01-01',
    },
    SOCKET_IO: {
      name: 'Socket.IO',
      icon: 'simple-icons:socketdotio',
      size: '20',
      color: '#fff',
      areas: [areas.BACKEND, areas.FRONTEND],
      startAt: '2020-01-01',
    },
    GRAPHQL: {
      name: 'GraphQL',
      icon: 'mdi:graphql',
      size: '20',
      color: '#E10098',
      areas: [areas.BACKEND, areas.FRONTEND],
      startAt: '2023-01-01',
    },
    TDD: {
      name: 'TDD',
      icon: 'solar:test-tube-bold',
      size: '20',
      color: '#F7DF1E',
      areas: [areas.BACKEND, areas.FRONTEND],
      startAt: '2023-01-01',
    },
    TYPESCRIPT: {
      name: 'Typescript',
      icon: 'mdi:language-typescript',
      size: '20',
      color: '#007ACC',
      areas: [areas.BACKEND, areas.FRONTEND],
      startAt: '2020-01-01',
    },
    JAVASCRIPT: {
      name: 'Javascript',
      icon: 'ri:javascript-fill',
      size: '20',
      color: '#F7DF1E',
      areas: [areas.BACKEND, areas.FRONTEND],
      startAt: '2019-01-01',
    },
    JWT: {
      name: 'JWT',
      icon: 'logos:jwt-icon',
      size: '20',
      color: '#bd1f68ff',
      areas: [areas.BACKEND, areas.FRONTEND],
      startAt: '2020-01-01',
    },
    TYPEORM: {
      name: 'TypeORM',
      icon: 'simple-icons:typeorm',
      size: '20',
      color: '#fc2f2fff',
      areas: [areas.BACKEND],
      startAt: '2022-01-01',
    },
    SEQUELIZE: {
      name: 'Sequelize',
      icon: 'simple-icons:sequelize',
      size: '20',
      color: '#52B0E7',
      areas: [areas.BACKEND],
      startAt: '2021-01-01',
    },
    PRISMA: {
      name: 'Prisma',
      icon: 'simple-icons:prisma',
      size: '20',
      color: '#0C344B',
      areas: [areas.BACKEND],
      startAt: '2023-01-01',
    },
    SWAGGER: {
      name: 'Swagger',
      icon: 'simple-icons:swagger',
      size: '20',
      color: '#85EA2D',
      areas: [areas.BACKEND],
      startAt: '2024-01-01',
    },
    APACHE_KAFKA: {
      name: 'Apache Kafka',
      icon: 'simple-icons:apachekafka',
      size: '20',
      color: '#FFF',
      areas: [areas.BACKEND, areas.CLOUD],
      startAt: '2024-01-01',
    },
    RABBITMQ: {
      name: 'RabbitMQ',
      icon: 'simple-icons:rabbitmq',
      size: '20',
      color: '#FF6600',
      areas: [areas.BACKEND, areas.CLOUD],
      startAt: '2024-01-01',
    },
  
    POSTGRESQL: {
      name: 'PostgreSQL',
      icon: 'akar-icons:postgresql-fill',
      size: '20',
      color: '#336791',
      areas: [areas.DATABASES],
      startAt: '2022-01-01',
    },
    MYSQL: {
      name: 'MySQL',
      icon: 'tabler:brand-mysql',
      size: '20',
      color: '#4479A1',
      areas: [areas.DATABASES],
      startAt: '2021-01-01',
    },
    MONGODB: {
      name: 'MongoDB',
      icon: 'lineicons:mongodb',
      size: '20',
      color: '#47A248',
      areas: [areas.DATABASES],
      startAt: '2023-01-01',
    },
    CASSANDRADB: {
      name: 'CassandraDB',
      icon: 'cib:cassandra',
      size: '20',
      color: '#1287B1',
      areas: [areas.DATABASES],
      startAt: '2023-01-01',
    },
    REDIS: {
      name: 'Redis',
      icon: 'cib:redis',
      size: '20',
      color: '#DC382D',
      areas: [areas.DATABASES],
      startAt: '2022-01-01',
    },
    FIREBASE: {
      name: 'Firebase',
      icon: 'mdi:firebase',
      size: '20',
      color: '#FFCA28',
      areas: [areas.DATABASES, areas.CLOUD, areas.DEVOPS],
      startAt: '2025-01-01',
    },
  
    DOCKER: {
      name: 'Docker',
      icon: 'mdi:docker',
      size: '20',
      color: '#2496ED',
      areas: [areas.DEVOPS],
      startAt: '2023-01-01',
    },
    KUBERNETES: {
      name: 'Kubernetes',
      icon: 'carbon:kubernetes',
      size: '20',
      color: '#326CE5',
      areas: [areas.DEVOPS],
      startAt: '2024-01-01',
    },
    LINUX: {
      name: 'Linux',
      icon: 'mdi:linux',
      size: '20',
      color: '#FCC624',
      areas: [areas.DEVOPS],
      startAt: '2023-01-01',
    },
    NGINX: {
      name: 'Nginx',
      icon: 'cib:nginx',
      size: '20',
      color: '#009639',
      areas: [areas.DEVOPS],
      startAt: '2022-01-01',
    },
    GIT: {
      name: 'Git',
      icon: 'mdi:git',
      size: '20',
      color: '#F05032',
      areas: [areas.DEVOPS],
      startAt: '2017-01-01',
    },
    GITHUB: {
      name: 'GitHub',
      icon: 'mdi:github',
      size: '20',
      color: '#fff',
      areas: [areas.DEVOPS],
      startAt: '2017-01-01',
    },
    GITLAB: {
      name: 'GitLab',
      icon: 'mdi:gitlab',
      size: '20',
      color: '#FC6D26',
      areas: [areas.DEVOPS],
      startAt: '2024-01-01',
    },
    GITHUB_ACTIONS: {
      name: 'GitHub Actions',
      icon: 'simple-icons:githubactions',
      size: '20',
      color: '#2088FF',
      areas: [areas.DEVOPS],
      startAt: '2022-01-01',
    },
    CIRCLE_CI: {
      name: 'CircleCI',
      icon: 'simple-icons:circleci',
      size: '20',
      color: '#343434',
      areas: [areas.DEVOPS],
    },
    JENKINS: {
      name: 'Jenkins',
      icon: 'simple-icons:jenkins',
      size: '20',
      color: '#D24939',
      areas: [areas.DEVOPS],
      startAt: '2024-01-01',
      endAt: '2024-03-01',
    },
    DEPLOYHQ: {
      name: 'DeployHQ',
      icon: 'logos:deployhq-icon',
      size: '20',
      color: '#4A90E2',
      areas: [areas.DEVOPS],
    },
    DOCKER_HUB: {
      name: 'Docker Hub',
      icon: 'simple-icons:docker',
      size: '20',
      color: '#2496ED',
      areas: [areas.DEVOPS, areas.CLOUD],
      startAt: '2024-01-01',
    },
    DOCKER_COMPOSE: {
      name: 'Docker Compose',
      icon: 'simple-icons:docker',
      size: '20',
      color: '#2496ED',
      areas: [areas.DEVOPS, areas.CLOUD],
      startAt: '2023-01-01',
    },
    DOCKER_SWARM: {
      name: 'Docker Swarm',
      icon: 'simple-icons:docker',
      size: '20',
      color: '#2496ED',
      areas: [areas.DEVOPS, areas.CLOUD],
      startAt: '2024-01-01',
    },
    HELM: {
      name: 'Helm',
      icon: 'simple-icons:helm',
      size: '20',
      color: '#fff',
      areas: [areas.DEVOPS, areas.CLOUD],
      startAt: '2024-01-01',
    },
    TERRAFORM: {
      name: 'Terraform',
      icon: 'simple-icons:terraform',
      size: '20',
      color: '#7B42BC',
      areas: [areas.DEVOPS, areas.CLOUD],
      startAt: '2024-01-01',
    },
    PROMETHEUS: {
      name: 'Prometheus',
      icon: 'simple-icons:prometheus',
      size: '20',
      color: '#E6522C',
      areas: [areas.DEVOPS, areas.CLOUD],
      startAt: '2024-01-01',
    },
    GRAFANA: {
      name: 'Grafana',
      icon: 'simple-icons:grafana',
      size: '20',
      color: '#F46800',
      areas: [areas.DEVOPS, areas.CLOUD],
      startAt: '2024-01-01',
    },
    SONARQUBE: {
      name: 'SonarQube',
      icon: 'simple-icons:sonarqube',
      size: '20',
      color: '#FCA121',
      areas: [areas.DEVOPS, areas.CLOUD],
      startAt: '2024-01-01',
    },
    TRAEFIK: {
      name: 'Traefik',
      icon: 'simple-icons:traefikproxy',
      size: '20',
      color: '#1E9EE8',
      areas: [areas.DEVOPS, areas.CLOUD],
      startAt: '2024-01-01',
    },
    HASHICORP_VAULT: {
      name: 'HashiCorp Vault',
      icon: 'simple-icons:hashicorp',
      size: '20',
      color: '#4F545C',
      areas: [areas.DEVOPS, areas.CLOUD],
      startAt: '2024-01-01',
    },
    AWS: {
      name: 'AWS',
      icon: 'flowbite:aws-solid',
      size: '20',
      color: '#FF9900',
      areas: [areas.CLOUD],
      startAt: '2024-01-01',
    },
    AZURE: {
      name: 'Azure',
      icon: 'simple-icons:microsoftazure',
      size: '20',
      color: '#0089D6',
      areas: [areas.CLOUD, areas.DEVOPS],
      startAt: '2024-01-01',
    },
    CLOUDFLARE: {
      name: 'Cloudflare',
      icon: 'simple-icons:cloudflare',
      size: '20',
      color: '#F38020',
      areas: [areas.CLOUD, areas.DEVOPS],
      startAt: '2022-01-01',
    },
    S3: {
      name: 'S3',
      icon: 'simple-icons:amazons3',
      size: '20',
      color: '#569A31',
      areas: [areas.CLOUD],
      startAt: '2024-01-01',
    },
    SQS: {
      name: 'SQS',
      icon: 'simple-icons:amazonsqs',
      size: '20',
      color: '#FF9900',
      areas: [areas.CLOUD],
      startAt: '2024-01-01',
    },
    LAMBDA: {
      name: 'Lambda',
      icon: 'simple-icons:awslambda',
      size: '20',
      color: '#FF9900',
      areas: [areas.CLOUD],
      startAt: '2024-01-01',
    },
    MINIO: {
      name: 'MinIO',
      icon: 'simple-icons:minio',
      size: '20',
      color: '#F68B20',
      areas: [areas.CLOUD],
      startAt: '2024-01-01',
    },
  
    KOTLIN: {
      name: 'Kotlin',
      icon: 'mdi:language-kotlin',
      size: '20',
      color: '#0095D5',
      areas: [areas.BACKEND, areas.MOBILE, areas.DESKTOP],
      startAt: '2024-01-01',
    },
    ANDROID: {
      name: 'Android',
      icon: 'mdi:android',
      size: '20',
      color: '#3DDC84',
      areas: [areas.MOBILE],
      startAt: '2024-01-01',
    },
    FLUTTER: {
      name: 'Flutter',
      icon: 'ri:flutter-fill',
      size: '20',
      color: '#02569B',
      areas: [areas.MOBILE, areas.DESKTOP, areas.FRONTEND],
      startAt: '2024-01-01',
    },
    TAURI: {
      name: 'Tauri',
      icon: 'devicon-plain:tauri',
      size: '20',
      color: '#F7DF1E',
      areas: [areas.FRONTEND, areas.DESKTOP, areas.MOBILE],
      startAt: '2023-01-01',
    },
  
    ESLINT: {
      name: 'ESLint',
      icon: 'simple-icons:eslint',
      size: '20',
      color: '#4B32C3',
      areas: [areas.BACKEND, areas.FRONTEND],
      startAt: '2020-01-01',
    },
    JEST: {
      name: 'Jest',
      icon: 'simple-icons:jest',
      size: '20',
      color: '#C21325',
      areas: [areas.BACKEND, areas.FRONTEND],
      startAt: '2023-01-01',
    },
    BUBBLETEA: {
      name: 'Bubbletea',
      icon: 'streamline-plump:erlenmeyer-flask-solid',
      size: '20',
      color: '#00ADD8',
      hidden: true,
      areas: [areas.BACKEND],
      startAt: '2025-01-01',
    },
    LIPGLOSS: {
      name: 'Lipgloss',
      icon: 'lets-icons:flask',
      size: '20',
      color: '#FF6F61',
      hidden: true,
      areas: [areas.BACKEND],
      startAt: '2025-01-01',
    }
  } as const;

  type TechsNames = keyof typeof techs;
  type TechExtras = Partial<Pick<Technology, 'description' | 'knowledges'>>;
  const withI18n = Object.fromEntries(
    Object.entries(techs).map(([key, tech]) => {
      const extras = tech as unknown as TechExtras;
      return [
        key,
        {
          ...tech,
          description: extras.description ?? (() => t(`skills.knowledges.${key}.description`)),
          knowledges: extras.knowledges ?? (() => {
            const raw = tm(`skills.knowledges.${key}.list`) as unknown;
            if (Array.isArray(raw)) {
              return raw
                .map((item: unknown) => {
                  if (typeof item === 'string') return item;
                  if (item && typeof item === 'object') {

                    const obj = item as Record<string, unknown>;
                    const loc = (obj as { loc?: { source?: unknown } }).loc;
                    const source = typeof loc?.source === 'string' ? loc.source : undefined;

                    if (source) return source;
                    
                    const value = (obj as { value?: unknown }).value;
                    if (typeof value === 'string') return value;
                  }
                  return '';
                })
                .filter((s): s is string => Boolean(s && typeof s === 'string'));
            }
            return [] as string[];
          }),
        },
      ];
    }),
  );
  return withI18n as unknown as Record<TechsNames, Technology>;
};

type TechnologyKeys = keyof ReturnType<typeof technologies>;
export function useTechnologies(t: (path: string) => string, tm: (path: string) => unknown): Record<TechnologyKeys, Technology> {
  return technologies(t, tm) as unknown as Record<TechnologyKeys, Technology>;
}

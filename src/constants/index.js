import {
  python,
  tensorflow,
  scikit_learn,
  pytorch,
  keras,
  numpy,
  pandas,
  pycharm,
  jupyter,
  mobile,
  backend,
  creator,
  web,
  gan_dapt,
  neuro_drive,
  market_predict,
  souldive_main,
  ashuel_title,
  dungeon_feedback_title,
  microsoft,
  adani,
  bn_software,
  ericsson,
  copernilabs_logo,
  excel_logo,
  ppt_logo,
  unreal_logo,
  tripo_logo,
  claudecode_logo,
  mcp_logo,
  souldive_doc,
  quest_doc,
  dungeon_doc,
  engine_1,
  engine_2,
  engine_3,
  level_1,
  ai_prompting,
  level_2,
  level_3,
  logo,
  kaywon_logo,
  kyungil_logo,
  nca_logo,
  souldive_1,
  souldive_2,
  mars_1,
  mars_2,
  ashuel_2,
  baetal_1,
  baetal_2,
  mansion_1,
  mansion_2,
  dungeon_2,
  maple_1,
  maple_2,
  lustywood_1,
  lustywood_2,
  project1_1,
  project1_2,
  project1_3,
  project2_1,
  project2_2,
  project2_3,
  project3_1,
  project3_2,
  project3_3,
} from '../assets';

export const navLinks = [];

const services = [
  {
    id: 'documentation',
    title: '문서화 역량',
    description: '기획 의도를 시각화하여 전달할 수 있는 역량',
    icons: [excel_logo, ppt_logo],
  },
  {
    id: 'engine-knowledge',
    title: '개발 엔진 지식',
    description: '실현가능한 기획과 개발자와의 소통을 위한 기초 지식',
    icons: [unreal_logo],
  },
  {
    id: 'ai-prototyping',
    title: 'AI 프로토타이핑',
    description: '신속한 플레이 경험 검증을 위한 AI활용역량',
    icons: [tripo_logo, claudecode_logo, mcp_logo],
    animated: true, // 애니메이션 플래그
  },
];

// 주특기 상세 정보 (모달용)
const skillDetails = [
  {
    id: 'documentation',
    title: '문서화 역량',
    images: [
      {
        src: souldive_doc,
        title: 'SoulDive 발표 문서',
        intent: '기획을 위해 본질을 파악하는 사고와 유저 경험 흐름을 생각하는 과정을 보여드리기 위함입니다.'
      },
      {
        src: quest_doc,
        title: 'Ashuel 퀘스트 기획서',
        intent: '실무에 근접한 시스템 기획 역량과 큰 그림과 방향성을 토대로 기획하는 역량을 보여드리기 위함입니다.'
      },
      {
        src: dungeon_doc,
        title: '던전 피드백 기획서',
        intent: '과거부터 현재까지의 성장 과정을 보여드리기 위해 과거 작성하였던 기획서도 함께 첨부하였습니다.'
      }
    ],
    portfolioFiles: [
      {
        name: '강병민_SoulDive_발표문서.pdf',
        url: '/portfolios/SoulDive_Presentation.pdf'
      },
      {
        name: '강병민_Ashuel_퀘스트 기획서.xlsx',
        url: '/portfolios/Ashuel_Quest_Design.xlsx'
      },
      {
        name: '강병민_던전피드백_기획발표문서.pdf',
        url: '/portfolios/DungeonFeedback_Presentation.pdf'
      }
    ]
  },
  {
    id: 'engine-knowledge',
    title: '개발 엔진 지식',
    description: 'NCA 팀프로젝트에서 개발 포지션으로 참여하여 개발에 대한 기초 지식과 개발자의 입장에서의 커뮤니케이션을 통해 소통 언어를 체득하였습니다.',
    images: [
      {
        src: engine_1,
        title: '프로젝트 개발 작업 컷'
      },
      {
        src: engine_2,
        title: '명상기법 적용 AI 페르소나 NPC 테스트 컷'
      },
      {
        src: engine_3,
        title: '언리얼엔진 블루프린트 컷'
      }
    ],
    portfolioFiles: []
  },
  {
    id: 'ai-prototyping',
    title: 'AI 프로토타이핑',
    description: '가공되지 않은 레벨 디자인의 핵심 정보를 AI에게 상세히 프롬프팅하여 시각화와 테스트 가능한 결과물까지 단 2일만에 도출하며 효율을 높였습니다.',
    images: [
      {
        src: level_1,
        title: '① 레벨디자인 및 시스템 기획서 준비페이지 - 1일',
        intent: '초안 기획을 바탕으로 AI 문서 시각화를 통해 빠른 중간 보고 및 피드백과 실배치 진행으로 2일 만에 테스트 가능한 프로토타입을 제작하였습니다.'
      },
      {
        src: ai_prompting,
        title: '② 정보 제공 및 시각화 가이드 프롬프팅 - 5분',
        intent: 'AI에게 레벨디자인의 핵심 정보를 제공하고 시각화 방향을 명확히 가이드하는 프롬프트를 작성하여 효율적인 결과물을 도출했습니다.'
      },
      {
        src: level_2,
        title: '③ 레벨디자인 개요 문서 AI시각화 - 10분',
        intent: 'AI를 활용하여 10분 만에 문서를 시각화하고 팀원들과 빠른 피드백을 받아 프로토타입 제작 시간을 단축했습니다.'
      },
      {
        src: level_3,
        title: '④ 레벨디자인 초안 캡처 - 1일',
        intent: '1일 만에 레벨디자인 초안을 실배치하고 PC 밸런싱을 진행하여 빠른 플레이 테스트가 가능했습니다.'
      }
    ],
    portfolioFiles: [
      {
        name: '강병민_Chap1점프맵_레벨 기획서 초안.xlsx',
        url: '/portfolios/Level_Design_Draft.xlsx'
      },
      {
        name: '강병민_레벨디자인 개요 문서.pdf',
        url: '/portfolios/Level_Design_Overview.pdf'
      }
    ]
  },
];

const technologies = [
  {
    name: 'Python',
    icon: python,
  },
  {
    name: 'Tensorflow',
    icon: tensorflow,
  },
  {
    name: 'Scikit Learn',
    icon: scikit_learn,
  },
  {
    name: 'PyTorch',
    icon: pytorch,
  },
  {
    name: 'Keras',
    icon: keras,
  },
  {
    name: 'NumPy',
    icon: numpy,
  },
  {
    name: 'Pandas',
    icon: pandas,
  },
  {
    name: 'PyCharm',
    icon: pycharm,
  },
  {
    name: 'Jupyter',
    icon: jupyter,
  },
];

const experiences = [
  // 뉴콘텐츠아카데미 (대분류)
  {
    type: 'institution',
    title: '뉴콘텐츠아카데미',
    description: 'AI의 가능성을 보며 업무에 적용하기 위해 입학하였습니다\nㅤAI 활용 흐름을 사고하며 업무 효율을 극대화하였습니다',
    date: '2024. 08 ~ 현재',
    icon: nca_logo,
    iconBg: '#383E56',
  },
  {
    type: 'project',
    title: '소울다이브 | 스토리텔링 플랫포머',
    description: '개발자로 참여하여 명상 기법 AI페르소나가\n적용된 게임',
    date: '2024. 02 - 2024. 08',
    images: [souldive_1, souldive_2],
    icon: logo,
    iconBg: '#E6DEDD',
  },
  {
    type: 'project',
    title: '화성갈끄니까! | 멀티 코믹 레이싱',
    description: '10대 타겟 로블록스 NCA 홍보용 게임',
    date: '2023. 08 - 2023. 12',
    images: [mars_1, mars_2],
    icon: logo,
    iconBg: '#E6DEDD',
  },

  // 경일게임아카데미 (대분류)
  {
    type: 'institution',
    title: '경일게임아카데미',
    description: '실무를 익혀 기업에 투입가능한 인재로 성장하고싶었습니다 직무의 이해와 문서 스킬, 협업 경험으로 역량을 쌓았습니다',
    date: '2023. 06 - 2024. 02',
    icon: kyungil_logo,
    iconBg: '#383E56',
  },
  {
    type: 'project',
    title: 'Ashuel | VR 오픈월드 마법 액션',
    description: '협약 기업의 요구사항을 토대로 제작한 게임',
    date: '2023. 10 - 2024. 02',
    images: [ashuel_title, ashuel_2],
    icon: logo,
    iconBg: '#E6DEDD',
  },
  {
    type: 'project',
    title: '배탈이야! | 멀티 협동 코믹 플랫포머',
    description: '제한 시간(배탈)내 협동하여 화장실에\n도착하는 게임',
    date: '2023. 07 - 2023. 07',
    images: [baetal_1, baetal_2],
    icon: logo,
    iconBg: '#E6DEDD',
  },
  {
    type: 'project',
    title: '몽중저택 | PPT기반 포인트 앤 클릭 호러',
    description: '악몽에서 해방되기 위한 꿈 속 저택 탈출 게임',
    date: '2023. 06 - 2023. 06',
    images: [mansion_1, mansion_2],
    icon: logo,
    iconBg: '#E6DEDD',
  },

  // 계원예술대학교 (대분류)
  {
    type: 'institution',
    title: '계원예술대학교',
    description: '게임 제작의 진로를 가지고 전공을 선택하여 입문하였습니다각 직군의 기초를 배우며 기획자로의 첫 걸음을 시작했습니다.',
    date: '2017. 03 - 2023. 02',
    icon: kaywon_logo,
    iconBg: '#383E56',
  },
  {
    type: 'project',
    title: '던전피드백 | 슈팅액션 로그라이크',
    description: '신이 만든 게임의 던전을 헤쳐나가는 게임',
    date: '2022. 06 - 2022. 12',
    images: [dungeon_feedback_title, dungeon_2],
    icon: logo,
    iconBg: '#E6DEDD',
  },
  {
    type: 'project',
    title: '메이플팡팡 | 횡스크롤 리듬 액션',
    description: '위아래로  등장하는 몬스터를 음악에 맞게\n타격하는 게임',
    date: '2022. 03 - 2022. 06',
    images: [maple_1, maple_2],
    icon: logo,
    iconBg: '#E6DEDD',
  },
  {
    type: 'project',
    title: 'Lusty wood | 장애물 극복 하드 플랫포머',
    description: '장애물에 알맞는 동물로 전환하여 극복해\n나아가는 게임',
    date: '2017. 09 - 2017. 12',
    images: [lustywood_1, lustywood_2],
    icon: logo,
    iconBg: '#E6DEDD',
  },
];

const projects = [
  {
    name: 'SoulDive | 스토리텔링 플랫포머',
    slug: 'meditation-platformer',
    date: '2025. 08',
    description:
      '정적인 명상과 동적인 게임을 결합하여, 일에 치여 힘들었던 직장인이나 번아웃을 경험한 유저에게 자신을 돌아볼 수 있는 시간을 제공하는 플랫포머 게임입니다.',
    tags: [
      {
        name: '언리얼엔진',
        color: 'blue-text-gradient',
      },
      {
        name: '시스템기획',
        color: 'green-text-gradient',
      },
      {
        name: '페르소나AI',
        color: 'pink-text-gradient',
      },
    ],
    image: souldive_main,
    source_code_link: 'https://github.com/',

    // Category tags for breadcrumb
    category: ['게임', '플랫포머', '언리얼엔진'],

    // Media gallery (1 video + 4 images)
    media: [
      {
        type: 'video',
        youtubeId: 'gF386vSpF7k',
      },
      {
        type: 'image',
        src: project1_1,
      },
      {
        type: 'image',
        src: project1_2,
      },
      {
        type: 'image',
        src: project1_3,
      },
    ],

    // Modal data (기존 youtubeId는 하위 호환성을 위해 유지)
    youtubeId: 'gF386vSpF7k',
    information: {
      organization: '뉴콘텐츠아카데미',
      teamSize: '2명',
      duration: '6개월',
      engine: '언리얼엔진',
    },
    role_brief: '프로젝트 총괄, 시스템 기획 및 개발\n담당 의도: 시스템 흐름 이해와 소통을 위해 담당하였습니다.',
    problem_brief: '정적인 명상과 동적인 게임이라는 상반되는 주제의 결합',
    solution_brief:
      '명상과 게임의 상반된 결을 잇기 위해 명상 전문가인 팀원에게 배움을 청했고, 자신을 마주함이라는 "명상의 본질" 을 이해했습니다. 제가 경험했던 불안에 밀려 달리는 나를 "점프 플랫포머로 표현" 하고, 전문 명상 기법이 담긴 "AI 페르소나 자아 NPC와의 대화" 를 통해 "위로와 성찰의 재미를 설계" 했습니다.',
    solution_kpi: '팀워크',
    result_brief:
      '새로운 시도인 점에서 약간의 우려가 있었지만 전시 설문 참여자 60% 이상이 NPC와 대화하며 "자신의 이야기에 몰입" 했다고 응답하였습니다. 현장에선 대화에 머물러 "명상을 플레이" 하는 장면이 이어졌고, 기획 의도의 전달을 확인했습니다.',
    result_kpi: '기획의도 → 유저 경험 도출',
    experience:
      '서로의 강점을 믿고 존중하는 팀워크가 프로젝트의 추진력이 되었습니다. 의견이 나뉠 때 멈춰 듣고 서로의 생각에 대해 고민하며 리더십이란 답을 아는 사람이 아니라, "답이 나오도록 장을 여는 사람" 이라는 것을 배우게 되었습니다 이 경험을 바탕으로 해답을 주도하기보다 "해답이 태어나는 환경을 만드는 리더십" 을 갖춘 인재로 성장했습니다.',
    experience_kpi: '리더십 정의',
    proof_links: [],
  },
  {
    name: 'Ashuel | VR 오픈월드 마법 액션',
    slug: 'neuro-drive',
    date: '2024. 02',
    description:
      'VR만의 조작을 지팡이 마법진 그리기로 마법스킬을 사용하여 모험하고 여정의 끝에서 나의 마법사 성향을 알 수 있는, 액션과 MBTI의 경험을 설계한 게임입니다.',
    tags: [
      {
        name: 'Opencv-python',
        color: 'blue-text-gradient',
      },
      {
        name: 'Pandas',
        color: 'green-text-gradient',
      },
      {
        name: 'Numpy',
        color: 'pink-text-gradient',
      },
    ],
    image: ashuel_title,
    source_code_link: 'https://github.com/',

    // Media gallery (1 video + 4 images)
    media: [
      {
        type: 'video',
        youtubeId: 'Y6tihJiLqhU',
      },
      {
        type: 'image',
        src: project2_1,
      },
      {
        type: 'image',
        src: project2_2,
      },
      {
        type: 'image',
        src: project2_3,
      },
    ],

    // Modal data
    youtubeId: 'Y6tihJiLqhU',
    information: {
      organization: '경일게임아카데미',
      teamSize: '8명',
      duration: '3개월',
      engine: '유니티',
    },
    role_brief: 'PM, 퀘스트 기획\n담당 의도: 체계적인 프로젝트 진행 운영과 오픈월드 장르의 플레이어 동선, 경험 설계를 도전하고자 담당하였습니다.',

    // KPI badges for project card (displayed on card)
    solution_kpi: '회의 주도',
    result_kpi: '협업 효율화',
    experience_kpi: '실무 이해',
    fourth_kpi: '기업 협약',

    // PM role data
    problem_pm: '기획팀과 개발팀 간의 이해관계 충돌',
    solution_pm: '프로젝트 초기에 기획팀의 "기획 소요 시간동안 개발팀 진행 지연 문제"로 의견 충돌이 있었습니다 저는 협업이 빠르게 진행될 수 있도록 "게임의 핵심 키워드를 찾는 방향"의 회의를 주도하여 "마법" 을 도출하였고 곧바로 개발팀은 마법 시스템에 대해 R&D 작업을 진행할 수 있었습니다.',
    solution_kpi_pm: '회의 주도',
    result_pm: '마법의 구체적 기획과 동시에, 같은 날까지 동시에 진행되었던 R&D 사항을 바탕으로 재미와 실현가능성을 함께 고민하며 "기존 회의 시간의 50% 이상 단축" 되었고 "일주일 만에 코어시스템 심화 디벨롭이 진행" 될 수 있도록 하였습니다 또한 양 팀의 신뢰가 높아져 팀워크의 발전이 있었습니다.',
    result_kpi_pm: '협업 효율화',
    experience_pm: '타 직군과 함께 협업 시 "이해를 바탕으로 업무의 우선순위 기준을 명확히 잡는 것" 과 "주제 선정에 따라 회의가 효율적으로 진행될 수 있다는 것을 체득"하여 이를 프로젝트에서 적용할 수 있는 기획자로 성장하였습니다.',
    experience_kpi_pm: '우선순위',

    // Quest role data
    problem_quest: '플레이어의 MBTI를 알 수 있도록하는 데이터 기반 퀘스트 시스템 설계',
    solution_quest: '튜토리얼부터 엔딩까지의 여정 속 NPC의 미션을 받는 유저가 자연스럽게 문답을 선택하는 과정으로 "데이터를 수집하여 결과를 알 수 있는 시스템을 설계" 하고 "내부 테스트가 가능하도록 Dialogue 구조를 제작" 하였습니다',
    solution_kpi_quest: '데이터 설계',
    result_quest: '유저 경험의 큰 그림과 UI/UX, NPC, 보상 등 요소 관리를 위한 "참조 형태의 데이터테이블 설계 경험"으로 실무 역량을 크게 올릴 수 있었고, MBTI 대화 구조 설계 5일만에 내부 테스트를 진행하여 "팀원의 50% 이상이 실제 MBTI와 동일한 결과를 확인검증 후 추진" 할 수 있었습니다.',
    result_kpi_quest: '빠른 검증',
    experience_quest: '퀘스트 전반을 설계하며 "숲을 보는 시야와 몰입을 위한 유저 경험의 흐름을 이해" 하게 되었고, "확장성과 효율적 관리를 위한 데이터테이블 설계 및 프로토타입 검증 경험" 으로 실무 업무의 이해를 길렀습니다.',
    experience_kpi_quest: '실무 이해',
    proof_links: [],
  },
  {
    name: '던전피드백 | 로그라이크 슈팅액션',
    slug: 'dungeon-feedback',
    date: '2022. 11',
    description:
      '신이 제작한 게임의 버그를 고쳐나간다는 컨셉의 맞추고 피하는 손맛의 재미 경험을 8방향 슈팅액션과 무기강화 요소로 설계한 로그라이크 게임입니다.',
    tags: [
      {
        name: 'Unity',
        color: 'blue-text-gradient',
      },
      {
        name: '로그라이크',
        color: 'green-text-gradient',
      },
      {
        name: '슈팅액션',
        color: 'pink-text-gradient',
      },
    ],
    image: dungeon_feedback_title,
    source_code_link: '',

    // Media gallery (1 video + 4 images)
    media: [
      {
        type: 'video',
        youtubeId: 'fNUo7o-qxnU',
      },
      {
        type: 'image',
        src: project3_1,
      },
      {
        type: 'image',
        src: project3_2,
      },
      {
        type: 'image',
        src: project3_3,
      },
    ],

    // Modal data
    youtubeId: 'fNUo7o-qxnU',
    information: {
      organization: '계원예술대학교',
      teamSize: '9명',
      duration: '6개월',
      engine: '유니티',
    },
    role_brief: '프로젝트 리더, 메인 기획\n담당의도: 팀을 주도하여 리더십을 키우고 로그라이크 장르의 재미를 설계하여 저의 기획을 검증하고싶었습니다.',

    // 프로젝트 카드용 KPI (역할 통합)
    solution_kpi: '레퍼런스 분석',
    result_kpi: '수정 효율 40% 향상',
    experience_kpi: '장점 존중',

    // 개발팀 파트
    problem_dev: '키보드 마우스를 함께 사용하는 것이 아닌 키보드 만을 사용하는 것이 조작의 재미를 높일 수 있다는 기획 의도에서 이동과 공격의 방향이 서로 다를 때의 시스템 설계 오류',
    solution_dev: '당시 키보드와 마우스가 아닌 키보드만을 사용하는 로그라이크 게임들을 찾던 중 "아이작의 구속"이라는 참고 게임을 찾았고 개발자와 함께 연구하였습니다. 그 결과 "상체와 하체가 분리되어 움직임을 구현"하였다는 것을 발견하고 이를 바탕으로 아트팀과 함께 회의하여 상체와 하체가 분리되어도 어색하지 않는 옷과 체형을 구상하여 구현하였습니다.',
    solution_kpi_dev: '레퍼런스 분석',
    result_dev: '내부에서부터 테스트를 거쳐 조작의 재미를 검증하였고 나아가 졸업 전시회에서도 인디게임을 선호하는 유저 60% 이상이 "특유의 손맛이 느껴진다"고 하여 의도에 대한 검증과 뿌듯함을 느낀 경험을 하였습니다.',
    result_kpi_dev: '기획 의도 검증',
    experience_dev: '"레퍼런스 게임을 분석하고 공유하는 것"이 소통과 구현의 효율을 높여준다는 것을 배우게되어 이후 프로젝트에서는 레퍼런스와 시각자료를 바탕으로 소통하며 팀의 생각을 일치시키는 기획자로 성장하였습니다.',
    experience_kpi_dev: '소통 역량 강화',

    // 아트팀 파트
    problem_art: '7명의 아트팀의 서로 다른 그림체로 아트 컨셉 통일 문제',
    solution_art: '먼저 회의를 통해 팀원 중 1명에게 "아트 디렉터 역할"을 부여하였습니다. 그 결과 그림체에 대한 상세한 분석과 가이드가 아트팀 전원에게 공유되었고, 작업물을 서로 비교하고 함께 피드백하는 과정에서 비율도 조정하게 되어 일관성있게 진행을 이어나가게 되었습니다.',
    solution_kpi_art: '책임 부여',
    result_art: '팀원의 장점을 믿고 책임을 나누어 서로가 주도하며 업무를 진행할 수 있었고, 그림체와 비율에 대한 명확한 기준과 구체적인 피드백 회의로 제작된 리소스 "수정의 시간이 약 40% 이상 단축"되었습니다.',
    result_kpi_art: '수정 효율 40% 향상',
    experience_art: '"장점을 바탕으로 책임을 맡기는 것"이 리더십을 발휘할 수 있는 환경을 마련한다는 것을 깨달았고 이후 프로젝트에서는 팀원의 장점에 대해 더욱 관심을 갖고 존중하는 기획자가 되었습니다.',
    experience_kpi_art: '장점 존중',

    proof_links: [],
  },
];

export { services, technologies, experiences, projects, skillDetails };

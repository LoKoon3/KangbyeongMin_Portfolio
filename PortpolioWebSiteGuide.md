# 3D Portfolio Website - AI Handoff Guide

이 문서는 다른 AI 시스템에게 웹사이트 구조를 전달하기 위한 종합 가이드입니다.

---

## 📋 프로젝트 개요

**프로젝트명**: Stunning 3D Portfolio Website
**기술 스택**: React 18.2 + Three.js + React Three Fiber + Vite + TailwindCSS
**타입**: Single Page Application (SPA)
**3D 엔진**: Three.js 0.154 with React Three Fiber 8.13.4

---

## 🗂️ 전체 파일 구조

```
Stunning_3D_Portfolio_Website/
│
├── public/                          # 정적 자산
│   ├── desktop_pc/                  # 3D 모델: 데스크탑 컴퓨터 (Hero 섹션)
│   │   ├── scene.gltf
│   │   └── textures/
│   ├── planet/                      # 3D 모델: 지구 (Contact 섹션)
│   │   ├── scene.gltf
│   │   └── textures/
│   └── [아이콘 이미지들]
│
├── src/
│   ├── components/                  # React 컴포넌트
│   │   ├── canvas/                  # 3D Canvas 컴포넌트
│   │   │   ├── Ball.jsx            # 회전하는 기술 아이콘 (9개)
│   │   │   ├── Computers.jsx       # 데스크탑 3D 모델
│   │   │   ├── Earth.jsx           # 지구 3D 모델
│   │   │   ├── Stars.jsx           # 배경 별 파티클 (5000개)
│   │   │   └── index.js            # Barrel export
│   │   │
│   │   ├── About.jsx               # About 섹션 (서비스 소개)
│   │   ├── Contact.jsx             # 연락 폼 + Earth Canvas
│   │   ├── Experience.jsx          # 경력 타임라인
│   │   ├── Feedbacks.jsx           # 고객 추천사
│   │   ├── Hero.jsx                # 히어로 섹션 + Computers Canvas
│   │   ├── Loader.jsx              # 3D 로딩 인디케이터
│   │   ├── Navbar.jsx              # 고정 네비게이션
│   │   ├── Tech.jsx                # 기술 스택 (9개 Ball Canvas)
│   │   ├── Works.jsx               # 프로젝트 쇼케이스
│   │   └── index.js                # Barrel export
│   │
│   ├── hoc/                         # Higher Order Components
│   │   ├── SectionWrapper.jsx      # 섹션 애니메이션 래퍼
│   │   └── index.js
│   │
│   ├── utils/                       # 유틸리티
│   │   └── motion.js               # Framer Motion 애니메이션 variants
│   │
│   ├── constants/                   # 데이터 상수
│   │   └── index.js                # 모든 포트폴리오 데이터 (정적)
│   │
│   ├── assets/                      # 이미지 자산
│   │   ├── tech/                   # 기술 아이콘 (Python, TensorFlow 등)
│   │   ├── company/                # 회사 로고
│   │   ├── testimonials/           # 추천인 사진
│   │   └── index.js                # Asset imports
│   │
│   ├── App.jsx                      # 메인 앱 컴포넌트
│   ├── main.jsx                     # React 진입점
│   ├── index.css                    # 글로벌 스타일 + 그라디언트
│   └── styles.js                    # Tailwind 유틸리티 클래스
│
├── .env                             # 환경 변수 (EmailJS 설정)
├── vite.config.js                   # Vite 빌드 설정
├── tailwind.config.js               # Tailwind 커스텀 테마
├── postcss.config.js                # PostCSS 설정
├── package.json                     # 의존성 및 스크립트
└── CLAUDE.md                        # Claude Code 가이드

```

---

## 🏗️ 핵심 아키텍처

### 1. 컴포넌트 계층 구조

```
App (BrowserRouter)
│
├── Navbar (고정, z-index: 20)
│   └── 네비게이션 링크: About, Work, Contact
│
├── Hero Section
│   └── ComputersCanvas (3D 데스크탑 모델)
│
├── About Section
│   └── ServiceCard × 4 (Tilt 효과)
│
├── Experience Section
│   └── VerticalTimeline (경력 5개)
│
├── Tech Section
│   └── BallCanvas × 9 (기술 아이콘)
│
├── Works Section
│   └── ProjectCard × 3 (Tilt 효과)
│
├── Feedbacks Section
│   └── FeedbackCard × 3 (추천사)
│
├── Contact Section
│   ├── EmailJS Form
│   └── EarthCanvas (3D 지구 모델)
│
└── StarsCanvas (배경, z-index: -1)
```

### 2. 데이터 흐름

```
constants/index.js (중앙 데이터 저장소)
    │
    ├─→ navLinks (3개)
    ├─→ services (4개)
    ├─→ technologies (9개)
    ├─→ experiences (5개)
    ├─→ testimonials (3개)
    └─→ projects (3개)
         ↓
    각 컴포넌트로 props 전달
         ↓
    map()으로 렌더링
```

**특징**: API 호출 없음 - 모든 데이터가 정적 상수

---

## 🎨 스타일링 시스템

### Tailwind 커스텀 테마 (tailwind.config.js)

```javascript
colors: {
  primary: "#050816",      // 다크 블루 (배경)
  secondary: "#aaa6c3",    // 라이트 퍼플 (텍스트)
  tertiary: "#151030",     // 더 어두운 블루
  "black-100": "#100d25",
  "black-200": "#090325",
  "white-100": "#f3f3f3",
}

boxShadow: {
  card: "0px 35px 120px -15px #211e35",
}

backgroundImage: {
  "hero-pattern": "url('/src/assets/herobg.png')",
}
```

### CSS 그라디언트 (index.css)

```css
.black-gradient {
  background: linear-gradient(90deg, #161329 0%, rgba(60, 51, 80, 0) 100%);
}

.violet-gradient {
  background: linear-gradient(-90deg, #804dee 0%, rgba(60, 51, 80, 0) 100%);
}

.green-pink-gradient {
  background: linear-gradient(90deg, #00cea8 1%, #bf61ff 100%);
}

/* 텍스트 그라디언트 */
.blue-text-gradient { ... }
.green-text-gradient { ... }
.pink-text-gradient { ... }
.orange-text-gradient { ... }
```

### 반응형 스타일 (styles.js)

```javascript
heroHeadText: "font-black text-white
  lg:text-[80px]
  sm:text-[60px]
  xs:text-[50px]
  text-[40px]"

paddingX: "sm:px-16 px-6"
paddingY: "sm:py-16 py-6"
```

---

## 🎬 애니메이션 시스템

### Framer Motion Variants (utils/motion.js)

#### 1. **textVariant(delay)**
```javascript
// 텍스트가 위에서 아래로 슬라이드 + 페이드인
{
  hidden: { y: -50, opacity: 0 },
  show: { y: 0, opacity: 1, delay }
}
```

#### 2. **fadeIn(direction, type, delay, duration)**
```javascript
// 방향별 슬라이드 + 페이드인
direction: "left" | "right" | "up" | "down"
type: "spring" | "tween"
```

#### 3. **zoomIn(delay, duration)**
```javascript
// 중앙에서 확대
{ scale: 0, opacity: 0 } → { scale: 1, opacity: 1 }
```

#### 4. **slideIn(direction, type, delay, duration)**
```javascript
// 전체 슬라이드 인
```

#### 5. **staggerContainer()**
```javascript
// 자식 요소들을 순차적으로 애니메이션
staggerChildren: 0.1
delayChildren: 0
```

### SectionWrapper HOC 패턴

```javascript
// 모든 섹션에 적용되는 공통 애니메이션 래퍼
export default SectionWrapper(Component, idName);

// 제공 기능:
// - Framer Motion staggerContainer
// - whileInView 트리거 (viewport의 25% 보일 때)
// - Hash 앵커 (#about, #work, #contact)
// - 일관된 padding & max-width
```

---

## 🎮 3D 컴포넌트 상세 분석

### 1. Ball.jsx (기술 스택 아이콘)

```javascript
// 구조
<Canvas>
  <Suspense fallback={<CanvasLoader />}>
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />

      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          map={decal}  // 기술 아이콘 텍스처
          flatShading
        />
      </mesh>
    </Float>
  </Suspense>
</Canvas>

// 특징
- Icosahedron (20면체) 지오메트리
- Float 헬퍼로 부유 애니메이션
- Decal로 이미지 텍스처 적용
- 9개가 Tech 섹션에서 그리드 배치
```

### 2. Computers.jsx (히어로 데스크탑)

```javascript
// 구조
const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf');

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 20]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

// Canvas 설정
<Canvas
  frameloop="demand"  // 필요할 때만 렌더링 (성능 최적화)
  shadows
  camera={{ position: [20, 3, 5], fov: 25 }}
  gl={{ preserveDrawingBuffer: true }}  // 스크린샷 가능
>
  <Suspense fallback={<CanvasLoader />}>
    <OrbitControls
      enableZoom={false}
      maxPolarAngle={Math.PI / 2}  // 수직 회전 제한
      minPolarAngle={Math.PI / 2}
    />
    <Computers isMobile={isMobile} />
  </Suspense>
  <Preload all />
</Canvas>

// 반응형 처리
- window.matchMedia('(max-width: 500px)')로 모바일 감지
- 모바일: scale 0.7, position [0, -3, -2.2]
- 데스크탑: scale 0.75, position [0, -3.25, -1.5]
```

### 3. Earth.jsx (연락 섹션 지구)

```javascript
// 구조
const Earth = () => {
  const earth = useGLTF('./planet/scene.gltf');

  return (
    <primitive
      object={earth.scene}
      scale={2.5}
      position-y={0}
      rotation-y={0}
    />
  );
};

// Canvas 설정
<Canvas
  shadows
  frameloop="demand"
  gl={{ preserveDrawingBuffer: true }}
  camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
>
  <Suspense fallback={<CanvasLoader />}>
    <OrbitControls
      autoRotate           // 자동 회전
      enableZoom={false}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
    />
    <Earth />
  </Suspense>
  <Preload all />
</Canvas>
```

### 4. Stars.jsx (배경 별 파티클)

```javascript
// 구조
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = () => {
  const ref = useRef();

  // 5000개의 랜덤 좌표 생성 (구 안에 분포)
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.2 });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;  // X축 회전
    ref.current.rotation.y -= delta / 15;  // Y축 회전
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Canvas 설정
<Canvas camera={{ position: [0, 0, 1] }}>
  <Suspense fallback={null}>
    <Stars />
  </Suspense>
</Canvas>

// 특징
- Points 지오메트리로 성능 최적화
- useFrame으로 연속 회전 애니메이션
- 배경에 고정 (position: absolute, z-index: -1)
```

---

## 📦 주요 데이터 구조 (constants/index.js)

### navLinks (네비게이션)
```javascript
[
  { id: 'about', title: 'About' },
  { id: 'work', title: 'Work' },
  { id: 'contact', title: 'Contact' }
]
```

### services (서비스 카드)
```javascript
[
  { title: 'Machine Learning', icon: web },
  { title: 'Algorithms and Models', icon: mobile },
  { title: 'Deep Learning Frameworks', icon: backend },
  { title: 'Neural Networks', icon: creator }
]
```

### technologies (기술 스택)
```javascript
[
  { name: 'Python', icon: python },
  { name: 'Tensorflow', icon: tensorflow },
  { name: 'Scikit Learn', icon: scikit_learn },
  { name: 'PyTorch', icon: pytorch },
  { name: 'Keras', icon: keras },
  { name: 'NumPy', icon: numpy },
  { name: 'Pandas', icon: pandas },
  { name: 'PyCharm', icon: pycharm },
  { name: 'Jupyter', icon: jupyter }
]
```

### experiences (경력 타임라인)
```javascript
[
  {
    title: 'Machine Learning Intern',
    company_name: 'Microsoft',
    icon: microsoft,
    iconBg: '#383E56',
    date: 'June 2019 - July 2019',
    points: [
      'Completed a summer internship...',
      'Worked on analysis of machine learning...',
      // ...
    ]
  },
  // ... 5개 경력
]
```

### testimonials (추천사)
```javascript
[
  {
    testimonial: 'An AI optimization prodigy...',
    name: 'Kamel Tourki',
    designation: 'Research and Standardization Manager',
    company: 'Ericsson',
    image: kamel_tourki
  },
  // ... 3개 추천사
]
```

### projects (프로젝트)
```javascript
[
  {
    name: 'GAN-DAPT',
    description: 'Leveraging domain-invariant image translations...',
    tags: [
      { name: 'DaSeGAN', color: 'blue-text-gradient' },
      { name: 'DaSeGAN-S', color: 'green-text-gradient' },
      { name: 'DaSeGAN-T', color: 'pink-text-gradient' }
    ],
    image: gan_dapt,
    source_code_link: 'https://github.com/'
  },
  // ... 3개 프로젝트
]
```

---

## 🔧 개발 명령어

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 코드 품질 검사
npm run lint
```

---

## 🌐 환경 변수 (.env)

```env
VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

**사용처**: Contact.jsx의 이메일 전송 기능 (EmailJS)

---

## 📝 핵심 패턴 및 규칙

### 1. Barrel Export 패턴
```javascript
// components/index.js
export { default as Navbar } from './Navbar';
export { default as Hero } from './Hero';
export { default as About } from './About';
// ...

// 사용
import { Navbar, Hero, About } from './components';
```

### 2. Canvas 공통 패턴
```javascript
<Canvas frameloop="demand" gl={{ preserveDrawingBuffer: true }}>
  <Suspense fallback={<CanvasLoader />}>
    {/* 3D 컴포넌트 */}
  </Suspense>
  <Preload all />
</Canvas>
```

### 3. 반응형 감지 패턴
```javascript
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const mediaQuery = window.matchMedia('(max-width: 500px)');
  setIsMobile(mediaQuery.matches);

  const handleMediaQueryChange = (event) => {
    setIsMobile(event.matches);
  };

  mediaQuery.addEventListener('change', handleMediaQueryChange);

  return () => {
    mediaQuery.removeEventListener('change', handleMediaQueryChange);
  };
}, []);
```

### 4. SectionWrapper HOC 사용
```javascript
import { SectionWrapper } from '../hoc';

const MyComponent = () => { /* ... */ };

export default SectionWrapper(MyComponent, 'sectionId');
```

### 5. 3D 모델 로딩 패턴
```javascript
import { useGLTF } from '@react-three/drei';

const MyModel = () => {
  const model = useGLTF('./path/to/model.gltf');

  return <primitive object={model.scene} />;
};
```

---

## 🎯 주요 의존성 설명

| 패키지 | 버전 | 역할 |
|--------|------|------|
| react | 18.2.0 | UI 라이브러리 |
| three | 0.154.0 | 3D 그래픽 엔진 |
| @react-three/fiber | 8.13.4 | Three.js의 React 렌더러 |
| @react-three/drei | 9.77.7 | Three.js 헬퍼 (OrbitControls, Float 등) |
| framer-motion | 10.12.17 | 애니메이션 라이브러리 |
| react-tilt | 1.0.2 | 카드 기울기 효과 |
| react-vertical-timeline-component | 3.6.0 | 경력 타임라인 UI |
| @emailjs/browser | 3.11.0 | 클라이언트 이메일 전송 |
| maath | 0.7.0 | 수학 유틸리티 (랜덤 좌표 생성) |
| vite | 4.3.9 | 빌드 도구 |
| tailwindcss | 3.3.2 | 유틸리티 CSS 프레임워크 |

---

## 🚀 성능 최적화 포인트

1. **frameloop="demand"**: 필요할 때만 렌더링 (GPU/CPU 절약)
2. **Suspense + CanvasLoader**: 3D 모델 로딩 중 UX 개선
3. **Points 지오메트리**: 5000개 별을 효율적으로 렌더링
4. **Preload all**: 초기 로딩 시 모든 자산 미리 로드
5. **Code Splitting**: Vite의 자동 코드 분할
6. **Tailwind Purge**: 사용하지 않는 CSS 제거

---

## 📱 반응형 브레이크포인트

```javascript
// tailwind.config.js
screens: {
  xs: "450px",   // 커스텀 브레이크포인트
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
}

// 모바일 감지 (JavaScript)
window.matchMedia('(max-width: 500px)')
```

---

## 🎨 커스텀 스크롤바

```css
/* index.css */
.hash-span {
  margin-top: -100px;
  padding-bottom: 100px;
  display: block;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #050816;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #00cea8, #bf61ff);
  border-radius: 10px;
}
```

---

## 🔗 네비게이션 시스템

### Hash 기반 스크롤
```javascript
// Navbar.jsx
<a href={`#${nav.id}`}>{nav.title}</a>

// 각 섹션
<section id="about">...</section>
<section id="work">...</section>
<section id="contact">...</section>
```

### 스크롤 이벤트
```javascript
// Navbar.jsx - 스크롤에 따른 활성 링크 표시
const [active, setActive] = useState('');
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

## 📧 Contact Form (EmailJS 통합)

```javascript
// Contact.jsx
import emailjs from '@emailjs/browser';

const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  emailjs.send(
    import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
    {
      from_name: form.name,
      to_name: 'Your Name',
      from_email: form.email,
      to_email: 'your@email.com',
      message: form.message,
    },
    import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
  )
  .then(() => {
    setLoading(false);
    alert('Thank you. I will get back to you as soon as possible.');
    setForm({ name: '', email: '', message: '' });
  })
  .catch((error) => {
    setLoading(false);
    console.error(error);
    alert('Something went wrong. Please try again.');
  });
};
```

---

## 🎭 주요 UI 컴포넌트

### ServiceCard (About 섹션)
```javascript
<Tilt className="xs:w-[250px] w-full">
  <motion.div
    variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
    className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
  >
    <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
      <img src={icon} alt="title" className="w-16 h-16 object-contain" />
      <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
    </div>
  </motion.div>
</Tilt>
```

### ProjectCard (Works 섹션)
```javascript
<Tilt className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full">
  <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
    <div className="relative w-full h-[230px]">
      <img src={image} alt="name" className="w-full h-full object-cover rounded-2xl" />
      <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
        <div onClick={() => window.open(source_code_link, '_blank')} className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
          <img src={github} alt="github" className="w-1/2 h-1/2 object-contain" />
        </div>
      </div>
    </div>
    <div className="mt-5">
      <h3 className="text-white font-bold text-[24px]">{name}</h3>
      <p className="mt-2 text-secondary text-[14px]">{description}</p>
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <p key={tag.name} className={`text-[14px] ${tag.color}`}>
          #{tag.name}
        </p>
      ))}
    </div>
  </motion.div>
</Tilt>
```

---

## 🎨 로딩 인디케이터

```javascript
// Loader.jsx
const CanvasLoader = () => {
  return (
    <Html
      as="div"
      center
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <span className="canvas-loader"></span>
      <p style={{ fontSize: 14, color: '#F1F1F1', fontWeight: 800, marginTop: 40 }}>
        Loading...
      </p>
    </Html>
  );
};

// index.css - 애니메이션
.canvas-loader {
  font-size: 10px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  animation: mulShdSpin 1.1s infinite ease;
  transform: translateZ(0);
}

@keyframes mulShdSpin {
  0%, 100% { box-shadow: 0em -2.6em 0em 0em #ffffff, ... }
  12.5% { box-shadow: 0em -2.6em 0em 0em rgba(255,255,255, 0.2), ... }
  /* ... */
}
```

---

## 🔍 검색 및 탐색 가이드

### AI가 특정 기능을 찾을 때 참조:

| 찾고자 하는 것 | 파일 위치 |
|---------------|----------|
| 페이지 레이아웃 | `src/App.jsx` |
| 네비게이션 로직 | `src/components/Navbar.jsx` |
| 히어로 섹션 | `src/components/Hero.jsx` |
| 3D 데스크탑 모델 | `src/components/canvas/Computers.jsx` |
| 3D 지구 모델 | `src/components/canvas/Earth.jsx` |
| 기술 아이콘 3D | `src/components/canvas/Ball.jsx` |
| 배경 별 | `src/components/canvas/Stars.jsx` |
| 이메일 폼 | `src/components/Contact.jsx` |
| 경력 타임라인 | `src/components/Experience.jsx` |
| 프로젝트 쇼케이스 | `src/components/Works.jsx` |
| 애니메이션 설정 | `src/utils/motion.js` |
| HOC 래퍼 | `src/hoc/SectionWrapper.jsx` |
| 모든 데이터 | `src/constants/index.js` |
| 스타일 유틸리티 | `src/styles.js` |
| 글로벌 CSS | `src/index.css` |
| Tailwind 설정 | `tailwind.config.js` |
| Vite 설정 | `vite.config.js` |

---

## 📚 추가 학습 자료

### Three.js 핵심 개념
- **Mesh**: 3D 객체 (geometry + material)
- **Geometry**: 형태 (icosahedron, sphere, etc.)
- **Material**: 표면 속성 (color, texture, etc.)
- **Light**: 조명 (ambient, point, spot, directional, hemisphere)
- **Camera**: 시점 (perspective, orthographic)
- **Canvas**: 렌더링 영역

### React Three Fiber 헬퍼
- **useFrame**: 매 프레임 실행 (애니메이션)
- **useGLTF**: 3D 모델 로드
- **useTexture**: 텍스처 로드
- **OrbitControls**: 마우스 컨트롤
- **Float**: 부유 애니메이션
- **Decal**: 표면 데칼
- **Html**: HTML 요소 삽입
- **Preload**: 자산 미리 로드

---

## 🎯 커스터마이징 가이드

### 콘텐츠 업데이트
1. `src/constants/index.js` 수정
2. `src/assets/` 에 이미지 추가
3. 컴포넌트는 자동으로 새 데이터 반영

### 3D 모델 교체
1. GLTF 파일을 `public/` 에 배치
2. 컴포넌트에서 경로 수정: `useGLTF('./your-model/scene.gltf')`
3. scale, position, rotation 조정

### 색상 테마 변경
1. `tailwind.config.js` → colors 수정
2. `src/index.css` → gradient 클래스 수정

### 애니메이션 조정
1. `src/utils/motion.js` → variant 파라미터 수정
2. 각 컴포넌트에서 delay, duration 조정

---

## ✅ 체크리스트: AI가 확인해야 할 사항

- [ ] React 18 + JSX 문법 이해
- [ ] Three.js 기본 개념 (mesh, geometry, material, light)
- [ ] React Three Fiber 훅 사용법 (useGLTF, useFrame)
- [ ] Framer Motion 애니메이션 variants
- [ ] Tailwind CSS 유틸리티 클래스
- [ ] 반응형 디자인 (window.matchMedia)
- [ ] GLTF 3D 모델 로딩
- [ ] EmailJS 통합
- [ ] Vite 빌드 시스템
- [ ] SPA 라우팅 (해시 기반)

---

## 🎬 마무리

이 문서는 AI가 프로젝트 구조를 빠르게 이해하고 효과적으로 작업할 수 있도록 설계되었습니다.

**핵심 포인트**:
- 모든 데이터는 `constants/index.js`에 중앙화
- 3D 컴포넌트는 `components/canvas/`에 분리
- 애니메이션은 `utils/motion.js`와 `SectionWrapper` HOC로 통일
- 반응형은 Tailwind + window.matchMedia로 처리
- 성능 최적화는 frameloop="demand"로 해결

**다음 단계**:
1. `npm install` 실행
2. `npm run dev`로 로컬 서버 시작
3. `src/constants/index.js`부터 커스터마이징 시작

---

**문서 버전**: 1.0
**최종 업데이트**: 2025-10-31
**작성자**: Claude Code AI Assistant

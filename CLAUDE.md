# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a 3D portfolio website built with React, Three.js, and React Three Fiber featuring interactive 3D graphics, smooth animations, and a modern single-page application architecture. The site is fully Korean-localized (한국어).

## Tech Stack

### Core Technologies
- React 18.2
- React Three Fiber 8.13.4
- Three.js 0.154
- Vite 4.3.9
- TailwindCSS 3.3.2

### Key Libraries
- Framer Motion 10.12.17 (scroll animations)
- React Router DOM 6.14 (navigation)
- Headless UI 2.2.9 (modal system)
- React Tilt 1.0.2 (card effects)
- React Vertical Timeline 3.6.0
- Maath 0.7.0 (3D math)
- React Three Drei 9.77.7

## Development Commands

```bash
npm run dev      # Vite dev server (port 3000, may need manual port change if occupied)
npm run build    # Production build to dist/
npm run lint     # ESLint check
npm run preview  # Preview production build
```

## Architecture & Data Flow

### Page Structure (App.jsx)
Single-page app with vertical scrolling sections:
```
BrowserRouter
  └── App
      ├── Navbar (fixed navigation)
      ├── SectionNav (right-side section navigation)
      ├── Hero + ComputersCanvas (3D desktop model)
      ├── Works (projects with modal system)
      ├── About (service cards)
      ├── Experience (vertical timeline)
      ├── Snapshot (3 image cards + description)
      └── StarsCanvas (animated background)
```

**Section Order**: Hero → Works → About → Experience → Snapshot
**Removed**: Contact, Feedbacks, Tech (Ball components)

### Data Management Pattern

**All content is static** - no API calls. Edit `src/constants/index.js`:

```javascript
export const projects = [
  {
    // Card display
    name: '프로젝트 이름',
    slug: 'url-slug',              // For deep linking
    description: '카드 설명',
    image: imageAsset,
    tags: [{ name, color }],       // No longer displayed on cards

    // KPI badges (displayed on cards)
    solution_kpi: '팀워크',          // Green badge
    result_kpi: '성과 지표',         // Yellow badge
    experience_kpi: '성장 포인트',   // Purple badge

    // Media gallery (1 video + 4 images)
    media: [
      {
        type: 'video',
        youtubeId: 'YouTube-ID',
        title: '영상 제목',
      },
      {
        type: 'image',
        src: imageAsset,
        title: '이미지 제목 (좌측 상단 오버레이)',
      },
      // ... 4 more images
    ],

    // Modal content
    youtubeId: 'YouTube-ID',       // Fallback for backward compatibility
    information: { organization, teamSize, duration, engine },
    role_brief: '역할',
    problem_brief: '문제',
    solution_brief: '해결방안 (text in "quotes" will be bolded)',
    result_brief: '결과 (text in "quotes" will be bolded)',
    experience: '배운 점 (text in "quotes" will be bolded)',
    proof_links: [{ label, url }]
  }
]
```

Other data arrays: `navLinks`, `services`, `technologies`, `experiences`

### Services Data (About Section)
The About section displays skill cards with logos and descriptions:

```javascript
const services = [
  {
    id: 'documentation',  // Required for modal linking
    title: '문서화 능력',
    description: '기획 의도를 시각화하여 전달할 수 있는 역량',
    icons: [excel_logo, ppt_logo],  // Multiple logos supported
  },
  {
    id: 'engine-knowledge',
    title: '개발 엔진 지식',
    description: '실현가능한 기획과 개발자와의 소통을 위한 개발 기초 지식',
    icons: [unreal_logo],
  },
  {
    id: 'ai-prototyping',
    title: 'AI 프로토타이핑',
    description: '신속한 플레이 경험 검증을 위한 AI활용역량',
    icons: [tripo_logo, claudecode_logo, mcp_logo],
    animated: true,  // Enables animated logo carousel
  },
]

// Skill details for modal (separate from services)
const skillDetails = [
  {
    id: 'documentation',  // Must match services[].id
    title: '문서화 역량',
    images: [
      {
        src: souldive_doc,
        title: 'SoulDive 발표 문서',  // Short title displayed above image
        intent: '기획을 위해 본질을 파악하는 사고와 유저 경험 흐름을 생각하는 과정을 보여드리기 위함입니다.'  // Accordion content
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
      { name: '강병민_SoulDive_발표문서.pdf', url: '/portfolios/강병민__SoulDive_발표문서.pdf' },
      { name: '강병민_Ashuel_퀘스트 기획서.xlsx', url: '/portfolios/강병민_Ashuel_퀘스트 기획서.xlsx' }
    ]
  },
  // ... more skills
]
```

**Key Features**:
- **Multiple icons per card**: Array of logo images
- **Animated logos**: When `animated: true`, logos cycle with slide animation (2.5s interval)
- **Divider line**: Thin horizontal line separates icons from text
- **No line wrapping**: Text uses `whitespace-nowrap` for single-line display
- **Logo files**: Located in `src/assets/logos/`
- **Click to open modal**: Each card opens a detailed modal with images and downloadable files

### Role-Based Project Data (Advanced)
Some projects support role-based filtering where users can toggle between different roles (e.g., PM vs Quest) to see role-specific content:

```javascript
{
  // Standard fields (shared)
  name: 'Project Name',
  role_brief: 'Combined role description',

  // PM role data
  problem_pm: 'PM-specific problem',
  solution_pm: 'PM-specific solution',
  solution_kpi_pm: 'PM KPI badge',
  result_pm: 'PM-specific result',
  result_kpi_pm: 'PM result KPI',
  experience_pm: 'PM-specific experience',
  experience_kpi_pm: 'PM experience KPI',

  // Quest role data
  problem_quest: 'Quest-specific problem',
  solution_quest: 'Quest-specific solution',
  solution_kpi_quest: 'Quest KPI badge',
  result_quest: 'Quest-specific result',
  result_kpi_quest: 'Quest result KPI',
  experience_quest: 'Quest-specific experience',
  experience_kpi_quest: 'Quest experience KPI',
}
```

**How it works**:
- ProjectModal.jsx detects if `problem_pm` and `problem_quest` fields exist
- If found, displays PM/Quest toggle buttons at top of right column
- User can switch between roles to view different content for 공략, 보상, 경험치 sections
- Default selection: PM (when modal opens)
- Projects without role data continue using standard `problem_brief`, `solution_brief`, etc.

## Skill Modal System (About Section)

### Overview
Each skill card in the About section opens a modal with portfolio images and downloadable files.

**Components**:
- `SkillModal.jsx` - Main modal component
- `About.jsx` - Manages modal state and click handlers

### Modal Layout
```
┌────────────────────────────────────────────────────┐
│                                      닫기 ×         │
├────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │ Title 1  │  │ Title 2  │  │ Title 3  │         │
│  │ Image 1  │  │ Image 2  │  │ Image 3  │         │
│  │ [제출의도▼]│  │ [제출의도▼]│  │ [제출의도▼]│         │
│  └──────────┘  └──────────┘  └──────────┘         │
│                                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     │
│  📄 포트폴리오 다운로드                            │
│  ┌──────────────────────────────────────────┐     │
│  │ 📄 파일명.pdf                        →   │     │
│  └──────────────────────────────────────────┘     │
└────────────────────────────────────────────────────┘
```

**Modal Features**:
- **Size**: `max-w-[1920px]` (nearly full-width on large screens)
- **Padding**: Minimal (`p-3`) to maximize content area
- **Header**: Close button only (no title displayed)
- **Images**: 3 images in horizontal grid (`grid-cols-1 md:grid-cols-3`)
  - Each image has a title displayed above it in a colored box
  - **Image aspect**: `aspect-video` (16:9) for all images
  - **Accordion**: Each image has collapsible "제출 의도" section below
  - **Hover tooltip**: Mouse-following tooltip displays image description (single-line, can overflow screen)
  - **Hover highlight**: When hovering over download files, corresponding image shows blue ring border (`ring-4 ring-blue-500`)
- **Download buttons**: File type icons (📄 PDF, 📊 Excel/PPT) + filename
- **Close button**: "닫기 ×" text + icon for visibility

**Interactive Features**:
1. **Accordion System**: Click "제출 의도" header to expand/collapse intent text
   - Animated arrow rotation (0° → 180°)
   - Smooth height transition with Framer Motion
2. **Image Tooltips**: Hover over images to see description
   - Tooltip follows mouse cursor with 10px offset
   - Single-line text with `whitespace-nowrap` (can overflow screen)
   - Tooltip has black background (90% opacity), white text (text-xs)
3. **File-to-Image Mapping**: Hover over download buttons highlights corresponding image
   - Maps file names to images (SoulDive→0, Ashuel→1, 던전피드백→2)
   - Blue ring appears around matched image card

### URL Synchronization
```javascript
// Click skill card → Update URL
handleCardClick(service) → setSearchParams({ skill: service.id })
  → URL: /?skill=documentation

// Direct URL → Auto-open modal
useEffect() reads searchParams.get('skill')
  → Finds skillDetail by id
  → Opens modal automatically

// Close modal → Clear URL
handleCloseModal() → setSearchParams({})
```

### Download Mechanism
Files stored in `public/portfolios/` are served as static assets:

```javascript
const handleDownload = (fileUrl, fileName) => {
  const link = document.createElement('a');
  link.href = fileUrl;  // e.g., '/portfolios/report.pdf'
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
```

**Important**:
- Files in `public/portfolios/` are accessible at `/portfolios/[filename]`
- No CORS issues (same-origin)
- Supports all file types: PDF, XLSX, PPTX, etc.
- Browser `download` attribute forces download instead of opening

### Adding New Skill Modals
1. Add skill images to `src/assets/skill-images/`
2. Import images in `src/assets/index.js`
3. Add portfolio files to `public/portfolios/`
4. Update `skillDetails` array in `src/constants/index.js`:
   ```javascript
   {
     id: 'new-skill',  // Must match services[].id
     title: 'New Skill',
     images: [
       {
         src: image1,
         title: 'Document Title 1',  // Displayed above image
         intent: 'Submission intent explanation...'  // Accordion content
       },
       {
         src: image2,
         title: 'Document Title 2',
         intent: 'Why this document was included...'
       },
       {
         src: image3,
         title: 'Document Title 3',
         intent: 'Purpose of this portfolio piece...'
       }
     ],
     portfolioFiles: [
       { name: 'File.pdf', url: '/portfolios/File.pdf' }
     ]
   }
   ```
5. Update `getImageDescription()` function in `SkillModal.jsx` if adding tooltip descriptions:
   ```javascript
   const getImageDescription = (index) => {
     const descriptions = [
       '명상x게임의 방향성과 유저 시나리오 보여주는 발표용 제안서',
       'VR 오픈월드 MBTI 특성을 반영한 퀘스트의 시스템 전반을 설계한 기획서',
       '졸업작품 프로젝트의 기획 방향성을 보여주는 발표용 문서'
     ];
     return descriptions[index] || '';
   };
   ```

## Project Modal System (Works Section)

### Deep Linking Implementation
Works.jsx manages modal state with URL synchronization:

```javascript
// Card click → Update URL
handleCardClick(project)
  → setSearchParams({ project: project.slug })
  → URL: /?project=meditation-platformer

// Direct URL → Auto-open modal
useEffect() reads searchParams.get('project')
  → Finds project by slug
  → Opens modal automatically

// Modal close → Clear URL
handleCloseModal() → setSearchParams({})
```

**Files**:
- `Works.jsx`: State management, click handlers, URL sync
- `ProjectModal.jsx`: Headless UI Dialog with Transition animations
- `MediaGallery.jsx`: Unified gallery component
- `MediaViewer.jsx`: Displays video or image
- `ThumbnailCarousel.jsx`: Horizontal scrolling thumbnails
- `YouTubeEmbed.jsx`: YouTube iframe with error handling

### Modal Layout (Desktop)
```
┌────────────────────────┬─────────────────────┐
│ Left (60%)             │ Right (40%)         │
│                        │                     │
│ • 담당 역할 | 직면한 문제│ • [PM] [Quest]      │
│   (행 방향 나란히)      │   (no divider)      │
│                        │                     │
│ • 미디어 갤러리        │ • 공략              │
│   - 메인 뷰어          │   (Green KPI)       │
│   - 썸네일 캐러셀      │   ─────────────     │
│                        │ • 보상              │
│ • 제작 정보            │   (Yellow KPI)      │
│                        │   ─────────────     │
│                        │ • 경험치 (EXP)      │
│                        │   (Purple KPI)      │
└────────────────────────┴─────────────────────┘
```

**Key Layout Features**:
- **Major Projects** (first 3 projects: SoulDive, Ashuel, 던전피드백):
  - Modal width: `max-w-[1600px]` (vs `max-w-6xl` for others)
  - Modal padding: `p-8` (vs `p-6` for others)
  - Left-right gap: `gap-8` (vs `gap-6` for others)
  - Left column: `space-y-5` (20px gaps)
  - Font sizes: Titles `text-2xl`, body `text-lg` (vs `text-lg`/`text-sm`)
  - Icons: `w-7 h-7` (vs `w-6 h-6`)
  - Role/Problem gap: `gap-6` (vs `gap-4`)
  - Media gallery images: `aspect-video` (16:9 ratio for all media)
- **Section Dividers** (Major Projects):
  - 공략 section: `mt-14 pb-10 border-b` (divider below)
  - 보상 section: `pt-7 pb-10 border-b` (dividers above and below)
  - 경험치 section: `pt-7` (no divider)
  - Dividers positioned exactly center between sections
- Role toggle buttons (if role data exists): Appear at top of right column
  - **No bottom divider** below role toggle buttons
  - PM button: Blue (bg-blue-600) with shadow when active
  - Quest button: Purple (bg-purple-600) with shadow when active
  - 개발팀/아트팀 buttons for dev/art roles
  - Switches all content (직면한 문제, 공략, 보상, 경험치) based on selection

### Text Formatting in Modal
ProjectModal.jsx includes `formatTextWithBold()` function:
- Text wrapped in double quotes (`"text"`) is automatically bolded
- Applied to: `solution_brief`, `result_brief`, `experience`
- Example: `"명상의 본질"` → **"명상의 본질"**

### Adjusting Modal Spacing & Sizes
For fine-tuning the major project modals (`ProjectModal.jsx`):

**Line 137** - Gap between 담당 역할 and 직면한 문제:
```javascript
<div className={`flex flex-col sm:flex-row ${isMajorProject ? 'gap-6' : 'gap-4'}`}>
```

**Line 295** - 공략 section spacing:
```javascript
<div className={`space-y-2 ${isMajorProject ? 'mt-14 pb-10 border-b ...' : 'mt-10 pb-5 border-b ...'}`}>
```

**Line 365** - 보상 section spacing:
```javascript
<div className={`space-y-2 ${isMajorProject ? 'pt-7 pb-10 border-b ...' : 'pt-5 pb-5 border-b ...'}`}>
```

**Line 453** - 경험치 section spacing:
```javascript
<div className={`space-y-2 ${isMajorProject ? 'pt-7' : 'pt-5'}`}>
```

**Font size reference**:
- Titles: `text-2xl` (24px), `text-xl` (20px), `text-lg` (18px)
- Body: `text-lg` (18px), `text-base` (16px), `text-sm` (14px)
- Icons: `w-7 h-7` (28px), `w-6 h-6` (24px)

### Media Gallery System

**Components Architecture**:
```
MediaGallery (src/components/MediaGallery.jsx)
├── MediaViewer (src/components/MediaViewer.jsx)
│   ├── YouTubeEmbed (for videos)
│   └── Image with caption overlay (for images)
└── ThumbnailCarousel (src/components/ThumbnailCarousel.jsx)
    ├── Thumbnail buttons (140x80px)
    ├── Scroll arrows (if 5+ items)
    └── Active indicator (blue ring)
```

**Media Structure**: 1 video + 4 images (총 5개)
- First item: YouTube video (no title overlay)
- Next 4 items: Images with caption overlay (top-left corner)

**Image Caption Overlay**:
- Position: `absolute top-0 left-0`
- Style: Black bg (70% opacity), white 12px text, rounded bottom-right corner
- Only visible on images (not videos)

**Thumbnail Features**:
- YouTube thumbnails: Auto-fetched from `img.youtube.com`
- Active thumbnail: Blue ring (`ring-4 ring-blue-500`)
- Click to switch main viewer
- Horizontal scroll with arrows (if 5+ items)

### KPI Badges
Displayed on both project cards and modal:
- **solution_kpi**: Green badge (bg-green-900)
- **result_kpi**: Yellow badge (bg-yellow-900)
- **experience_kpi**: Purple badge (bg-purple-900)
- On cards: Replaces old tag system, displayed below description
- In modal: Appears below corresponding text sections

### Project Card UI
**Recent Updates (Session 3)**:
- **GitHub icon removed**: Right-top corner icon deleted entirely
- **Hover text updated**: "클릭하여 데모 보기" → "클릭하여 상세 보기"
- **Tags display**: Hidden on cards (KPI badges shown instead)
- **Click behavior**: Opens modal with deep link support

## 3D Canvas Components

### Common Pattern
All canvas components follow this structure:
```jsx
<Canvas
  frameloop="demand"                    // Only render on changes (performance)
  gl={{ preserveDrawingBuffer: true }} // Screenshot support
>
  <Suspense fallback={<CanvasLoader />}>
    {/* 3D content */}
    <Preload all />                     // Asset preloading
  </Suspense>
</Canvas>
```

### Computers.jsx (Hero)
- GLTF model: `/public/desktop_pc/scene.gltf`
- Responsive: Different scale/position for mobile
- Lighting: Hemisphere + Point + Spot
- Uses `window.matchMedia` for mobile detection

### Stars.jsx (Background)
- 1000 random points in sphere (Maath) - reduced from 5000 for performance
- Continuous rotation via `useFrame`
- Negative z-index (renders behind content)
- Adjust particle count in line 9: `random.inSphere(new Float32Array(1000), { radius: 1.2 })`

## HOC Pattern - SectionWrapper

Wraps sections to add:
- Framer Motion `staggerContainer` animation
- `whileInView` scroll trigger (fires when 25% visible, once only)
- Hash anchor `<span id={idName}>` for navigation
- Consistent padding

Usage: `export default SectionWrapper(Component, 'anchor-id')`

## Animation System

### Framer Motion Variants (utils/motion.js)
Factory functions that return animation configs:

- `textVariant(delay)`: Title slide-down + fade
- `fadeIn(direction, type, delay, duration)`: Directional slide + fade
- `zoomIn(delay, duration)`: Scale + fade
- `slideIn(direction, type, delay, duration)`: Full slide
- `staggerContainer(staggerChildren, delayChildren)`: Parent container

### Scroll Animation Flow
```
Section scrolls into viewport (25% visible)
  ↓
whileInView="show" triggered on <motion.section>
  ↓
staggerContainer animates children sequentially
  ↓
Each child element fades/slides with delay
```

## Navigation System

### Hash-Based Scrolling
- Navbar uses `<a href="#about">` links
- SectionWrapper creates `<span id="about">` anchors
- Smooth scroll behavior via CSS

### SectionNav Component (Right-Side Navigation)
Fixed navigation UI on the right side of the screen (desktop only):

**Location**: `src/components/SectionNav.jsx`

**Features**:
- Fixed position: `right-8 top-1/2 -translate-y-1/2`
- Hidden on mobile: `hidden lg:block`
- Sections tracked: Works, About, Experience, Snapshot

**Active Section Detection**:
- Uses **Intersection Observer API** for accurate section tracking
- Configuration:
  - `rootMargin: '-40% 0px -40% 0px'` - Detects when section is in viewport center
  - `threshold: [0, 0.1, ..., 1.0]` - 11 detection points for smooth transitions
- Highlights section with highest `intersectionRatio` when multiple sections are visible
- Works correctly in both scroll directions (up/down)

**Click Behavior**:
- Immediately updates active state on click
- Smooth scrolls to target section: `scrollIntoView({ behavior: 'smooth', block: 'start' })`
- Intersection Observer continues tracking after scroll completes

**Styling**:
- Active: `text-white font-bold text-[16px] scale-110`
- Inactive: `text-secondary font-semibold text-[14px] hover:text-white`
- Transitions: `transition-all duration-300`

### Active Sections
- `navLinks` in constants: `[{ id: 'about', title: '소개' }, ...]`
- Current sections: About → 'about', Experience → 'work'
- Snapshot section uses id: 'snapshot'

### URL Structure
- Hash for sections: `#about`, `#work`
- Query params for modals: `?project=slug`
- Both work simultaneously

## Styling System

### TailwindCSS Custom Config
**Colors** (tailwind.config.js):
- `primary`: "#050816" (black background)
- `secondary`: "#aaa6c3" (purple-gray text)
- `tertiary`: "#151030" (card backgrounds)

**Typography** (styles.js):
```javascript
heroHeadText: "text-[40px] sm:text-[80px]"
sectionHeadText: "text-[30px] sm:text-[60px]"
```

**Font**: Pretendard (Korean-optimized), loaded from CDN via jsdelivr

### Global Styles (index.css)
- Text gradients: `.blue-text-gradient`, `.green-text-gradient`, etc.
- Background gradients: `.violet-gradient`, `.green-pink-gradient`
- Custom scrollbar styling
- Korean typography tuning (letter-spacing: -0.01em)

## Korean Localization

**Font**: Pretendard (9 weights: 100-900)
- Loaded via `@font-face` from CDN
- `font-display: swap` for fast display

**Typography**:
- Tighter letter-spacing for Korean readability
- Adjusted line-height (1.6 body, 1.2 headings)

**UI Text**: All Korean
- Sections: "소개", "경험"
- Works section: "RESOLUTION", "주요 프로젝트"
- Snapshot section: "NOW I DO", "앞으로의 포부"
- Modal: "담당 역할", "직면한 문제", "공략", "보상", "경험치 (EXP)"

## Experience Section (Vertical Timeline)

Displays educational journey with hierarchical structure of institutions and their associated projects.

**Component**: `src/components/Experience.jsx`

**Data Structure**: 3 educational institutions + 8 projects (11 total items)
- Each institution (대분류) groups related projects (소분류)
- Located in `src/constants/index.js` (lines 94-159)

### Hierarchical Timeline Architecture

**Institution (대분류)**:
```javascript
{
  type: 'institution',
  title: '뉴콘텐츠아카데미',
  description: '게임 기획 전문가 과정을 수료하며 실무 역량을 강화했습니다.',
  date: '2024. 08 ~ 현재',
  icon: logo,  // Institution logo
  iconBg: '#383E56',  // Dark gray-purple
}
```

**Project (소분류)**:
```javascript
{
  type: 'project',
  title: '소울다이브',
  description: '명상 기반 VR 오픈월드 게임',
  date: '2024. 09 - 2024. 12',
  images: [image1, image2],  // 2 images, 16:9 aspect ratio
  icon: logo,  // Blank circle (icon not displayed)
  iconBg: '#E6DEDD',  // Light beige
}
```

### Visual Hierarchy

**Institution Cards**:
- Standard icon size (60%) displayed in timeline circle
- Dark gray-purple background (#383E56)
- Date displayed **outside card** at top-left (`absolute -top-8 left-0`)
- Shows institution name + one-line description
- No timeline date label (only projects show dates on timeline)

**Project Cards**:
- Smaller icon size (42%), no icon displayed (blank circle)
- Light beige background (#E6DEDD)
- Date shown on timeline (left side)
- Content: Title + description + 2 images (16:9 grid)
- Images clickable to open ImageModal for full-size view

**Group Boxes**:
- Each institution and its projects wrapped in gradient background box
- Background: `bg-gradient-to-br from-[#1a1a2e]/20 to-[#16162a]/20`
- Border: `border-[#383E56]/30`
- Creates visual grouping showing which projects belong to which institution

### Components

**ImageModal**: Full-screen overlay for enlarged image viewing
- Black background (80% opacity)
- Click outside or × button to close
- Max size: `max-w-7xl max-h-[90vh]`

**ExperienceCard**: Renders individual timeline items
- Conditional rendering based on `experience.type`
- Institutions: Title + description (no images)
- Projects: Title + description + 2-image grid with click-to-enlarge

**ExperienceGroup**: Groups institution with its projects
- Wraps related items in background box
- Handles padding and spacing for visual hierarchy

**Data Grouping Logic**: Main `Experience` component transforms flat array into grouped structure:
```javascript
experienceGroups = [
  { institution: {...}, projects: [{...}, {...}] },
  { institution: {...}, projects: [{...}, {...}] },
]
```

### Layout Details

- **Institution date positioning**: `absolute -top-11 left-2` (outside card, top-left)
- **Institution icon size**: 90% with `overflow-hidden rounded-full` to crop within circle
- **Title animations**: Section title uses plain `<div>` instead of `motion.div` for immediate display
- **Project images**: `grid-cols-2 gap-3`, `aspect-video` (16:9)
- **Group padding**: `px-4 md:px-8 py-4 md:py-8`
- **Group spacing**: `mb-16` between groups

### Adding New Items

1. Add institution logo/images to `src/assets/`
2. Import in `src/assets/index.js`
3. Add data to `experiences` array in `src/constants/index.js`:
   - Institution must come before its projects
   - Projects automatically grouped under preceding institution
4. Use 2 images per project (16:9 aspect ratio recommended)

## Snapshot Section

Final section for personal branding and aspirations:
- **Component**: `src/components/Snapshot.jsx`
- **Structure**: Title ("I AM" / "앞으로의 포부") → 3 images with captions → impactful description box
- **Data**: Hardcoded in component (snapshots array with imageSrc and caption)
- **Layout**:
  - **Images**: 350px × 350px cards (1:1 ratio) with image captions
  - **Captions**: Positioned at bottom-right corner inside each image frame
    - Black background (70% opacity)
    - White text (12px)
    - Rounded top-left corner (rounded-tl-lg)
  - **Description Box**: Full-width gradient box matching 3-image span (max-w-[1150px])
    - Purple/blue gradient background with pulse animation
    - Border and shadow effects
    - Responsive text sizing: 18px → 24px → 28px
    - Line break on mobile for better readability
  - **Responsive**: Images wrap on mobile, description stays centered
- **Images Used**:
  - `snapshot1` (마지막섹션사진1.jpg): "뉴콘텐츠아카데미 | 1학기 팀프로젝트 발표 사진"
  - `snapshot2` (마지막섹션사진2.jpg): "뉴콘텐츠아카데미 | 내부 인사이트 공유 발표 사진"
  - `snapshot3` (마지막섹션사진3.png): "뉴콘텐츠아카데미 | 2학기 팀프로젝트 기획 발표 사진"
- **Current Text**: "지속적인 도전을 통해 성장한 역량을 바탕으로 회사에 기여하겠습니다 읽어주셔서 감사합니다"
- **Styling**: Uses SectionWrapper HOC, Framer Motion fadeIn/textVariant animations

## Performance Optimization

1. **Canvas Rendering**: `frameloop="demand"` - only render on interaction
2. **Code Splitting**: Vite automatic per-route chunks
3. **Lazy Loading**: Suspense on 3D components
4. **Asset Preloading**: `<Preload all />` in Canvas
5. **Geometry Optimization**: Simple shapes (points for stars)
6. **Particle Count**: Stars.jsx uses 1000 particles (reduced from 5000) for better performance

## Key Files to Edit

### Content Updates
- **Projects**: `src/constants/index.js` (lines 162+)
  - Project data with media gallery
  - Modal content (role, problem, solution, result, experience)
  - KPI badges
  - First 3 projects are "major projects" with enhanced modal styling
- **Technologies**: `src/constants/index.js` (lines 55-92)
- **Experiences**: `src/constants/index.js` (lines 94-159)

### Styling
- **Colors**: `tailwind.config.js`
- **Typography**: `src/styles.js`
- **Gradients**: `src/index.css`

### Components
- **Project Modal System**:
  - `src/components/ProjectModal.jsx` - Project details modal
  - `src/components/MediaGallery.jsx` - Gallery container
  - `src/components/MediaViewer.jsx` - Video/image viewer
  - `src/components/ThumbnailCarousel.jsx` - Thumbnail navigation
  - `src/components/YouTubeEmbed.jsx` - YouTube iframe handler
- **Skill Modal System**:
  - `src/components/SkillModal.jsx` - Skill portfolio modal (max-w-[1920px])
  - Displays 3 images horizontally + downloadable files
  - Deep linking support via `?skill=id`
- **Project Cards**: `src/components/Works.jsx`
- **About Section**: `src/components/About.jsx`
  - ServiceCard component handles multiple icons and animated logos
  - Click handler opens SkillModal
  - URL synchronization for deep linking
- **Animated Logos**: `src/components/AnimatedLogos.jsx`
  - Auto-cycles through logo array every 2.5 seconds
  - Slide animation (right to left with fade)
  - Container size: `w-32 h-32`, icon size: `w-24 h-24`
- **Experience Section**: `src/components/Experience.jsx`
  - ImageModal for enlarged image viewing
  - ExperienceCard for individual timeline items (institution/project)
  - ExperienceGroup for visual grouping with background boxes
  - Hierarchical data grouping (3 institutions + 8 projects)
- **Snapshot Section**: `src/components/Snapshot.jsx`
- **Navigation**:
  - `src/components/Navbar.jsx` - Top navigation bar
  - `src/components/SectionNav.jsx` - Right-side section navigation

### 3D Models
- Place GLTF files in `public/`
- Update `useGLTF('/path/to/model.gltf')`
- Adjust `scale`, `position`, `rotation` props

## Assets Management

### Adding Images
1. Place image in `src/assets/` (or `src/assets/logos/` for skill icons)
2. Import in `src/assets/index.js`:
   ```javascript
   import newImage from './newImage.png';
   // For logos
   import excel_logo from './logos/Excel_logo.png';
   export { ..., newImage, excel_logo };
   ```
3. Import in `src/constants/index.js`:
   ```javascript
   import { ..., newImage, excel_logo } from '../assets';
   ```
4. Use in data: `image: newImage` or `icons: [excel_logo, ppt_logo]`

**Logo Management**:
- Skill logos stored in: `src/assets/logos/`
- Copy source files from: `picture/logos/`
- Used in services array for About section cards

### Adding Media to Project Gallery
To add videos or images to a project's media gallery:

1. **For Videos**: Add YouTube video ID
   ```javascript
   {
     type: 'video',
     youtubeId: 'dQw4w9WgXcQ',
     title: '게임플레이 영상',
   }
   ```

2. **For Images**: Import image first, then add to media array
   ```javascript
   // In src/assets/index.js
   import screenshot1 from './project_screenshot1.png';
   export { screenshot1 };

   // In src/constants/index.js project data
   {
     type: 'image',
     src: screenshot1,
     title: '인게임 스크린샷', // Appears in top-left overlay
   }
   ```

3. **Recommended Structure**: 1 video (first) + 4 images
   - Total: 5 items for optimal display
   - First item should be main video
   - Remaining items are screenshots

## Common Patterns

### Barrel Exports
Every directory has `index.js` that re-exports components:
```javascript
import Component from './Component';
export { Component };
```
Enables: `import { Component } from './components'`

### Responsive Design
Mobile detection via JavaScript:
```javascript
const [isMobile, setIsMobile] = useState(false);
const mediaQuery = window.matchMedia('(max-width: 500px)');
setIsMobile(mediaQuery.matches);
```
Not just Tailwind classes - explicit state for logic changes.

### Click Event Handling
For Tilt components, wrap content in inner div:
```jsx
<Tilt>
  <div onClick={handleClick}>  {/* Not on Tilt itself */}
    {content}
  </div>
</Tilt>
```

## Troubleshooting

### Modal Not Opening
- Check console for "Card clicked!" and "ProjectCard clicked!"
- Verify `onClick` is on inner div, not Tilt component
- Ensure `useSearchParams` is available (inside BrowserRouter)

### 3D Models Not Loading
- Check GLTF path is correct (case-sensitive)
- Verify model is in `public/` directory
- Look for Three.js errors in console

### HMR Issues
- Restart dev server: `Ctrl+C` then `npm run dev`
- Clear Vite cache: Delete `node_modules/.vite`

## Port Configuration

The dev server is configured to use port 3000 by default in `vite.config.js`. If port 3000 is occupied:
- Manual change: Edit `vite.config.js` server.port value
- Vite will show an error and suggest using a different port
- You can override with: `npm run dev -- --port 3001`

## Git Repository

### GitHub Repository
- **URL**: https://github.com/LoKoon3/KangbyeongMin_Portfolio.git
- **Main Branch**: `main`

### Git Workflow
```bash
# Check status
git status

# Add changes
git add .
git add <specific-file>

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push
git push origin main
```

**Important Notes**:
- Repository was reinitialized to remove large file history (SoulDive_UnrealEngine_Package.zip: 4GB, 몽중저택.pptm: 1.5GB)
- Current `.git` folder size: ~67MB (clean history)
- Always ensure large files (>50MB) are not committed

## Deployment

### Vercel Deployment via GitHub
**Recommended Method**: Deploy via GitHub integration (not CLI)

1. **Connect GitHub Repository**:
   - Vercel Dashboard → Add New Project
   - Import from GitHub: `KangbyeongMin_Portfolio`
   - Project Name: `kangbyeongmin_portpolio` (note: intentional spelling)

2. **Build Configuration**:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment**:
   - No environment variables required
   - All assets are static

**Why GitHub Deployment**:
- Vercel CLI has 2GB upload limit
- GitHub integration clones repository without `.git` folder
- Automatic deployments on push to main branch

**Files in Deployment**:
- `public/portfolios/`: Portfolio PDFs, Excel files (accessible at `/portfolios/[filename]`)
- All download functionality works in production
- Total deployment size: ~60MB (excluding node_modules)

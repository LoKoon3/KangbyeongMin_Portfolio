import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'works', title: '주요 프로젝트' },
  { id: 'about', title: '주특기' },
  { id: 'work', title: '성장 여정' },
  { id: 'snapshot', title: '앞으로의 포부' },
];

const SectionNav = () => {
  const [activeSection, setActiveSection] = useState(null);

  // Intersection Observer를 사용한 섹션 감지
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // 화면 중앙 근처에 있을 때 감지
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // 더 세밀한 감지
    };

    const observerCallback = (entries) => {
      // 현재 교차 중인 모든 섹션 찾기
      const intersectingEntries = entries.filter((entry) => entry.isIntersecting);

      if (intersectingEntries.length > 0) {
        // 교차 비율이 가장 높은 섹션 찾기
        const mostVisible = intersectingEntries.reduce((prev, current) => {
          return current.intersectionRatio > prev.intersectionRatio ? current : prev;
        });

        setActiveSection(mostVisible.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 모든 섹션 관찰 시작
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      // 관찰 중단
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleClick = (id) => {
    // 클릭 시 즉시 하이라이트 변경
    setActiveSection(id);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:block z-10"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className={`text-right transition-all duration-300 ${
              activeSection === section.id
                ? 'text-white font-bold text-[16px] scale-110'
                : 'text-secondary font-semibold text-[14px] hover:text-white'
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

export default SectionNav;

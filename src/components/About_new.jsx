import React, { useState, useEffect } from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

import { styles } from '../styles';
import { services, skillDetails } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import AnimatedLogos from './AnimatedLogos';
import SkillModal from './SkillModal';

const ServiceCard = ({ index, title, description, icons, animated, onClick }) => {
  return (
    <Tilt className="flex-1 min-w-[280px] max-w-[360px]">
      <motion.div
        variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          onClick={onClick}
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-tertiary rounded-[20px] py-10 px-8 min-h-[360px] flex justify-center items-center flex-col cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          {/* 애니메이션 또는 정적 로고 표시 */}
          {animated ? (
            <AnimatedLogos icons={icons} />
          ) : (
            <div className="flex gap-6 items-center justify-center flex-wrap mb-8">
              {icons.map((icon, idx) => (
                <img
                  key={idx}
                  src={icon}
                  alt={`${title}-icon-${idx}`}
                  className="w-24 h-24 object-contain"
                />
              ))}
            </div>
          )}

          {/* 구분선 */}
          <div className="w-full h-[1px] bg-secondary opacity-30 mb-6"></div>

          <h3 className="text-white text-[22px] font-bold text-center mb-4 whitespace-nowrap">
            {title}
          </h3>

          {description && (
            <p className="text-secondary text-[14px] text-center leading-[22px] px-2 whitespace-nowrap">
              {description}
            </p>
          )}
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // URL에서 skill 파라미터 확인하여 모달 자동 열기
  useEffect(() => {
    const skillId = searchParams.get('skill');
    if (skillId) {
      const skill = skillDetails.find((s) => s.id === skillId);
      if (skill) {
        setSelectedSkill(skill);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);

  const handleCardClick = (service) => {
    const skill = skillDetails.find((s) => s.id === service.id);
    if (skill) {
      setSelectedSkill(skill);
      setIsModalOpen(true);
      setSearchParams({ skill: service.id });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSkill(null);
    setSearchParams({});
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>skill</p>
        <h2 className={styles.sectionHeadText}>주특기</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        다수의 프로젝트 경험으로 숲을 보는 시야와 시스템 기반 사고로 기획하는 강점을 바탕으로 실현가능한 문서 스킬과 언리얼엔진 기초 프로토타입 개발 경험을 통해 커뮤니케이션 언어를 늘렸습니다, 현재까지 습득한 역량에 다수의 AI를 활용한 워크플로우를 구축하여 업무 효율을 높이고 기획 의도를 빠르게 검증하는 기획자로 성장하였습니다
      </motion.p>

      <div className="mt-20 flex flex-wrap justify-center gap-10 lg:gap-12">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            index={index}
            {...service}
            onClick={() => handleCardClick(service)}
          />
        ))}
      </div>

      {/* 주특기 모달 */}
      <SkillModal
        skill={selectedSkill}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default SectionWrapper(About, 'about');

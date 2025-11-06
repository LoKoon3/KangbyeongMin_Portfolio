import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import ProjectModal from './ProjectModal';

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  solution_kpi,
  result_kpi,
  experience_kpi,
  fourth_kpi,
  date,
  onClick,
  slug,
}) => {
  const handleClick = (e) => {
    console.log('ProjectCard clicked!');
    if (onClick) {
      onClick(e);
    }
  };

  // 던전피드백 프로젝트는 object-contain 사용
  const isDungeonFeedback = slug === 'dungeon-feedback';
  const imageObjectFit = isDungeonFeedback ? 'object-contain' : 'object-cover';
  const bgClass = isDungeonFeedback ? 'bg-gray-900' : '';

  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full cursor-pointer group"
      >
        <div onClick={handleClick}>
        <div className={`relative w-full h-[230px] ${bgClass}`}>
          <img
            src={image}
            alt={name}
            className={`w-full h-full ${imageObjectFit} rounded-2xl`}
          />
          {/* Date badge - top left */}
          {date && (
            <div className="absolute top-3 left-3 bg-black bg-opacity-70 px-3 py-1 rounded-md">
              <p className="text-white text-xs font-medium">{date}</p>
            </div>
          )}
          {/* Hover overlay with microcopy */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl flex items-center justify-center">
            <p className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              클릭하여 상세 보기
            </p>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {solution_kpi && (
            <div className="inline-block px-3 py-1 bg-green-900 bg-opacity-50 rounded-full text-green-300 text-xs font-semibold">
              {solution_kpi}
            </div>
          )}
          {result_kpi && (
            <div className="inline-block px-3 py-1 bg-yellow-900 bg-opacity-50 rounded-full text-yellow-300 text-xs font-semibold">
              {result_kpi}
            </div>
          )}
          {experience_kpi && (
            <div className="inline-block px-3 py-1 bg-purple-900 bg-opacity-50 rounded-full text-purple-300 text-xs font-semibold">
              {experience_kpi}
            </div>
          )}
          {fourth_kpi && (
            <div className="inline-block px-3 py-1 bg-black bg-opacity-50 rounded-full text-gray-300 text-xs font-semibold">
              {fourth_kpi}
            </div>
          )}
        </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let searchParams, setSearchParams;
  try {
    [searchParams, setSearchParams] = useSearchParams();
  } catch (error) {
    console.warn('useSearchParams not available:', error);
  }

  // Deep linking: Open modal based on URL query parameter
  useEffect(() => {
    if (searchParams) {
      const projectSlug = searchParams.get('project');
      if (projectSlug) {
        const project = projects.find(p => p.slug === projectSlug);
        if (project) {
          setSelectedProject(project);
          setIsModalOpen(true);
        }
      }
    }
  }, [searchParams]);

  const handleCardClick = project => {
    console.log('Card clicked:', project.name);
    setSelectedProject(project);
    setIsModalOpen(true);
    // Update URL with project slug
    if (setSearchParams && project.slug) {
      try {
        setSearchParams({ project: project.slug });
      } catch (error) {
        console.warn('Could not update URL:', error);
      }
    }
  };

  const handleCloseModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
    // Remove project query parameter from URL
    if (setSearchParams) {
      try {
        setSearchParams({});
      } catch (error) {
        console.warn('Could not clear URL:', error);
      }
    }
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>RESOLUTION </p>
        <h2 className={styles.sectionHeadText}>주요 프로젝트</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
         프로젝트를 진행하는 과정에서 발생하는 문제들을 팀원과 함께 마주하며 고민하고 해결해 나아갔습니다.
ㅤㅤㅤㅤㅤ나무보다는 숲을 보는 시야와 서로 다른 팀원의 사용하는 언어를 이해하고자 하는 커뮤니케이션 열정을 통해ㅤㅤㅤㅤ함께 일하고 싶은 기획자, 신뢰하는 할 수 있는 기획자라는 이야기를 들으며 단단한 팀웍을 만드는 경험을 하였습니다.</motion.p>
      </div>

      <div className="mt-20 mb-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project}
            onClick={() => handleCardClick(project)}
          />
        ))}
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  );
};

export default SectionWrapper(Works, 'works');

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import { useState } from 'react';

import 'react-vertical-timeline-component/style.min.css';

import { styles } from '../styles';
import { experiences } from '../constants';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';

// 이미지 확대 모달 컴포넌트
const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={onClose}
    >
      <div className="relative max-w-7xl max-h-[90vh] p-4">
        <img
          src={image}
          alt="Enlarged view"
          className="max-w-full max-h-full object-contain rounded-lg"
        />
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-4xl font-bold hover:text-gray-300"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const ExperienceCard = ({ experience, isFirstInGroup, isLastInGroup }) => {
  const isInstitution = experience.type === 'institution';
  const isProject = experience.type === 'project';
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <VerticalTimelineElement
        contentStyle={{
          background: '#1d1836',
          color: '#fff',
        }}
        contentArrowStyle={{ borderRight: '7px solid #232631' }}
        date={isProject ? experience.date : ''} // 소분류만 타임라인에 날짜 표시
        iconStyle={{ background: experience.iconBg }}
        icon={
          <div className="flex justify-center items-center w-full h-full overflow-hidden rounded-full">
            {/* 대분류만 아이콘 표시, 소분류는 빈 원 */}
            {isInstitution && (
              <img
                src={experience.icon}
                alt={experience.title}
                className="w-[90%] h-[90%] object-contain"
              />
            )}
          </div>
        }
      >
        {/* Institution 카드 - 기관명 + 한 줄 설명 */}
        {isInstitution && (
          <>
            {/* 날짜를 카드 바깥쪽 좌측 상단에 표시 */}
            <p className="absolute -top-11 left-2 text-secondary text-[14px] font-semibold">
              {experience.date}
            </p>
            <div>
              <h3 className="text-white text-[24px] font-bold mb-2">
                {experience.title}
              </h3>
              <p className="text-secondary text-[16px] font-medium">
                {experience.description}
              </p>
            </div>
          </>
        )}

        {/* Project 카드 - 이미지 2장 + 제목 + 설명 */}
        {isProject && (
          <div className="relative">
            {/* 프로젝트 제목 및 설명 */}
            <h3 className="text-white text-[20px] font-bold mb-2">
              {experience.title}
            </h3>
            <p className="text-white-100 text-[14px] mb-4">
              {experience.description}
            </p>

            {/* Play_Install 버튼 - 몽중저택 카드 우측 상단 바깥으로 삐져나옴 */}
            {experience.pptFile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const link = document.createElement('a');
                  link.href = experience.pptFile;
                  link.download = '몽중저택.pptm';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="absolute -top-3 -right-3 z-10 px-3 py-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-lg transition-colors"
              >
                Play_Install
              </button>
            )}

            {/* 16:9 이미지 2장 가로 배치 */}
            {experience.images && experience.images.length >= 2 && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                {experience.images.slice(0, 2).map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-video overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img}
                      alt={`${experience.title} 스크린샷 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </VerticalTimelineElement>

      {/* 이미지 확대 모달 */}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
};

// 그룹 박스 컴포넌트 - 대분류와 소속 소분류들을 묶어서 표시
const ExperienceGroup = ({ institution, projects }) => {
  return (
    <div className="relative mb-16">
      {/* 그룹 배경 박스 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/20 to-[#16162a]/20 rounded-2xl border border-[#383E56]/30 -mx-4 md:-mx-8 -my-4 md:-my-8 pointer-events-none" />

      {/* 그룹 내용 */}
      <div className="relative z-10 px-4 md:px-8 py-4 md:py-8">
        {/* 대분류 (기관) */}
        <ExperienceCard
          experience={institution}
          isFirstInGroup={true}
          isLastInGroup={false}
        />

        {/* 소분류 (프로젝트들) */}
        {projects.map((project, index) => (
          <ExperienceCard
            key={index}
            experience={project}
            isFirstInGroup={false}
            isLastInGroup={index === projects.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

const Experience = () => {
  // experiences 배열을 그룹으로 재구성
  const experienceGroups = [];
  let currentInstitution = null;
  let currentProjects = [];

  experiences.forEach((exp, index) => {
    if (exp.type === 'institution') {
      // 이전 그룹이 있으면 저장
      if (currentInstitution) {
        experienceGroups.push({
          institution: currentInstitution,
          projects: currentProjects,
        });
      }
      // 새 그룹 시작
      currentInstitution = exp;
      currentProjects = [];
    } else if (exp.type === 'project') {
      currentProjects.push(exp);
    }

    // 마지막 항목이면 현재 그룹 저장
    if (index === experiences.length - 1 && currentInstitution) {
      experienceGroups.push({
        institution: currentInstitution,
        projects: currentProjects,
      });
    }
  });

  return (
    <>
      <div>
        <p className={styles.sectionSubText}>EXPERIENCE</p>
        <h2 className={styles.sectionHeadText}>성장 여정</h2>
      </div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experienceGroups.map((group, groupIndex) => (
            <ExperienceGroup
              key={groupIndex}
              institution={group.institution}
              projects={group.projects}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'work');

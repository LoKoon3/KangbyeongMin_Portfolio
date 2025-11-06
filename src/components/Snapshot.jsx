import React from 'react';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { snapshot1, snapshot2, snapshot3 } from '../assets';

const ImageCard = ({ index, imageSrc, caption }) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', 0.5 * index, 0.75)}
      className="w-full sm:w-[350px]"
    >
      <div className="relative w-full h-[350px] bg-tertiary rounded-2xl overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={caption || `스냅샷 ${index + 1}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-secondary">
            <p className="text-sm">이미지 {index + 1}</p>
          </div>
        )}
        {caption && (
          <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 px-3 py-2 rounded-tl-lg">
            <p className="text-white text-[12px] text-right">{caption}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Snapshot = () => {
  // 추후 constants/index.js에 데이터를 추가하고 import하여 사용할 수 있습니다
  const snapshots = [
    { imageSrc: snapshot1, caption: '뉴콘텐츠아카데미 | 1학기 팀프로젝트 발표 사진' },
    { imageSrc: snapshot2, caption: '뉴콘텐츠아카데미 | 내부 인사이트 공유 발표 사진' },
    { imageSrc: snapshot3, caption: '뉴콘텐츠아카데미 | 2학기 팀프로젝트 기획 발표 사진' },
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>NOW I DO</p>
        <h2 className={styles.sectionHeadText}>마지막으로</h2>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {snapshots.map((snapshot, index) => (
          <ImageCard key={`snapshot-${index}`} index={index} {...snapshot} />
        ))}
      </div>

      <motion.div
        variants={fadeIn('up', 'spring', 0.5, 1)}
        className="mt-16 w-full flex justify-center px-4"
      >
        <div className="relative w-full max-w-[1150px] px-8 py-6 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30 rounded-2xl border border-purple-500/30 shadow-2xl backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl animate-pulse"></div>
          <h3 className="relative text-white text-[18px] sm:text-[24px] md:text-[28px] font-bold text-center tracking-tight leading-relaxed">
            어떠한 업무든 큰 그림을 바라보며 역량을 발휘해 회사에 기여하겠습니다<br className="sm:hidden" /> 읽어주셔서 감사합니다
          </h3>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Snapshot, 'snapshot');

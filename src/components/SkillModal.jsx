import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillModal = ({ skill, isOpen, onClose }) => {
  if (!skill) return null;

  // 각 이미지의 아코디언 상태 관리
  const [expandedItems, setExpandedItems] = useState([]);

  // 파일 hover 상태 관리 (어떤 이미지를 하이라이트할지)
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  // 이미지 툴팁 상태 관리
  const [imageTooltip, setImageTooltip] = useState({ show: false, index: null, x: 0, y: 0 });

  // 아코디언 토글
  const toggleAccordion = (index) => {
    setExpandedItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // 이미지 설명 문구 (documentation 스킬에만 적용)
  const getImageDescription = (index) => {
    if (skill.id !== 'documentation') return '';

    const descriptions = [
      '명상x게임의 방향성과 유저 시나리오 보여주는 발표용 제안서',
      'VR 오픈월드 MBTI 특성을 반영한 퀘스트의 시스템 전반을 설계한 기획서',
      '졸업작품 프로젝트의 기획 방향성을 보여주는 발표용 문서'
    ];
    return descriptions[index] || '';
  };

  // 이미지 마우스 이동 핸들러
  const handleImageMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setImageTooltip({
      show: true,
      index,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // 이미지 마우스 나감 핸들러
  const handleImageMouseLeave = () => {
    setImageTooltip({ show: false, index: null, x: 0, y: 0 });
  };

  // 파일명으로 이미지 인덱스 찾기
  const getImageIndexFromFileName = (fileName) => {
    if (fileName.includes('SoulDive')) return 0;
    if (fileName.includes('Ashuel')) return 1;
    if (fileName.includes('던전피드백')) return 2;
    // AI 프로토타이핑 파일 매핑
    if (fileName.includes('Chap1점프맵')) return 0; // 레벨디자인 초안 기획
    if (fileName.includes('레벨디자인 개요')) return 1; // AI 문서 시각화
    return null;
  };

  // 파일 다운로드
  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // 파일 아이콘
  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    switch (ext) {
      case 'pdf': return '📄';
      case 'xlsx':
      case 'xls': return '📊';
      case 'pptx':
      case 'ppt': return '📊';
      case 'zip': return '📦';
      default: return '📥';
    }
  };

  return (
    <>
      {/* 스킬 모달 */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          {/* 배경 오버레이 */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-2 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[1920px] transform overflow-hidden rounded-2xl bg-tertiary p-3 text-left align-middle shadow-xl transition-all">
                  {/* 헤더 - 닫기 버튼만 */}
                  <div className="flex justify-end items-center mb-4">
                    <button
                      onClick={onClose}
                      className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
                    >
                      <span className="text-sm font-medium">닫기</span>
                      <span className="text-2xl">×</span>
                    </button>
                  </div>

                  {/* 이미지 갤러리 (아코디언 포함) */}
                  {skill.images && skill.images.length > 0 && (
                    <div className="mb-6">
                      {/* AI 프로토타이핑은 타임라인 스타일 */}
                      {skill.id === 'ai-prototyping' ? (
                        <div className="flex items-center gap-5">
                          {skill.images.map((image, idx) => (
                            <Fragment key={idx}>
                              {/* 이미지 카드 */}
                              <motion.div
                                className={`flex flex-col gap-2 flex-1 rounded-lg p-3 transition-all duration-300 ${
                                  hoveredImageIndex === idx ? 'ring-4 ring-blue-500 ring-opacity-70' : ''
                                }`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 * idx }}
                              >
                                {/* 이미지 제목 */}
                                <div className="bg-primary rounded-lg px-4 py-2 text-center">
                                  <h4 className="text-white font-semibold text-sm">
                                    {image.title}
                                  </h4>
                                </div>

                                {/* 이미지 */}
                                <div className="relative rounded-lg overflow-hidden">
                                  <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full aspect-video object-cover"
                                  />
                                </div>
                              </motion.div>

                              {/* 화살표 (마지막 이미지 다음엔 표시 안 함) */}
                              {idx < skill.images.length - 1 && (
                                <motion.div
                                  className="flex items-center flex-shrink-0"
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.5, delay: 0.2 * idx + 0.3 }}
                                >
                                  <div className="text-4xl text-green-500">
                                    →
                                  </div>
                                </motion.div>
                              )}
                            </Fragment>
                          ))}
                        </div>
                      ) : (
                        /* 기존 그리드 스타일 */
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {skill.images.map((image, idx) => {
                          const isExpanded = expandedItems.includes(idx);
                          const isHovered = hoveredImageIndex === idx;

                          return (
                            <motion.div
                              key={idx}
                              className={`flex flex-col gap-2 rounded-lg p-3 transition-all duration-300 ${
                                isHovered ? 'ring-4 ring-blue-500 ring-opacity-70' : ''
                              }`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.1 * idx }}
                            >
                              {/* 이미지 제목 */}
                              <div className="bg-primary rounded-lg px-4 py-2 text-center">
                                <h4 className="text-white font-semibold text-sm">
                                  {image.title}
                                </h4>
                              </div>

                              {/* 이미지 */}
                              <div
                                className="relative rounded-lg overflow-hidden"
                                onMouseMove={(e) => handleImageMouseMove(e, idx)}
                                onMouseLeave={handleImageMouseLeave}
                              >
                                <img
                                  src={image.src}
                                  alt={image.title}
                                  className="w-full aspect-video object-cover"
                                />

                                {/* 이미지 툴팁 (documentation 스킬에만 표시) */}
                                {skill.id === 'documentation' && imageTooltip.show && imageTooltip.index === idx && (
                                  <div
                                    className="absolute bg-black bg-opacity-90 text-white text-xs px-3 py-2 rounded-lg pointer-events-none z-10 whitespace-nowrap"
                                    style={{
                                      left: `${imageTooltip.x + 10}px`,
                                      top: `${imageTooltip.y + 10}px`
                                    }}
                                  >
                                    {getImageDescription(idx)}
                                  </div>
                                )}
                              </div>

                              {/* 아코디언: 제출 의도 */}
                              {image.intent && (
                                <div className="bg-primary rounded-lg overflow-hidden">
                                  {/* 아코디언 헤더 */}
                                  <button
                                    onClick={() => toggleAccordion(idx)}
                                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-opacity-80 transition-all duration-200"
                                  >
                                    <span className="text-secondary text-sm font-semibold flex items-center gap-2">
                                      <span>📝</span>
                                      <span>제출 의도</span>
                                    </span>
                                    <motion.span
                                      className="text-secondary text-xl"
                                      animate={{ rotate: isExpanded ? 180 : 0 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      ▼
                                    </motion.span>
                                  </button>

                                  {/* 아코디언 내용 */}
                                  <AnimatePresence>
                                    {isExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                      >
                                        <div className="px-4 pb-4 pt-2">
                                          <p className="text-secondary text-sm leading-relaxed">
                                            {image.intent}
                                          </p>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                      )}
                    </div>
                  )}

                  {/* 구분선 및 설명 텍스트 */}
                  {(skill.description || (skill.portfolioFiles && skill.portfolioFiles.length > 0)) && (
                    <>
                      <div className="w-full h-[1px] bg-secondary opacity-30 my-6"></div>

                      {/* 설명 텍스트 (있는 경우) */}
                      {skill.description && (
                        <div className="mb-6">
                          <p className="text-white text-lg leading-relaxed text-center">
                            {skill.description}
                          </p>
                        </div>
                      )}

                      {/* 포트폴리오 다운로드 - 개발 엔진 지식 스킬은 제외 */}
                      {skill.portfolioFiles && skill.portfolioFiles.length > 0 && skill.id !== 'engine-knowledge' && (
                        <div className="space-y-3">
                          <h4 className="text-lg font-bold text-white flex items-center gap-2">
                            <span>📄</span>
                            포트폴리오 다운로드
                          </h4>
                          <div className="space-y-2">
                            {skill.portfolioFiles.map((file, idx) => {
                              const imageIndex = getImageIndexFromFileName(file.name);

                              return (
                                <button
                                  key={idx}
                                  onClick={() => handleDownload(file.url, file.name)}
                                  onMouseEnter={() => setHoveredImageIndex(imageIndex)}
                                  onMouseLeave={() => setHoveredImageIndex(null)}
                                  className="w-full flex items-center justify-between px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 group"
                                >
                                <span className="flex items-center gap-3 text-white">
                                  <span className="text-xl">{getFileIcon(file.name)}</span>
                                  <span className="font-medium">{file.name}</span>
                                </span>
                                <span className="text-white group-hover:translate-x-1 transition-transform">
                                  →
                                </span>
                              </button>
                            );
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SkillModal;

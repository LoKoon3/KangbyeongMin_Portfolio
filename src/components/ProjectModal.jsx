import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import YouTubeEmbed from './YouTubeEmbed';
import MediaGallery from './MediaGallery';

// 큰따옴표로 감싸진 텍스트를 볼드 처리하는 함수
const formatTextWithBold = (text) => {
  if (!text) return null;

  const parts = text.split(/(".*?")/g);
  return parts.map((part, index) => {
    if (part.startsWith('"') && part.endsWith('"')) {
      return (
        <strong key={index} className="text-white font-bold">
          {part}
        </strong>
      );
    }
    return part;
  });
};

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [selectedRole, setSelectedRole] = useState('pm'); // 'pm', 'quest', 'dev', 'art'
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Reset role and show hint when modal opens
  useEffect(() => {
    if (isOpen && project) {
      // Check which role type this project has and set default
      if (project.problem_dev && project.problem_art) {
        setSelectedRole('dev'); // 개발팀 우선
      } else {
        setSelectedRole('pm'); // PM 우선 (기존)
      }

      // Always show hint when modal opens
      setShowHint(true);
      console.log('Modal opened - showHint:', true, 'selectedRole:', project.problem_dev ? 'dev' : 'pm');
    }
  }, [isOpen, project]);

  // Handle role change
  const handleRoleChange = (newRole) => {
    if (newRole !== selectedRole) {
      // Dismiss hint when user clicks different role
      setShowHint(false);
    }
    setSelectedRole(newRole);
  };

  if (!project) return null;

  // Check if project has role-based data
  const hasPmQuestData = project.problem_pm && project.problem_quest;
  const hasDevArtData = project.problem_dev && project.problem_art;
  const hasRoleData = hasPmQuestData || hasDevArtData;

  // Check if this is one of the first 3 "major projects" (주요 프로젝트)
  const isMajorProject = ['meditation-platformer', 'neuro-drive', 'dungeon-feedback'].includes(project.slug);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full ${isMajorProject ? 'max-w-[1600px]' : 'max-w-6xl'} transform overflow-hidden rounded-2xl bg-tertiary ${isMajorProject ? 'p-8' : 'p-6'} text-left align-middle shadow-xl transition-all`}>
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-bold text-white"
                  >
                    {project.name}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-secondary hover:text-white transition-colors"
                    onClick={onClose}
                    aria-label="모달 닫기"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className={`flex flex-col lg:flex-row ${isMajorProject ? 'gap-8' : 'gap-6'}`}>
                  {/* Left Side (60%) */}
                  <div className="lg:w-[60%] w-full space-y-5">
                    {/* 나의 클래스 & 보스 몬스터 (Row layout) - Moved to top */}
                    <div className={`flex flex-col sm:flex-row ${isMajorProject ? 'gap-6' : 'gap-4'}`}>
                      {/* 나의 클래스 (Role) */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <svg
                            className={`${isMajorProject ? 'w-7 h-7' : 'w-6 h-6'} text-blue-400`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <h4 className={`text-white font-bold ${isMajorProject ? 'text-xl' : 'text-lg'}`}>
                            담당 역할
                          </h4>
                        </div>
                        <p className={`text-secondary font-medium ${isMajorProject ? 'text-base' : 'text-sm'} leading-relaxed whitespace-pre-line`}>
                          {project.role_brief}
                        </p>
                      </div>

                      {/* 보스 몬스터 (Problem) */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <svg
                            className={`${isMajorProject ? 'w-7 h-7' : 'w-6 h-6'} text-red-400`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          <h4 className={`text-white font-bold ${isMajorProject ? 'text-xl' : 'text-lg'}`}>
                            직면한 문제
                          </h4>
                        </div>
                        <p className={`text-secondary font-medium ${isMajorProject ? 'text-base' : 'text-sm'} leading-relaxed whitespace-pre-line`}>
                          {hasPmQuestData
                            ? selectedRole === 'pm'
                              ? project.problem_pm
                              : project.problem_quest
                            : hasDevArtData
                            ? selectedRole === 'dev'
                              ? project.problem_dev
                              : project.problem_art
                            : project.problem_brief}
                        </p>
                      </div>
                    </div>

                    {/* Media Gallery */}
                    {project.media && project.media.length > 0 ? (
                      <MediaGallery media={project.media} />
                    ) : (
                      // Fallback to old YouTubeEmbed if no media array
                      <YouTubeEmbed
                        youtubeId={project.youtubeId}
                        title={project.name}
                      />
                    )}

                    {/* 제작 정보 */}
                    {project.information && (
                      <div className={`text-secondary ${isMajorProject ? 'text-base' : 'text-sm'}`}>
                        <p>
                          <span className="font-bold text-white">제작 정보 : </span>
                          주체기관: {project.information.organization} | 팀원:{' '}
                          {project.information.teamSize} | 개발기간:{' '}
                          {project.information.duration} | 개발엔진:{' '}
                          {project.information.engine}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Side (40%) */}
                  <div className="lg:w-[40%] w-full">
                    {/* Role Toggle Buttons - only show if project has role data */}
                    {hasRoleData && (
                      <div className="relative flex gap-3 justify-center">
                        {hasPmQuestData ? (
                          <>
                            <button
                              onClick={() => handleRoleChange('pm')}
                              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                                selectedRole === 'pm'
                                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                                  : 'bg-tertiary text-secondary hover:bg-opacity-70'
                              }`}
                            >
                              PM
                            </button>
            <div className="relative flex flex-col items-center">
                              <button
                                onClick={() => handleRoleChange('quest')}
                                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                                  selectedRole === 'quest'
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                                    : 'bg-tertiary text-secondary hover:bg-opacity-70'
                                }`}
                              >
                                Quest
                              </button>
                              {/* UX Hint - pulsing border on Quest button when PM is selected */}
                              {showHint && selectedRole === 'pm' && (
                                <>
                                  <span className="absolute -inset-0.5 rounded-full border-2 border-purple-600 animate-pulse-border pointer-events-none"></span>
                                  <span className="absolute -top-5 text-[10px] text-purple-400 animate-pulse-border">click</span>
                                </>
                              )}
                            </div>
                          </>
                        ) : hasDevArtData ? (
                          <>
                            <button
                              onClick={() => handleRoleChange('dev')}
                              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                                selectedRole === 'dev'
                                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                                  : 'bg-tertiary text-secondary hover:bg-opacity-70'
                              }`}
                            >
                              개발팀
                            </button>
            <div className="relative flex flex-col items-center">
                              <button
                                onClick={() => handleRoleChange('art')}
                                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                                  selectedRole === 'art'
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/50'
                                    : 'bg-tertiary text-secondary hover:bg-opacity-70'
                                }`}
                              >
                                아트팀
                              </button>
                              {/* UX Hint - pulsing border on 아트팀 button when 개발팀 is selected */}
                              {showHint && selectedRole === 'dev' && (
                                <>
                                  <span className="absolute -inset-0.5 rounded-full border-2 border-red-600 animate-pulse-border pointer-events-none"></span>
                                  <span className="absolute -top-5 text-[10px] text-red-400 animate-pulse-border">click</span>
                                </>
                              )}
                            </div>
                          </>
                        ) : null}
                      </div>
                    )}
                    {/* 공략 (Solution) */}
                    <div className={`space-y-2 ${isMajorProject ? 'mt-14 pb-10 border-b border-secondary border-opacity-20' : 'mt-10 pb-5 border-b border-secondary border-opacity-20'}`}>
                      <div className="flex items-center gap-2">
                        <svg
                          className={`${isMajorProject ? 'w-7 h-7' : 'w-6 h-6'} text-green-400`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <h4 className={`text-white font-bold ${isMajorProject ? 'text-2xl' : 'text-lg'}`}>공략</h4>
                      </div>
                      <p className={`text-secondary font-medium ${isMajorProject ? 'text-lg' : 'text-sm'} leading-relaxed whitespace-pre-line`}>
                        {hasPmQuestData
                          ? formatTextWithBold(
                              selectedRole === 'pm'
                                ? project.solution_pm
                                : project.solution_quest
                            )
                          : hasDevArtData
                          ? formatTextWithBold(
                              selectedRole === 'dev'
                                ? project.solution_dev
                                : project.solution_art
                            )
                          : formatTextWithBold(project.solution_brief)}
                      </p>
                      {/* KPI 배지 - 공략 */}
                      {hasPmQuestData ? (
                        selectedRole === 'pm' && project.solution_kpi_pm ? (
                          <div className="inline-block px-3 py-1 bg-green-900 bg-opacity-50 rounded-full text-green-300 text-xs font-semibold mt-2">
                            {project.solution_kpi_pm}
                          </div>
                        ) : selectedRole === 'quest' &&
                          project.solution_kpi_quest ? (
                          <div className="inline-block px-3 py-1 bg-green-900 bg-opacity-50 rounded-full text-green-300 text-xs font-semibold mt-2">
                            {project.solution_kpi_quest}
                          </div>
                        ) : null
                      ) : hasDevArtData ? (
                        selectedRole === 'dev' && project.solution_kpi_dev ? (
                          <div className="inline-block px-3 py-1 bg-green-900 bg-opacity-50 rounded-full text-green-300 text-xs font-semibold mt-2">
                            {project.solution_kpi_dev}
                          </div>
                        ) : selectedRole === 'art' &&
                          project.solution_kpi_art ? (
                          <div className="inline-block px-3 py-1 bg-green-900 bg-opacity-50 rounded-full text-green-300 text-xs font-semibold mt-2">
                            {project.solution_kpi_art}
                          </div>
                        ) : null
                      ) : (
                        project.solution_kpi && (
                          <div className="inline-block px-3 py-1 bg-green-900 bg-opacity-50 rounded-full text-green-300 text-xs font-semibold mt-2">
                            {project.solution_kpi}
                          </div>
                        )
                      )}
                    </div>

                    {/* 보상 (Result) */}
                    {(hasPmQuestData
                      ? project.result_pm || project.result_quest
                      : hasDevArtData
                      ? project.result_dev || project.result_art
                      : project.result_brief) && (
                      <div className={`space-y-2 ${isMajorProject ? 'pt-7 pb-10 border-b border-secondary border-opacity-20' : 'pt-5 pb-5 border-b border-secondary border-opacity-20'}`}>
                        <div className="flex items-center gap-2">
                          <svg
                            className={`${isMajorProject ? 'w-7 h-7' : 'w-6 h-6'} text-yellow-400`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <h4 className={`text-white font-bold ${isMajorProject ? 'text-2xl' : 'text-lg'}`}>보상</h4>
                        </div>
                        <p className={`text-secondary font-medium ${isMajorProject ? 'text-lg' : 'text-sm'} leading-relaxed whitespace-pre-line`}>
                          {hasPmQuestData
                            ? formatTextWithBold(
                                selectedRole === 'pm'
                                  ? project.result_pm
                                  : project.result_quest
                              )
                            : hasDevArtData
                            ? formatTextWithBold(
                                selectedRole === 'dev'
                                  ? project.result_dev
                                  : project.result_art
                              )
                            : formatTextWithBold(project.result_brief)}
                        </p>
                        {/* KPI 배지 - 보상 */}
                        {hasPmQuestData ? (
                          selectedRole === 'pm' && project.result_kpi_pm ? (
                            <div className="inline-block px-3 py-1 bg-yellow-900 bg-opacity-50 rounded-full text-yellow-300 text-xs font-semibold mt-2">
                              {project.result_kpi_pm}
                            </div>
                          ) : selectedRole === 'quest' &&
                            project.result_kpi_quest ? (
                            <div className="inline-block px-3 py-1 bg-yellow-900 bg-opacity-50 rounded-full text-yellow-300 text-xs font-semibold mt-2">
                              {project.result_kpi_quest}
                            </div>
                          ) : null
                        ) : hasDevArtData ? (
                          selectedRole === 'dev' && project.result_kpi_dev ? (
                            <div className="inline-block px-3 py-1 bg-yellow-900 bg-opacity-50 rounded-full text-yellow-300 text-xs font-semibold mt-2">
                              {project.result_kpi_dev}
                            </div>
                          ) : selectedRole === 'art' &&
                            project.result_kpi_art ? (
                            <div className="inline-block px-3 py-1 bg-yellow-900 bg-opacity-50 rounded-full text-yellow-300 text-xs font-semibold mt-2">
                              {project.result_kpi_art}
                            </div>
                          ) : null
                        ) : (
                          project.result_kpi && (
                            <div className="inline-block px-3 py-1 bg-yellow-900 bg-opacity-50 rounded-full text-yellow-300 text-xs font-semibold mt-2">
                              {project.result_kpi}
                            </div>
                          )
                        )}
                        {/* 증빙 링크 */}
                        {project.proof_links &&
                          project.proof_links.length > 0 && (
                            <div className="flex gap-3 mt-3">
                              {project.proof_links.map((link, index) => (
                                <a
                                  key={index}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 text-xs underline"
                                >
                                  {link.label}
                                </a>
                              ))}
                            </div>
                          )}
                      </div>
                    )}

                    {/* 경험치 (EXP) */}
                    {(hasPmQuestData
                      ? project.experience_pm || project.experience_quest
                      : hasDevArtData
                      ? project.experience_dev || project.experience_art
                      : project.experience) && (
                      <div className={`space-y-2 ${isMajorProject ? 'pt-7' : 'pt-5'}`}>
                        <div className="flex items-center gap-2">
                          <svg
                            className={`${isMajorProject ? 'w-7 h-7' : 'w-6 h-6'} text-purple-400`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          <h4 className={`text-white font-bold ${isMajorProject ? 'text-2xl' : 'text-lg'}`}>
                            경험치
                          </h4>
                        </div>
                        <p className={`text-secondary font-medium ${isMajorProject ? 'text-lg' : 'text-sm'} leading-relaxed whitespace-pre-line`}>
                          {hasPmQuestData
                            ? formatTextWithBold(
                                selectedRole === 'pm'
                                  ? project.experience_pm
                                  : project.experience_quest
                              )
                            : hasDevArtData
                            ? formatTextWithBold(
                                selectedRole === 'dev'
                                  ? project.experience_dev
                                  : project.experience_art
                              )
                            : formatTextWithBold(project.experience)}
                        </p>
                        {/* KPI 배지 - 경험치 */}
                        {hasPmQuestData ? (
                          selectedRole === 'pm' && project.experience_kpi_pm ? (
                            <div className="inline-block px-3 py-1 bg-purple-900 bg-opacity-50 rounded-full text-purple-300 text-xs font-semibold mt-2">
                              {project.experience_kpi_pm}
                            </div>
                          ) : selectedRole === 'quest' &&
                            project.experience_kpi_quest ? (
                            <div className="inline-block px-3 py-1 bg-purple-900 bg-opacity-50 rounded-full text-purple-300 text-xs font-semibold mt-2">
                              {project.experience_kpi_quest}
                            </div>
                          ) : null
                        ) : hasDevArtData ? (
                          selectedRole === 'dev' && project.experience_kpi_dev ? (
                            <div className="inline-block px-3 py-1 bg-purple-900 bg-opacity-50 rounded-full text-purple-300 text-xs font-semibold mt-2">
                              {project.experience_kpi_dev}
                            </div>
                          ) : selectedRole === 'art' &&
                            project.experience_kpi_art ? (
                            <div className="inline-block px-3 py-1 bg-purple-900 bg-opacity-50 rounded-full text-purple-300 text-xs font-semibold mt-2">
                              {project.experience_kpi_art}
                            </div>
                          ) : null
                        ) : (
                          project.experience_kpi && (
                            <div className="inline-block px-3 py-1 bg-purple-900 bg-opacity-50 rounded-full text-purple-300 text-xs font-semibold mt-2">
                              {project.experience_kpi}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProjectModal;

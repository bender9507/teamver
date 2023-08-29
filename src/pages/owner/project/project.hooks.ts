import { useState } from "react";
import { useSelectProfileQuery } from "~/states/server/profile";
import { useSelectOwnerProjectsQuery } from "~/states/server/project";

export const useProject = (userId: string) => {
  const { data: profile } = useSelectProfileQuery(userId);
  const { data: projects } = useSelectOwnerProjectsQuery(userId);

  const [selectedCategory, setSelectedCategory] = useState("IN_PROGRESS");
  const [isInProgressSelected, setIsInProgressSelected] = useState(true);

  const handleCategoryClick = (category: string) => {
    setIsInProgressSelected(category === "IN_PROGRESS");
    setSelectedCategory(category); // 선택된 카테고리도 업데이트합니다.
  };

  const filteredProjects = projects.filter((project) =>
    selectedCategory === "DONE_PROJECT"
      ? project.state === "DONE_PROJECT"
      : project.state === "IN_RECRUIT" || project.state === "DONE_RECRUIT"
  );
  return {
    profile,
    projects,
    filteredProjects,
    selectedCategory,
    setSelectedCategory,
    isInProgressSelected,
    setIsInProgressSelected,
    handleCategoryClick
  };
};

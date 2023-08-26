import { useUser } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { useGetConstantQuery } from "~/states/server/constant";
import { projectsKey } from "~/states/server/project";
import { useInsertProjectMutate } from "~/states/server/project/mutations";

export const useProjectForm = () => {
  const queryClient = useQueryClient();

  const form = useForm();
  const user = useUser();
  const ownerId = user?.id;

  const { data } = useGetConstantQuery(["projectTypes", "positions", "languages", "skills"]);

  const { register, control, handleSubmit } = useForm();

  const arrayFields = {
    positions: useFieldArray({ control, name: "positions" }),
    projectTypes: useFieldArray({ control, name: "projectTypes" })
    // 다른 배열 필드 추가 가능
  };

  const handleChipClick = async (field, value) => {
    const { append } = arrayFields[field];
    await append({ value });
  };

  // const handleChipClick = (fieldName: string, value: string) => {
  //   const fieldValue = form.watch(fieldName) || [];
  //   // setValue(fieldName, [...fieldValue, value]);
  //   if (!fieldValue.includes(value)) {
  //     // 중복이 아닐 경우에만 값 추가
  //     form.setValue(fieldName, [...fieldValue, value]);
  //   } else {
  //     const newFieldValue = fieldValue.filter((e) => e !== value);
  //     form.setValue(fieldName, newFieldValue);
  //   }
  // };

  // 뮤테이션 선언
  const { mutate: insertTodoMutate } = useInsertProjectMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectOwnerProjects());
    }
  });

  const onSubmit = async () => {
    if (!user) return;

    const projectData = form.getValues();
    console.log(projectData);

    // try {
    //   const data = {
    //     ...projectData,
    //     ownerId
    //   };

    //   console.log(data); // 확인을 위한 로그

    //   // 뮤테이션 함수 실행
    //   await insertTodoMutate(data);

    //   // 성공 처리 또는 다음 단계
    // } catch (error) {
    //   console.error(error); // 오류 처리
    // }
  };

  return { form, data, arrayFields, onSubmit, handleSubmit, register, handleChipClick };
};

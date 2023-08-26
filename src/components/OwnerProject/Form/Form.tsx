import { useTranslation } from "next-i18next";
import { useRef, useState } from "react";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import { Button, Input, Label, OptionChip, Textarea } from "~/components/Commons";
import { useModal } from "~/components/Commons/Modal";
import { FlexColumn } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { ProjectImageUploader } from "../ProjectImageUploader/ProjectImageUploader";
import { useProjectForm } from "./Form.hooks";

import "react-datepicker/dist/react-datepicker.css";

export const Form = () => {
  const { t, i18n } = useTranslation("projectPage");
  const currentLanguage = i18n.language as OneOfLanguage;

  const app = useProjectForm();
  const [startDate, setStartDate] = useState(new Date());
  const modalContentRef = useRef(null);

  const { mount } = useModal();
  // console.log(data);

  return (
    <FlexColumn as="form" onSubmit={app.form.handleSubmit(app.onSubmit)}>
      <Controller
        name="imageUrl"
        control={app.form.control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => <ProjectImageUploader onChange={onChange} />}
      />

      <Label title={t("프로젝트 이름")} required>
        <Input {...app.form.register("name", { required: true })} />
      </Label>
      <Label title={t("프로젝트 타입")} required>
        <div>
          {app.data.projectTypes.map((type) => (
            <OptionChip
              key={type.id}
              name="type"
              value={type.id}
              onClick={() => app.handleChipClick("projectTypes", type.en)}
            >
              {t(type.en)}
            </OptionChip>
          ))}
        </div>
      </Label>

      <Label title={t("프로젝트 소개")} required>
        <Textarea {...app.form.register("description", { required: true })} />
      </Label>
      <Label title={t("모집 포지션")} required>
        <div>
          {app.data.positions.map((position) => (
            <OptionChip
              key={position.id}
              name="position"
              value={position.id}
              onClick={() => app.handleChipClick("positions", position.en)}
            >
              {t(position.en)}
            </OptionChip>
          ))}
        </div>
      </Label>
      <Label title={t("모집 인원")} required>
        <Input {...app.form.register("recruitCount", { required: true })} />
      </Label>
      <Label title={t("프로젝트 기간")} required>
        <Button
          onClick={() =>
            mount(
              <div ref={modalContentRef}>
                <DatePicker showIcon selected={startDate} onChange={(date) => setStartDate(date)} />
              </div>,

              { id: "sample", type: "bottom" }
            )
          }
        />
      </Label>

      {/* <Text>{app.arrayFields.map((item) => item.value).join(", ")}</Text> */}

      <Button type="submit">{t("완료")}</Button>
    </FlexColumn>
  );
};

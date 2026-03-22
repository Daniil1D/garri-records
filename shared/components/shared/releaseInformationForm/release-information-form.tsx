"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import { saveReleaseInformation } from "@/app/actions/index";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ReleaseCoverUpload } from "./release-cover-upload";
import { ReleaseMainFields } from "./release-main-fields";
import { ReleaseCopyrightForm } from "./release-copyright-form";
import { ReleaseArtistsForm } from "./release-artists-form";
import { ReleasePublishDateForm } from "./release-publish-date-form";

interface Props {
  releaseId: string;
  release: any;
}

type ReleaseInfoFormValues = {
  title: string;
  label: string;
  genre: string;
  version: string;
  artist: string;
  publishDate: Date | null;
  cover: string | null;
};

export const ReleaseInformationForm: React.FC<Props> = ({
  releaseId,
  release
}) => {
  const router = useRouter();

  const methods = useForm<ReleaseInfoFormValues>({
    defaultValues: {
      title: release.title ?? "",
      label: release.label?.name ?? "",
      genre: release.genre ?? "",
      version: release.version ?? "",
      artist: release.artist?.name ?? "",
      publishDate: release.releaseDate ?? null,
      cover: release.cover?.url ?? null,
    },
    mode: "onChange",
  });

  const {
    formState: { isValid, isSubmitting },
  } = methods;

  const onSubmit = async (data: ReleaseInfoFormValues) => {
    try {
      await saveReleaseInformation(releaseId, data);
      toast.success("Информация о релизе сохранена");
      toast.success("Релиз опубликован 🎉");
      router.push("/releases");
    } catch (e) {
      console.error(e);
      toast.error("Ошибка при сохранении релиза");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-6 sm:space-y-8 md:space-y-10"
      >
        <div
          className="rounded-3xl border bg-white shadow-sm 
          p-4 sm:p-6 md:p-8"
        >
          <div
            className="
            grid 
            grid-cols-1 
            md:grid-cols-[220px_1fr] 
            lg:grid-cols-[280px_1fr] 
            gap-6 sm:gap-8 md:gap-10
          "
          >
            <ReleaseCoverUpload releaseId={releaseId} />
            <ReleaseMainFields release={release} />
          </div>
        </div>

        <ReleaseCopyrightForm />

        <ReleaseArtistsForm release={release} />

        <ReleasePublishDateForm />

        <Button
          type="submit"
          className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg rounded-xl"
          disabled={!isValid || isSubmitting}
        >
          Сохранить информацию
        </Button>
      </form>
    </FormProvider>
  );
};
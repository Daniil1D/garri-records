"use client";

import React, { useState } from "react";
import { User } from "@prisma/client";
import { ProfileHeader } from "./profile-header";
import { ProfileEditForm } from "./profile-edit-form";
import { Container } from "../container";

interface Props {
  data: User;
}

export const Profile: React.FC<Props> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Container className="my-6 sm:my-8 lg:my-10 space-y-6 sm:space-y-8">
      <ProfileHeader
        user={data}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      {isEditing && (
        <ProfileEditForm user={data} setIsEditing={setIsEditing} />
      )}
    </Container>
  );
};

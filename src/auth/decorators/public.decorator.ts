import { SetMetadata } from "@nestjs/common";

export const PublicAccess = () => SetMetadata('public-key', true);
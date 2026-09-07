import { ConflictException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";
import { CreateRegistrationDto } from "./dto/create-registration.dto";

@Injectable()
export class RegistrationsService {
  private readonly logger = new Logger(RegistrationsService.name);

  constructor(private readonly supabase: SupabaseService) {}

  async create(dto: CreateRegistrationDto): Promise<{ id: string }> {
    const client = this.supabase.getClient();

    const { data, error } = await client
      .from("registrations")
      .insert({
        full_name: dto.fullName,
        email: dto.email.toLowerCase(),
        phone: dto.phone,
        institution: dto.institution,
        year_of_study: dto.yearOfStudy,
        attendance_mode: dto.attendanceMode,
        experience_level: dto.experienceLevel,
        interests: dto.interests,
        hear_about_us: dto.hearAboutUs ?? null,
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        throw new ConflictException("This email has already been registered.");
      }
      this.logger.error(`Failed to insert registration: ${error.message}`);
      throw new InternalServerErrorException("Could not save your registration. Please try again.");
    }

    return { id: data.id };
  }
}

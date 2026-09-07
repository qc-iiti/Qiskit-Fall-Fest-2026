import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";
import { CreateHackathonRegistrationDto } from "./dto/create-team.dto";

@Injectable()
export class HackathonService {
  private readonly logger = new Logger(HackathonService.name);

  constructor(private readonly supabase: SupabaseService) {}

  async create(dto: CreateHackathonRegistrationDto): Promise<{ id: string }> {
    if (!dto.agreedToRules) {
      throw new BadRequestException("You must accept the hackathon rules to register.");
    }

    const client = this.supabase.getClient();

    const { data, error } = await client
      .from("hackathon_teams")
      .insert({
        team_name: dto.teamName,
        track: dto.track ?? "General",
        attendance_mode: dto.attendanceMode,
        problem_statement: dto.problemStatement ?? null,
        leader_name: dto.leader.fullName,
        leader_email: dto.leader.email.toLowerCase(),
        leader_phone: dto.leader.phone,
        leader_institution: dto.leader.institution,
        members: dto.members.map((m) => ({
          full_name: m.fullName,
          email: m.email.toLowerCase(),
          institution: m.institution,
        })),
        github_url: dto.githubUrl ?? null,
        agreed_to_rules: dto.agreedToRules,
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        throw new ConflictException("A team with this name or leader email is already registered.");
      }
      this.logger.error(`Failed to insert hackathon team: ${error.message}`);
      throw new InternalServerErrorException("Could not save your team. Please try again.");
    }

    return { id: data.id };
  }
}

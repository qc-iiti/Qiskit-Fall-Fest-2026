import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { HackathonService } from "./hackathon.service";
import { CreateHackathonRegistrationDto } from "./dto/create-team.dto";

@Controller("hackathon-registrations")
export class HackathonController {
  constructor(private readonly hackathonService: HackathonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateHackathonRegistrationDto) {
    return this.hackathonService.create(dto);
  }
}

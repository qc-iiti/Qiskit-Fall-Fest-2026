import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private readonly client: SupabaseClient | null;

  constructor(private readonly config: ConfigService) {
    const url = this.config.get<string>("SUPABASE_URL");
    const key = this.config.get<string>("SUPABASE_SERVICE_ROLE_KEY");

    if (!url || !key) {
      this.logger.warn(
        "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set. " +
          "Registration endpoints will return an error until they are configured.",
      );
      this.client = null;
    } else {
      this.client = createClient(url, key, {
        auth: { persistSession: false },
      });
    }
  }

  getClient(): SupabaseClient {
    if (!this.client) {
      throw new InternalServerErrorException(
        "Registration storage is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      );
    }
    return this.client;
  }
}

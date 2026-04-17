import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { EventsService } from "./events.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";

@Controller("events")
@UseGuards(JwtAuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get("upcoming")
  getUpcomingEvents(@Query("page") page?: string, @Query("limit") limit?: string) {
    return this.eventsService.getUpcomingEvents(Number(page) || 1, Number(limit) || 20);
  }

  @Get("past")
  getPastEvents(@Query("page") page?: string, @Query("limit") limit?: string) {
    return this.eventsService.getPastEvents(Number(page) || 1, Number(limit) || 20);
  }

  @Get(":id")
  getEvent(@Param("id") id: string) {
    return this.eventsService.getEvent(id);
  }
}

import { Body, Controller, Delete, Get, Query, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { QueryPaginationDto } from "src/utils/dto/query-pagination.dto";
import { FeedbackService } from "./feedback.service";

@Controller('feedback')
export class FeedbackController {
    constructor(private feedbakService: FeedbackService) {}

    @UseGuards(AuthGuard)
    @Get()
    @ApiOkResponse({ description: 'Получение нескольких сообщеий об обратной связи' })
    @ApiQuery({type: 'string', name: 'offset', description: 'Количество сообщений, которое нужно отступить от начала отсчета'})
    @ApiQuery({type: 'string', name: 'limit', description: 'Лимит сообщений на странице'})
    async getFeedback(@Query() queryPagination: QueryPaginationDto) {
        return await this.feedbakService.getFeedback(queryPagination);
    }

    @UseGuards(AuthGuard)
    @ApiOkResponse({ description: 'Удаление нескольких отзывов, если они не корректны' })
    @Delete()
    async deletedFeedback(@Body() ids: string[]) {
        return await this.feedbakService.deletedFeedback({ids});
    }
}
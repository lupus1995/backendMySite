import { ApiProperty } from "@nestjs/swagger";

export class CreateArticleDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;
    
    @ApiProperty()
    thumbnail:string;

    @ApiProperty()
    text: string;

    @ApiProperty()
    keyWords: string;
}
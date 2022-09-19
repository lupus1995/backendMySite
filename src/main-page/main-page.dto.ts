import { ApiProperty } from "@nestjs/swagger";

export class CreateMainPageDto {
    @ApiProperty()
    firstBlockBackgroundImage: string;
  
    @ApiProperty()
    firstBlockTitle: string;
  
    @ApiProperty()
    firstBlockSubtitle: string;
  
    @ApiProperty()
    aboutMeTitle: string;
  
    @ApiProperty()
    aboutMeDescription: string;
  
    @ApiProperty()
    aboutMePhoto: string;
}
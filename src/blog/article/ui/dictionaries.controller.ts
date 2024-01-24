import { Controller, Get } from '@nestjs/common';

import { EditorEnum } from 'src/utils/schemas/blog/article.schema';

@Controller('dictionaries')
export class DictionariesController {
  @Get('text-editor')
  getTypeTextEditor() {
    return EditorEnum;
  }
}

import { IsNotEmpty } from 'class-validator';

export class SaveDocumentBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  data: string;
}

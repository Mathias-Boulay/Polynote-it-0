import { IsNotEmpty } from 'class-validator';

export class CreateDocumentBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  path: string;
}

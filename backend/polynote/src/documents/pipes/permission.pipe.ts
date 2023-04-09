import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class LinkPermissionPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (['READ', 'WRITE'].includes(value)) {
      return value;
    }

    throw new BadRequestException(
      'Bad permission format, use either [READ, WRITE]',
    );
  }
}

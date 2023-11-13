import { ValidationPipe } from '@nestjs/common';

export const validationPipe = new ValidationPipe({
  skipMissingProperties: false,
  whitelist: false,
  forbidNonWhitelisted: false,
  forbidUnknownValues: true,
  disableErrorMessages: false,
  dismissDefaultMessages: false,
  transform: true,
  validationError: {
    target: true,
    value: true,
  },
});

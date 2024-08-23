import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Allow only the frontend origin
    credentials: true, // Allow credentials (cookies, authorization headers)
  });
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(
      `Server is running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`,
    );
  });
}
bootstrap();

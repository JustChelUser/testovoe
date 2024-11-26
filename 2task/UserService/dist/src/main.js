"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
require("reflect-metadata");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const PORT = process.env.PORT || 5000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('userService')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('userService')
        .build();
    const Document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/api/docs', app, Document);
    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map
import { writeFile }                         from 'node:fs/promises'
import { join }                              from 'node:path'
import { fileURLToPath }                     from 'node:url'

import { RapidocModule }                     from '@b8n/nestjs-rapidoc'
import { ConnectRpcServer }                  from '@monstrs/nestjs-connectrpc'
import { ServerProtocol }                    from '@monstrs/nestjs-connectrpc'
import { NestFactory }                       from '@nestjs/core'
import { DocumentBuilder }                   from '@nestjs/swagger'
import { SwaggerModule }                     from '@nestjs/swagger'

import { StandaloneServiceEntrypointModule } from './module/index.js'

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(StandaloneServiceEntrypointModule.build(), {})

  app.enableShutdownHooks()
  app.enableCors({
    origin: true,
    credentials: true,
  })

  app.connectMicroservice({
    strategy: new ConnectRpcServer({
      protocol: ServerProtocol.HTTP2_INSECURE,
      port: 50051,
    }),
  })

  const options = new DocumentBuilder()
    .setTitle('Dating backoffice')
    .setDescription('The Dating backoffice API description')
    .setVersion('1.0')
    .addTag('dating')
    .addServer('/')
    .build()

  const document = SwaggerModule.createDocument(app, options, {
    operationIdFactory: (_: string, methodKey: string): string => methodKey,
  })

  await writeFile(
    join(fileURLToPath(new URL('.', import.meta.url)), '../../openapi.schema.json'),
    JSON.stringify(document)
  )

  RapidocModule.setup('api', app, document)

  await app.startAllMicroservices()
  await app.listen(3000)

  if (import.meta.webpackHot) {
    import.meta.webpackHot.accept()
    import.meta.webpackHot.dispose(() => {
      app.close()
    })
  }
}

bootstrap()

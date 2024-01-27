import { ConnectRpcServer }                  from '@monstrs/nestjs-connectrpc'
import { ServerProtocol }                    from '@monstrs/nestjs-connectrpc'
import { NestFactory }                       from '@nestjs/core'

import { StandaloneServiceEntrypointModule } from './module/index.js'

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(StandaloneServiceEntrypointModule.build(), {})

  app.enableShutdownHooks()

  app.connectMicroservice({
    strategy: new ConnectRpcServer({
      protocol: ServerProtocol.HTTP2_INSECURE,
      port: 50051,
    }),
  })

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

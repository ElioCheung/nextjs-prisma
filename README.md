# NextJS+Prisma+Postgres

## 使用docker启动postgres

  使用docker启用postgres，避免繁琐的安装和环境变量设置

  1. 获取postgres镜像
  
      ```
      docker pull postgres
      ```

  2. 运行Postgres

      ```
      docker run –name pgsql-dev -e POSTGRES_PASSWORD=Welcome4$ -e  POSTGRES_USER=mydb -p 5432:5432 postgres
      ``` 

  3. 安装postgres可视化工具

      ```
      docker pull dpage/pgadmin4
      ```

  4. 启动工具

      ```
      docker run -e ‘PGADMIN_DEFAULT_EMAIL=test@domain.local’ -e ‘PGADMIN_DEFAULT_PASSWORD=test1234’ -p 8080:80 –name pgadmin4-dev dpage/pgadmin4
      ```

  5. 获取postgres配置文件

      ```
      docker inspect pgsql-dev
      ```

  6. 根据配置文件中的IP，在pgAdmin中创建链接

## [Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)

  1. 安装Prisma

      ```
      npm install prisma
      ```
  
  2. 初始化Prisma

      ```
      npx prisma init
      ```

  3. 将数据模型映射到数据库

      ```
      npx prisma migrate dev --name init
      ```

      该命令会做两件事：

        - 创建新的迁移sql文件
        - 数据库运行sql文件

  4. 初始化数据库

      - 修改package.json文件

        ```
        // package.json
        "prisma": {
          "seed": "ts-node --transpile-only prisma/seed.ts"
        },
        "scripts": {
          ...
          "prisma:seed": "npx prisma db seed"
        },
        ```
      
      - 增加seed.ts文件，路径：./prisma/seed.ts

      - 确保运行，ts.config.json文件还需改造

        ```
        "ts-node": {
          "compilerOptions": {
            "module": "NodeNext",
            "moduleResolution": "NodeNext"
          }
        },
        ```

  5. 安装Prisma客户端

      ```
      npm install @prisma/client
      ```


## FAQ

  1. NextJs客户端组件无法使用异步函数（async/await），如何解决？

      示例，在Menu.tsx中，若localstorage中标记用户已登录，且有用户id，则显示用户名称。

      刚开始的思路：使用useEffect，获取localstorage中存储的id，然后，通过prisma客户端获取用户，由于是异步操作，遂为Menu添加async标志，报错：客户端组件无法使用async/await。

      ~~解决办法：在不依赖第三方lib情况下，将需要显示用户昵称的部分，独立成服务端组件即可，如UserLink.tsx~~

      上述解决办法存在问题：NextJS文档表明，不支持将服务端组件直接引入至客户端组件，受限于服务端组件优先于客户端组件渲染。但支持服务端组件以插槽的形式引入至客户端组件中。[官方文档](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

      解决方法：在不依赖swr或react query第三方库的情况下，在UserLink.ts中使用useEffect+fetch获取数据

  2. 登录成功，跳转至首页，links未更新？

      现象：在/app/signin/page.tsx中，用户输入关键信息，登录成功，重定向至首页，发现Menu并未更新，还是之前未登录的状态

      解决方法：在Menu组件中的useEffect中添加依赖usePathname的依赖，当路由发生改变时，检查localstorage存储的token，以更新Menu

  3. 使用generateStaticParams导致类型不匹配？

      路径：/app/post/[id]/page.tsx
      由于post的id类型为number。但是，路径中匹配的类型为string，会出现错误。故，需将类型进行转换。

      好处：使用generateStaticParams与动态路由结合，从而在*构建*时生成静态路由，提升加载速度，而不是在请求时按需生成。
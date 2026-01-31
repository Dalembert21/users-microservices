import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { CreateUserHandler } from '../../application/handlers/create-user.handler/create-user.handler';
import { GetUserHandler } from '../../application/handlers/query-handlers/get-user.handler/get-user.handler';
import { GetUsersHandler } from '../../application/handlers/query-handlers/get-users.handler/get-users.handler';
import { CreateUserCommand } from '../../application/commands/create-user.command/create-user.command';
import { GetUserQuery } from '../../application/queries/get-user.query/get-user.query';
import { GetUsersQuery } from '../../application/queries/get-users.query/get-users.query';

@Controller()
export class UserMicroserviceController {
  constructor(
    private readonly createUserHandler: CreateUserHandler,
    private readonly getUserHandler: GetUserHandler,
    private readonly getUsersHandler: GetUsersHandler,
  ) {}

  @MessagePattern('user.created')
  async handleCreateUser(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('Datos enviados desde API:', JSON.stringify(data, null, 2));
    
    try {
      console.log('Creando usuario con email:', data.email);
      const command = new CreateUserCommand(data.email, data.fullName);
      const result = await this.createUserHandler.execute(command);
      console.log('Usuario creado:', result);
      return { success: true, data: result };
    } catch (error) {
      console.log('Error al crear usuario:', error.message);
      return { success: false, error: error.message };
    }
  }

  @MessagePattern('user.get')
  async handleGetUser(@Payload() data: any, @Ctx() context: KafkaContext) {
    try {
      const query = new GetUserQuery(data.userId);
      const result = await this.getUserHandler.execute(query);
      
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @MessagePattern('users.get')
  async handleGetUsers(@Payload() data: any, @Ctx() context: KafkaContext) {
    try {
      const query = new GetUsersQuery(data.page, data.limit);
      const result = await this.getUsersHandler.execute(query);
      
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

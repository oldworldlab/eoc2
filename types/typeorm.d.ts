declare module "typeorm" {
  export const Entity: Function;
  export const PrimaryGeneratedColumn: Function;
  export const Column: Function;
  export const createConnection: Function;
  export interface Connection {
    getRepository: Function;
  }
}
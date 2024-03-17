export interface LoginUsersDTO
{
   id: number,
   nombres: string,
   apellidos: string,
   token: string,
   changePassword?: boolean,
   vencimiennto?: Date
}

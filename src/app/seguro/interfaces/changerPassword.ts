export interface ChangePassword {
  id: number;
  newPassword: string;
  changePassword?: boolean;
  vencimiennto?: Date;
}

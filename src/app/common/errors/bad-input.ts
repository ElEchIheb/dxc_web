export class BadInput {
  public static message: string;
  public static errer: string;
  public static oldPasse: number;
  public static errerMessage: string;
    constructor(error?: any) {
      BadInput.message = error.message;
      BadInput.oldPasse = error.oldPasswordsLimit;
      BadInput.errer = error.errors[0].msg;
      BadInput.errerMessage = error ;
    }

}

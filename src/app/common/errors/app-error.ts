
export class AppError {


  public static message: string;
  constructor(error?: any) {
    AppError.message = error.message;
    console.error(error);
 }


}

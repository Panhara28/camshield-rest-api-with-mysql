export interface UploadStrategy {
  upload(folder: string, file: Express.Multer.File);
}

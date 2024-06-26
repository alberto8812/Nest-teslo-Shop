export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  //evaluation
  if (!file) return callback(new Error('File is empty'), false);
  const fileExtension=file.mimetype.split('/')[1];
  const validExtensions=["jpg","jpeg","png","gif"]

  if(validExtensions.includes(fileExtension)){

      callback(null, true);
    }
    callback(null, false);

};

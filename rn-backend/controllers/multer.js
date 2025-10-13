import multer from "multer";

const storage=multer.memoryStorage()
const uplaod =multer({storage:storage})

export default uplaod
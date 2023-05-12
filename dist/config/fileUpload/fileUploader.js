"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploader = void 0;
const co_1 = __importDefault(require("co"));
const ali_oss_1 = __importDefault(require("ali-oss"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
/**
 * It sets ups the utility of uploading files to Alibaba file storage OSS
 */
class FileUploader {
}
_a = FileUploader;
/**
 * It must be called before calling the other methods
 */
FileUploader.setupFileUploader = () => {
    console.log("innnn", process.env.ALLBABA_OSS);
    FileUploader.profileImagesBucket = new ali_oss_1.default({
        region: 'SAU(Riyadh)',
        accessKeyId: 'LTAI5t8nJbgcwhYoQmRLHbpn',
        accessKeySecret: 'a9mD8jlULfgRaujBeTOY3oe5S6q9Iv',
        bucket: "vaea-user-profiles",
        endpoint: process.env.ALLBABA_OSS
    });
};
/**
 * It uploads a profile image to the associated bucket.
 * @param multerFile stores the multer file info.
 */
FileUploader.uploadProfileImage = (multerFile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, co_1.default)(function* () {
            const uniqueName = (0, uuid_1.v4)();
            const buffer = fs_1.default.readFileSync(multerFile.path);
            let result = yield FileUploader.profileImagesBucket.put(uniqueName, buffer);
            fs_1.default.unlink(multerFile.path, (err) => { });
            return result.url;
        }).catch(function (err) {
            throw err;
        });
    }
    catch (e) {
        throw e;
    }
});
exports.FileUploader = FileUploader;

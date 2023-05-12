import co from 'co'
import OSS from 'ali-oss'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

/**
 * It sets ups the utility of uploading files to Alibaba file storage OSS
 */
export class FileUploader {

    private static profileImagesBucket: OSS 

    /**
     * It must be called before calling the other methods
     */
    static setupFileUploader = () => {
        console.log("innnn", process.env.ALLBABA_OSS)
        FileUploader.profileImagesBucket = new OSS({
            region: 'SAU(Riyadh)',
            accessKeyId: 'LTAI5t8nJbgcwhYoQmRLHbpn',  
            accessKeySecret: 'a9mD8jlULfgRaujBeTOY3oe5S6q9Iv',
            bucket: "vaea-user-profiles",
            endpoint: process.env.ALLBABA_OSS
        })
    }


    /**
     * It uploads a profile image to the associated bucket.
     * @param multerFile stores the multer file info.
     */
    static uploadProfileImage = async (multerFile: any): Promise<string> => {
        try {
            return await co(function* () {
                const uniqueName = uuidv4()
                const buffer = fs.readFileSync(multerFile.path)
                let result: any = yield FileUploader.profileImagesBucket.put(uniqueName, buffer)

                fs.unlink(multerFile.path, (err) => {})
                return result.url
              }).catch(function (err) {
                throw err;
              })
        } catch(e) {
            throw e
        } 
    }
}